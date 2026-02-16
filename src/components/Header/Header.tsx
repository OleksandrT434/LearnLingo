import css from './Header.module.css'
import { MdLogin } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Login/Modal';
import RegModal from '../Modal/Registration/RegModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRegModal = () => setIsRegModalOpen(true);
  const closeRegModal = () => setIsRegModalOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className={css.header}>
      <h1 className={css.title}>
        <BsCircle className={css.logo} /> LearnLingo
      </h1>
      <nav className={css.links}>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? `${css.subtitle} ${css.active}` : css.subtitle
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/teachers" 
          className={({ isActive }) => 
            isActive ? `${css.subtitle} ${css.active}` : css.subtitle
          }
        >
          Teachers
        </NavLink>
      </nav>
      <div className={css.buttons}>
        {user ? (
          <div className={css.userMenu}>
              <span className={css.userName}>
                {user.displayName || user.email?.split('@')[0] || 'User'}
              </span>
            <button className={css.logoutBtn} onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className={css.authButtons}>
            <button className={css.logButton} onClick={openModal}>
              <MdLogin className={css.loginIcon} />
              Log In
            </button>
            <button className={css.regButton} onClick={openRegModal}>
              Registration
            </button>
          </div>
        )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}
      {isRegModalOpen && <RegModal onClose={closeRegModal} />}
    </header>
  )
}