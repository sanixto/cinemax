import Link from 'next/link';

import styles from './index.module.css';
import HamburgerMenu from './hamburger-menu';
import Navigation from './navigation';
import SearchField from './search-field';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="flex justify-between items-center mb-1">
        <div>
          <Link className={styles.logo} href="/movies">
            Cinemax
          </Link>
        </div>
        <div className="hidden lg:flex flex-1 p-1">
          <SearchField placeholder="Пошук по назві фільму" />
        </div>
        <div className="md:hidden">
          <HamburgerMenu />
        </div>
        <div className="hidden md:block">
          <Navigation />
        </div>
      </div>
      <div className="lg:hidden pt-1">
        <SearchField placeholder="Пошук по назві фільму" />
      </div>
    </header>
  );
}