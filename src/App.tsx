import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import { createPageVariants } from './animations/variants';

// Etap B - page transitions z AnimatePresence (mode='wait').
// Klucz `motion.main` = location.pathname -> re-mount przy zmianie trasy.
export default function App() {
  const location = useLocation();
  const shouldReduce = useReducedMotion();
  const pageVariants = createPageVariants(!!shouldReduce);

  return (
    <>
      <Navbar />
      <AnimatePresence mode='wait'>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <Routes location={location}>
            <Route path='/' element={<HomePage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
}
