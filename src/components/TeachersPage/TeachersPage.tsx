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

  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');

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
          setAllTeachers(Object.values(data) as Teacher[]);
        }
      }
      setLoading(false);
    });
  }, []);

  const filteredTeachers = allTeachers.filter(teacher => {
    const matchLanguage = language ? teacher.languages.includes(language) : true;
    const matchLevel = level ? teacher.levels.includes(level) : true;
    const matchPrice = price ? teacher.price_per_hour <= Number(price) : true;
    return matchLanguage && matchLevel && matchPrice;
  });

  const teachersToShow = filteredTeachers.slice(0, visibleCount);
  const showButton = visibleCount < filteredTeachers.length;

  const loadMore = () => setVisibleCount(visibleCount + 4);

  if (loading) return <div className={css.container}>Loading...</div>;

  return (
    <div className={css.container}>
      <div className={css.filters}>
        <div className={css.filterGroup}>
          <label className={css.filterLabel}>Languages</label>
          <select className={css.select} value={language} onChange={e => { setLanguage(e.target.value); setVisibleCount(4); }}>
            <option value="" disabled hidden>All languages</option>
            <option value="French">French</option>
            <option value="English">English</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
            <option value="Mandarin">Mandarin</option>
          </select>
        </div>

        <div className={css.filterGroup}>
          <label className={css.filterLabel}>Level of knowledge</label>
          <select className={css.select} value={level} onChange={e => { setLevel(e.target.value); setVisibleCount(4); }}>
            <option value="" disabled hidden>All levels</option>
            <option value="A1 Beginner">A1 Beginner</option>
            <option value="A2 Elementary">A2 Elementary</option>
            <option value="B1 Intermediate">B1 Intermediate</option>
            <option value="B2 Upper-Intermediate">B2 Upper-Intermediate</option>
            <option value="C1 Advanced">C1 Advanced</option>
            <option value="C2 Proficient">C2 Proficient</option>
          </select>
        </div>

        <div className={css.filterGroup}>
          <label className={css.filterLabel}>Price</label>
          <select className={css.select} value={price} onChange={e => { setPrice(e.target.value); setVisibleCount(4); }}>
            <option value="" disabled hidden>All prices</option>
            <option value="25">Up to 25$</option>
            <option value="30">Up to 30$</option>
            <option value="35">Up to 35$</option>
            <option value="40">Up to 40$</option>
          </select>
        </div>
        {(language || level || price) && (
        <button 
              className={css.resetBtn} 
              onClick={() => { setLanguage(''); setLevel(''); setPrice(''); setVisibleCount(4); }}
            >
              Reset filters
        </button>
        )}
      </div>
      

      {teachersToShow.length === 0 ? (
        <div>No teachers found</div>
      ) : (
        teachersToShow.map((teacher, index) => (
          <TeacherCard
            key={index}
            teacher={teacher}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))
      )}

      {showButton && (
        <button className={css.loadMoreBtn} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}