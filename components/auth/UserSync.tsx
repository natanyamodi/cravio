'use client';

import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export default function UserSync() {
  const { isSignedIn, isLoaded } = useAuth();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // Only run when auth state is loaded and user is signed in
    if (isLoaded && isSignedIn) {
      // Store/update user in Convex
      storeUser().catch(console.error);
    }
  }, [isLoaded, isSignedIn, storeUser]);

  // This component doesn't render anything
  return null;
} 