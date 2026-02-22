import { useState, useEffect } from 'react';
import css from './BookingMod.module.css';
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import type { Teacher } from '../../../types/types';
import { useAuth } from '../../../context/AuthContext';

interface ModalProps {
  onClose: () => void;
  teacher: Teacher;
}

const reasons = [
  'Career and business',
  'Lesson for kids',
  'Living abroad',
  'Exams and coursework',
  'Culture, travel or hobby'
];

export default function BookingMod({ onClose, teacher }: ModalProps) {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');

  const [selected, setSelected] = useState(reasons[0]);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isFading, setIsFading] = useState(false); 

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsSuccess(true);
  setTimeout(() => setIsFading(true), 2500); 
  setTimeout(() => onClose(), 3000);
};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);


  return createPortal(
    <section className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          <IoCloseOutline size={32} />
        </button>

        {isSuccess ? (
         <div className={`${css.success} ${isFading ? css.fadeOut : ''}`}>
             <h1>Booking successful! 🎉</h1>
             <p>Your trial lesson has been booked. We will contact you soon.</p>
        </div>
              ) : (
          <>
            <h1 className={css.title}>Book trial lesson</h1>
            <p className={css.subtitle}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>
              <div className={css.teacherInfo}>
               <img className={css.teacherAvatar} src={teacher.avatar_url} alt={teacher.name} />
                  <div>
                    <p className={css.teacherLabel}>Your teacher</p>
                    <p className={css.teacherName}>{teacher.name} {teacher.surname}</p>
                  </div>
                  </div>
            <h2 className={css.reasonTitle}>What is your main reason for learning English?</h2>
            <div className={css.radioGroup}>
              {reasons.map((reason) => (
                <label key={reason} className={css.radioLabel}>
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selected === reason}
                    onChange={() => setSelected(reason)}
                    className={css.radioInput}
                  />
                  {reason}
                </label>
              ))}
            </div>

            <form className={css.form} onSubmit={handleSubmit}>
              <input className={css.input} type="text" placeholder="Full name" required />
              <input className={css.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className={css.input} type="tel" placeholder="Phone number" required />
              <button type="submit" className={css.bookButton}>Book</button>
            </form>
          </>
        )}
      </div>
    </section>,
    document.body
  );
}