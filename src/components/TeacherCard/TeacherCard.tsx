import type { Teacher } from "../../types/types";
import css from './TeacherCard.module.css';
import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

interface TeacherCardProps {
  teacher: Teacher;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
}
export const TeacherCard = ({ teacher, favorites, setFavorites }: TeacherCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFavorite = favorites.includes(teacher.id || '');
  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(id => id !== teacher.id));
    } else {
      setFavorites([...favorites, teacher.id || '']);
    }
  };
  return (
    <div className={css.card}>
      <div className={css.header}>
        <div className={css.avatarWrapper}>
          <img className={css.avatar} src={teacher.avatar_url} alt={`${teacher.name} ${teacher.surname}`} />
        </div>
        
        <div className={css.content}>
          <div className={css.topSection}>
            <div>
              <p className={css.label}>Languages</p>
              <h2 className={css.name}>{teacher.name} {teacher.surname}</h2>
            </div>
            
            <ul className={css.statsList}>
              <li>📖 Lessons online</li>
              <li>Lessons done: {teacher.lessons_done}</li>
              <li>⭐ Rating: {teacher.rating}</li>
              <li>Price / 1 hour: <span className={css.price}>{teacher.price_per_hour}$</span></li>
            </ul>
            <button className={css.favoriteBtn} onClick={toggleFavorite}>
              {isFavorite ? (
                <IoMdHeart className={css.heartFilled} />
              ) : (
                <IoMdHeartEmpty className={css.heartEmpty} />
              )}
            </button>
          </div>

          <div className={css.info}>
            <p className={css.infoItem}>
              <span className={css.infoLabel}>Speaks:</span> 
              {teacher.languages.map((lang, index) => (
                <span key={lang}>
                  {index === 0 ? <span className={css.mainLanguage}>{lang}</span> : lang}
                  {index < teacher.languages.length - 1 && ', '}
                </span>
              ))}
            </p>
            
            <p className={css.infoItem}>
              <span className={css.infoLabel}>Lesson Info:</span> {teacher.lesson_info}
            </p>
            
            <p className={css.infoItem}>
              <span className={css.infoLabel}>Conditions:</span> {teacher.conditions.join(' ')}
            </p>
          </div>

          {!isExpanded && (
            <button className={css.readMore} onClick={() => setIsExpanded(true)}>
              Read more
            </button>
          )}

          {isExpanded && (
            <div className={css.expandedContent}>
              <p className={css.experience}>{teacher.experience}</p>
              
              {teacher.reviews && teacher.reviews.length > 0 && (
                <div className={css.reviews}>
                  {teacher.reviews.map((review, index) => (
                    <div key={index} className={css.review}>
                      <div className={css.reviewHeader}>
                        <div className={css.reviewerAvatar}>
                          {review.reviewer_name.charAt(0)}
                        </div>
                        <div>
                          <p className={css.reviewerName}>{review.reviewer_name}</p>
                          <p className={css.reviewRating}>⭐ {review.reviewer_rating.toFixed(1)}</p>
                        </div>
                      </div>
                      <p className={css.reviewComment}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={css.levels}>
            {teacher.levels.map((level) => (
              <span key={level} className={css.levelBadge}>
                #{level}
              </span>
            ))}
          </div>

          {isExpanded && (
            <button className={css.bookButton}>Book trial lesson</button>
          )}
        </div>
      </div>
    </div>
  );
};