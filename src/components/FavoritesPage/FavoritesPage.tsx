import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../firebase/config";
import { TeacherCard } from '../TeacherCard/TeacherCard';
import type { Teacher } from '../../types/types';
import css from './FavoritesPage.module.css';

interface FavoritesPageProps {
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
}

export default function FavoritesPage({ favorites, setFavorites }: FavoritesPageProps) {
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const db = getDatabase(app);
    get(ref(db)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (Array.isArray(data)) {
          const valid = data
            .filter(t => t !== null)
            .map((t, i) => ({ ...t, id: String(i) }));
          setAllTeachers(valid as Teacher[]);
        } else {
            const valid = (Object.values(data) as Teacher[]).map((t, i) => ({ ...t, id: String(i) }));
            setAllTeachers(valid);
        }
      }
    });
  }, []);

  const favoriteTeachers = allTeachers.filter(t => favorites.includes(t.id || ''));

  if (favoriteTeachers.length === 0) {
    return <div>No favorites yet</div>;
  }

  return (
    <div className={css.container}>
      {favoriteTeachers.map((teacher, index) => (
        <TeacherCard
          key={index}
          teacher={teacher}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  );
}