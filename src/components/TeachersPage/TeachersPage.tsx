import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../firebase/config";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";
import type { Teacher } from "../../types/types";
import css from './TeachersPage.module.css';

interface TeachersPageProps {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
}

export default function TeachersPage({ favorites, setFavorites }: TeachersPageProps) {
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const teachersRef = ref(db);

    get(teachersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          if (Array.isArray(data)) {
  const validTeachers = data
    .filter(teacher => teacher !== null)
    .map((teacher, index) => ({ ...teacher, id: String(index) })); 
  setAllTeachers(validTeachers as Teacher[]);
          } else {
            const teachersArray = Object.values(data);
            setAllTeachers(teachersArray as Teacher[]);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const loadMore = () => {
    setVisibleCount(visibleCount + 4);
  };
  if (loading) {
    return <div className={css.container}>Loading...</div>;
  }
  if (allTeachers.length === 0) {
    return <div className={css.container}>No teachers found</div>;
  }

  const teachersToShow = allTeachers.slice(0, visibleCount);
  const showButton = visibleCount < allTeachers.length;

  return (
    <div className={css.container}>
      {teachersToShow.map((teacher, index) => (
        <TeacherCard 
          key={index} 
          teacher={teacher}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}

      {showButton && (
        <button className={css.loadMoreBtn} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}