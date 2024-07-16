import Link from 'next/link';
import styles from './index.module.css';

export default function Footer() {
  return (
    <footer className={`${styles.footer} grid grid-cols-1 lg:grid-cols-2`}>
      <section>
        <h4>Навігація</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          <li><Link href="/movies">Фільми</Link></li>
          <li><Link href="/feedback">Зв&#39;жіться з нами</Link></li>
          <li><Link href="/about">Про кінотеатр</Link></li>
          <li><Link href="/profile">Особистий кобінет</Link></li>
        </ul>
      </section>
      <section>
        <h4>Контакти</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          <li><Link href="mailto:address@gmail.com">address@gmail.com</Link></li>
          <li><Link href="tel:+38012345678">+380 1234 56 78</Link></li>
          <li>Пн — Нд 09:00 — 19:00</li>
        </ul>
      </section>
      <section>
        <p>©2024 Сервіс онлайн купівлі квитків у кінотеатр Cinemax</p>
      </section>
    </footer>
  );
}