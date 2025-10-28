import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  query, 
  where,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";
import type { Form, Feedback, InsertForm, InsertFeedback } from "@shared/schema";

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

export async function createFeedback(
  formId: string, 
  orgId: string, 
  feedbackData: InsertFeedback
): Promise<Feedback> {
  const docRef = await addDoc(collection(db, "feedback"), {
    formId,
    orgId,
    message: feedbackData.message,
    category: feedbackData.category,
    anonymous: feedbackData.anonymous,
    createdAt: Date.now(),
  });

  return {
    id: docRef.id,
    formId,
    orgId,
    message: feedbackData.message,
    category: feedbackData.category,
    anonymous: feedbackData.anonymous,
    createdAt: Date.now(),
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
    ...doc.data()
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
    ...doc.data()
  } as Feedback));
  
  // Sort by createdAt descending (newest first) on client side
  return feedback.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getFeedbackStats(orgId: string): Promise<{
  total: number;
  complaints: number;
  suggestions: number;
}> {
  const feedback = await getFeedbackByOrgId(orgId);
  
  return {
    total: feedback.length,
    complaints: feedback.filter(f => f.category === "Complaint").length,
    suggestions: feedback.filter(f => f.category === "Suggestion").length,
  };
}
