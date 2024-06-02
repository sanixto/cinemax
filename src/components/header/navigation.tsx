import Image from 'next/image';

import styles from './navigation.module.css';
import profileImg from '../../assets/profile.png';
import NavLink from './nav-link';
import AuthButton from './auth-button';
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
          <NavLink href='/profile'>
            <Image src={profileImg} alt='Особистий кабінет' priority width={50} height={50} />
          </NavLink>
        </li>
        <li><AuthButton /></li>
      </ul>
    </nav>
  );
}