import { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { Organization } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch organization data
        const orgDoc = await getDoc(doc(db, "organizations", user.uid));
        if (orgDoc.exists()) {
          setOrganization(orgDoc.data() as Organization);
        }
      } else {
        setOrganization(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create organization document
    const orgData: Organization = {
      id: userCredential.user.uid,
      name,
      email,
      createdAt: Date.now(),
    };
    
    await setDoc(doc(db, "organizations", userCredential.user.uid), orgData);
    setOrganization(orgData);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setOrganization(null);
  };

  const value = {
    user,
    organization,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
