'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
}

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTelegram, setIsTelegram] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if running in Telegram WebView
    if (typeof window === 'undefined') return;

    const webApp = (window as any).Telegram?.WebApp;
    
    if (!webApp) {
      // Not in Telegram WebView
      setIsTelegram(false);
      setLoading(false);
      setError('This app is designed to be used within Telegram. Please open it in the Telegram app.');
      return;
    }

    // We're in Telegram WebView
    setIsTelegram(true);
    webApp.ready();
    webApp.expand();

    const initData = webApp.initData;
    if (!initData) {
      setError('No initialization data received from Telegram');
      setLoading(false);
      return;
    }

    // Validate server-side
    fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid && data.user) {
          setUser(data.user);
        } else {
          setError('Invalid user data');
        }
      })
      .catch((err) => setError('Failed to validate user data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-yellow-800">Notice</h2>
        <p className="text-yellow-700">{error}</p>
        {!isTelegram && (
          <p className="mt-4 text-sm text-yellow-600">
            This application is designed to be used within the Telegram app. Please open this link in Telegram to continue.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Your Telegram Profile</h2>
      <div className="space-y-2">
        <p><strong>ID:</strong> {user?.id}</p>
        <p><strong>Username:</strong> {user?.username ? `@${user.username}` : 'Not set'}</p>
        <p><strong>Name:</strong> {[user?.first_name, user?.last_name].filter(Boolean).join(' ')}</p>
      </div>
    </div>
  );
}