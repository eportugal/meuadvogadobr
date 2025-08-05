"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut, fetchUserAttributes } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import "@/lib/amplify-config";

type UserProfile = {
  email: string;
  name?: string;
  profileType?: string;
  sub?: string;
};

type AuthContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      setUser({
        email: attributes.email || "",
        name: attributes.name,
        profileType: attributes["custom:profileType"],
        sub: currentUser.userId,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();

    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
        case "tokenRefresh":
          loadUser();
          break;
        case "signedOut":
          setUser(null);
          break;
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut: handleSignOut,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
