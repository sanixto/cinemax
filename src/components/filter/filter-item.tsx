import styles from './filter-item.module.css';

import { FilterKey } from '@/interfaces/filter.interface';

interface FilterItemProps {
  filter: {
    name: FilterKey,
    value: string,
  }
  deleteFilter: (name: FilterKey, filter: string) => void,
}

export default function FilterItem({ filter, deleteFilter }: FilterItemProps) {
  return (
    <button className={styles.filter} onClick={() => deleteFilter(filter.name, filter.value)}>
      {filter.value}
      <span>×</span>
    </button>
  );
}