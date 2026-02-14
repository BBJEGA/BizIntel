import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  setDoc,
  doc, 
  query, 
  where
} from "firebase/firestore";
import { db } from "./firebase";
import type { Form, Feedback, InsertForm, InsertFeedback } from "@shared/schema";

interface InsightAggregate {
  orgId: string;
  totalFeedback: number;
  issuesCount: number;
  highlightsCount: number;
  updatedAt: number;
}

interface AIAnalysisResult {
  summary: string;
  issues: string[];
  highlights: string[];
  mixed: string[];
}

// ============= Forms =============

export async function createForm(orgId: string, formData: InsertForm): Promise<Form> {
  const docRef = await addDoc(collection(db, "forms"), {
    orgId,
    title: formData.title,
    description: formData.description,
    createdAt: Date.now(),
  });

  return {
    id: docRef.id,
    orgId,
    title: formData.title,
    description: formData.description,
    createdAt: Date.now(),
  };
}

export async function getFormsByOrgId(orgId: string): Promise<Form[]> {
  // Note: Removed orderBy to avoid composite index requirement
  // Sorting is done client-side instead
  const q = query(
    collection(db, "forms"), 
    where("orgId", "==", orgId)
  );
  
  const querySnapshot = await getDocs(q);
  const forms = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Form));
  
  // Sort by createdAt descending (newest first) on client side
  return forms.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getFormById(formId: string): Promise<Form | null> {
  const docRef = doc(db, "forms", formId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Form;
  }
  
  return null;
}

// ============= Feedback =============


export async function syncInsightAggregate(orgId: string): Promise<InsightAggregate> {
  const feedback = await getFeedbackByOrgId(orgId);
  const aggregate: InsightAggregate = {
    orgId,
    totalFeedback: feedback.length,
    issuesCount: feedback.filter((f) => f.category === "Complaint").length,
    highlightsCount: feedback.filter((f) => f.category === "Compliment").length,
    updatedAt: Date.now(),
  };

  await setDoc(doc(db, "insightAggregates", orgId), aggregate, { merge: true });
  return aggregate;
}

export async function resetInsightAggregateCounts(orgId: string): Promise<InsightAggregate> {
  const resetAggregate: InsightAggregate = {
    orgId,
    totalFeedback: 0,
    issuesCount: 0,
    highlightsCount: 0,
    updatedAt: Date.now(),
  };

  await setDoc(doc(db, "insightAggregates", orgId), resetAggregate, { merge: true });
  return resetAggregate;
}

export async function getInsightAggregate(orgId: string): Promise<InsightAggregate | null> {
  const snap = await getDoc(doc(db, "insightAggregates", orgId));
  if (!snap.exists()) return null;
  return snap.data() as InsightAggregate;
}

export async function analyzeFeedbackWithGroq(feedback: Feedback[]): Promise<AIAnalysisResult> {
  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!groqApiKey) {
    throw new Error("AI Analysis Failed");
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You are an analytics assistant. Return ONLY JSON with keys summary, issues, highlights, mixed. issues/highlights/mixed must be arrays of strings.",
          },
          {
            role: "user",
            content: JSON.stringify(
              feedback.map((item) => ({
                category: item.category,
                message: item.message,
                meta: item.meta,
              }))
            ),
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Groq request failed");
    }

    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content || "{}");

    if (!parsed?.summary || !Array.isArray(parsed?.issues) || !Array.isArray(parsed?.highlights) || !Array.isArray(parsed?.mixed)) {
      throw new Error("Invalid Groq payload");
    }

    return {
      summary: parsed.summary,
      issues: parsed.issues,
      highlights: parsed.highlights,
      mixed: parsed.mixed,
    };
  } catch {
    throw new Error("AI Analysis Failed");
  }
}


export async function createFeedback(
  formId: string, 
  orgId: string, 
  feedbackData: InsertFeedback
): Promise<Feedback> {
  const normalizedMeta = {
    name: feedbackData.meta?.name?.trim() || "",
    email: feedbackData.meta?.email?.trim() || "",
    location: feedbackData.meta?.location?.trim() || "",
  };

  const createdAt = Date.now();
  const docRef = await addDoc(collection(db, "feedback"), {
    formId,
    orgId,
    message: feedbackData.message,
    category: feedbackData.category,
    anonymous: feedbackData.anonymous,
    meta: normalizedMeta,
    createdAt,
  });

  await syncInsightAggregate(orgId);
  console.log("[createFeedback] new feedback orgId:", orgId);

  return {
    id: docRef.id,
    formId,
    orgId,
    message: feedbackData.message,
    category: feedbackData.category,
    anonymous: feedbackData.anonymous,
    meta: normalizedMeta,
    createdAt,
  };
}

export async function getFeedbackByOrgId(orgId: string): Promise<Feedback[]> {
  // Note: Removed orderBy to avoid composite index requirement
  // Sorting is done client-side instead
  const q = query(
    collection(db, "feedback"), 
    where("orgId", "==", orgId)
  );
  
  const querySnapshot = await getDocs(q);
  const feedback = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    meta: {
      name: doc.data().meta?.name || "",
      email: doc.data().meta?.email || "",
      location: doc.data().meta?.location || "",
    },
  } as Feedback));
  
  // Sort by createdAt descending (newest first) on client side
  return feedback.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getFeedbackByFormId(formId: string): Promise<Feedback[]> {
  // Note: Removed orderBy to avoid composite index requirement
  // Sorting is done client-side instead
  const q = query(
    collection(db, "feedback"), 
    where("formId", "==", formId)
  );
  
  const querySnapshot = await getDocs(q);
  const feedback = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    meta: {
      name: doc.data().meta?.name || "",
      email: doc.data().meta?.email || "",
      location: doc.data().meta?.location || "",
    },
  } as Feedback));
  
  // Sort by createdAt descending (newest first) on client side
  return feedback.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getFeedbackStats(orgId: string): Promise<{
  total: number;
  complaints: number;
  compliments: number;
}> {
  const feedback = await getFeedbackByOrgId(orgId);
  
  return {
    total: feedback.length,
    complaints: feedback.filter(f => f.category === "Complaint").length,
    compliments: feedback.filter(f => f.category === "Compliment").length,
  };
}
