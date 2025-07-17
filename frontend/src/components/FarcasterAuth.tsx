'use client';

import { AuthKitProvider, SignInButton, StatusAPIResponse } from '@farcaster/auth-kit';
import { useState } from 'react';

interface FarcasterAuthProps {
  onAuthSuccess?: (user: any) => void;
}

export default function FarcasterAuth({ onAuthSuccess }: FarcasterAuthProps) {
  const [user, setUser] = useState<any>(null);

  const handleSuccess = (res: StatusAPIResponse) => {
    console.log('Farcaster auth successful:', res);
    setUser(res);
    if (onAuthSuccess) {
      onAuthSuccess(res);
    }
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <AuthKitProvider config={undefined}>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-[#8A63D2]">
              Welcome, {user.displayName || user.username}!
            </span>
            <button
              onClick={handleSignOut}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <SignInButton
            onSuccess={handleSuccess}
            onError={(error) => console.error('Auth error:', error)}
          />
        )}
      </div>
    </AuthKitProvider>
  );
}