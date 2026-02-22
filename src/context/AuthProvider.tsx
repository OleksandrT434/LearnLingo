import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext } from './AuthContext';
import Modal from '../components/Modal/Login/Modal';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, openLoginModal: () => setIsLoginOpen(true) }}>
      {children}
      {isLoginOpen && <Modal onClose={() => setIsLoginOpen(false)} />}
    </AuthContext.Provider>
  );
};