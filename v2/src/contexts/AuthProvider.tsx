"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  signOut as amplifySignOut,
  fetchUserAttributes,
  signUp,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
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

  registerUser: (args: {
    username: string;
    password: string;
    profileType: "regular" | "advogado";
    firstname: string;
    lastname: string;
  }) => Promise<{ success: boolean; message?: string }>;

  confirmUserRegistration: (
    username: string,
    code: string
  ) => Promise<{ success: boolean; message?: string }>;

  resendConfirmationCode: (
    username: string
  ) => Promise<{ success: boolean; message?: string }>;

  startPasswordReset: (
    username: string
  ) => Promise<{ success: boolean; message?: string }>;

  completePasswordReset: (
    username: string,
    code: string,
    newPassword: string
  ) => Promise<{ success: boolean; message?: string }>;
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
        profileType: attributes["custom:profile_type"],
        sub: currentUser.userId,
      });
    } catch {
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
      await amplifySignOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const registerUser: AuthContextType["registerUser"] = async ({
    username,
    password,
    profileType,
    firstname,
    lastname,
  }) => {
    setIsLoading(true);
    try {
      await signUp({
        username: username.toLowerCase(),
        password,
        options: {
          userAttributes: {
            email: username.toLowerCase(),
            given_name: firstname,
            family_name: lastname,
            "custom:profile_type": profileType,
          },
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error?.message || "Erro no cadastro." };
    } finally {
      setIsLoading(false);
    }
  };

  const confirmUserRegistration: AuthContextType["confirmUserRegistration"] =
    async (username, code) => {
      setIsLoading(true);
      try {
        await confirmSignUp({
          username: username.toLowerCase(),
          confirmationCode: code,
        });
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          message: error?.message || "Erro ao confirmar.",
        };
      } finally {
        setIsLoading(false);
      }
    };

  const resendConfirmationCode: AuthContextType["resendConfirmationCode"] =
    async (username) => {
      setIsLoading(true);
      try {
        await resendSignUpCode({ username: username.toLowerCase() });
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          message: error?.message || "Erro ao reenviar código.",
        };
      } finally {
        setIsLoading(false);
      }
    };

  const startPasswordReset: AuthContextType["startPasswordReset"] = async (
    username
  ) => {
    setIsLoading(true);
    try {
      await resetPassword({ username: username.toLowerCase() });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || "Erro ao iniciar reset.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const completePasswordReset: AuthContextType["completePasswordReset"] =
    async (username, code, newPassword) => {
      setIsLoading(true);
      try {
        await confirmResetPassword({
          username: username.toLowerCase(),
          confirmationCode: code,
          newPassword,
        });
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          message: error?.message || "Erro ao concluir reset.",
        };
      } finally {
        setIsLoading(false);
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

        registerUser,
        confirmUserRegistration,
        resendConfirmationCode,
        startPasswordReset,
        completePasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
