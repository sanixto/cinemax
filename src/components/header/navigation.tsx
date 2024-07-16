import styles from './navigation.module.css';
import NavLink from './nav-link';
import AuthButton from './auth-button';
import ProfileButton from './profile-button';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink  href='/movies'>Фільми</NavLink>
        </li>
        <li>
          <NavLink  href='/feedback'>Зв&#39;яжіться з нами</NavLink>
        </li>
        <li>
          <NavLink  href='/about'>Про кінотеатр</NavLink>
        </li>
        <li>
          <ProfileButton />
        </li>
        <li>
          <AuthButton />
        </li>
      </ul>
    </nav>
  );
}