'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import styles from './index.module.css';
import { FilterInterface, FilterKey } from '@/interfaces/filter.interface';
import FilterItem from './filter-item';


interface FilterProps {
  filter: FilterInterface,
}

export default function Filter({ filter }: FilterProps) {
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<FilterInterface>({ genres: []});

  useEffect(() => {
    const searchedGenres = searchParams.get('genres')?.split(',');
    setSelectedFilter({
      genres: searchedGenres,
    });
  }, [searchParams]);

  const { genres } = selectedFilter;

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const searchedGenres = searchParams.get('genres')?.split(',');

    if (genres && genres.length > 0) {
      params.set('genres', genres.join(','));
      if (genres.length !== searchedGenres?.length) {
        params.set('page', '1');
      }
    } else {
      params.delete('genres');
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [genres, searchParams, router, pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.target.value;
    if (genres && genres.includes(targetValue)) return;
    const newGenres = genres ? [...genres, targetValue] : [targetValue];
    setSelectedFilter(prev => ({...prev, genres: newGenres}));
  }

  const deleteFilter = (name: FilterKey, value: string) => {
    const newFilter = {...selectedFilter};
    if (name === 'genres' && Array.isArray(newFilter.genres)) {
      newFilter.genres = newFilter.genres.filter((item: string) => item !== value);
    }
    setSelectedFilter(newFilter);
  }

  return (
    <article>
      <section>
        <select className={styles.select} name="filter-genre" id="filter-genre" onChange={handleChange} defaultValue={'genre'}>
        <option disabled value={'genre'}>Жанр</option>
        {filter.genres?.sort().map(genre => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      </section>
      <section>
        <ul className={styles.filters}>
          {selectedFilter.genres?.map(genre => (
            <li key={genre}>
              <FilterItem filter={{name: 'genres', value: genre}} deleteFilter={deleteFilter} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}