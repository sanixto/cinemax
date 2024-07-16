'use client';

import Image from 'next/image';
import { useState } from 'react';

import styles from './hamburger-menu.module.css';
import hamburgerMenuImg from '../../assets/hamburger-menu.png';
import NavLink from './nav-link';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <Image src={hamburgerMenuImg} alt="Hamburger menu icon" width={50} height={50} />
      </button>
      {isOpen && (
        <nav className={styles.menu} onClick={toggleMenu}>
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
              <NavLink href='/profile'>Особистий кабінет</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}