import { useState, useEffect } from 'react';

export function useMockAuth() {
  // Initialize state with the value from localStorage
  const [role, setRole] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mock_role');
    }
    return null;
  });

  useEffect(() => {
    const handleStorage = () => {
      setRole(localStorage.getItem('mock_role'));
    };

    // Listen for storage events (across tabs) and custom events (same tab)
    window.addEventListener('storage', handleStorage);
    window.addEventListener('auth-change', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('auth-change', handleStorage);
    };
  }, []);

  const login = (newRole: string) => {
    localStorage.setItem('mock_role', newRole);
    window.dispatchEvent(new Event('auth-change'));
  };

  const logout = () => {
    localStorage.removeItem('mock_role');
    window.dispatchEvent(new Event('auth-change'));
  };

  return { role, login, logout, isLoggedIn: !!role };
}
