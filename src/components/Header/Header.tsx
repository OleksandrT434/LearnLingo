import css from './Header.module.css'
import { MdLogin } from "react-icons/md";
import { BsCircle } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import RegModal from '../Modal/Registration/RegModal';
import { auth } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';

export default function Header() {
  const { user, openLoginModal } = useAuth();
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const openRegModal = () => setIsRegModalOpen(true);
  const closeRegModal = () => setIsRegModalOpen(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
            <button className={css.logButton} onClick={openLoginModal}>
              <MdLogin className={css.loginIcon} />
              Log In
            </button>
            <button className={css.regButton} onClick={openRegModal}>
              Registration
            </button>
          </div>
        )}
      </div>
      {isRegModalOpen && <RegModal onClose={closeRegModal} />}
    </header>
  )
}