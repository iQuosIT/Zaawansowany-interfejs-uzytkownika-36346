import { NavLink } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

// Etap A — czysty CSS: hover, transition i focus-visible
// (zob. .navbar__link w src/index.css)
export function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className='navbar' aria-label='Główna nawigacja'>
      <div className='navbar__brand'>🎬 Movie Browser</div>
      <div className='navbar__links'>
        <NavLink
          to='/'
          end
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Popularne
        </NavLink>
        <NavLink
          to='/favorites'
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
        >
          Ulubione ({favorites.length})
        </NavLink>
      </div>
    </nav>
  );
}
