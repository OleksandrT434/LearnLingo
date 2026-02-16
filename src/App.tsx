import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home';
import TeachersPage from './components/TeachersPage/TeachersPage'; 

export default function App() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <div className="App">
        <Header /> 
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/teachers" 
              element={<TeachersPage favorites={favorites} setFavorites={setFavorites} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}