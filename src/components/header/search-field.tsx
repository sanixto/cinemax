import styles from './search-field.module.css';

export default function SearchField() {
  return (
    <input className={styles.search} type="text" placeholder="Пошук по назві фільму" />
  );
}