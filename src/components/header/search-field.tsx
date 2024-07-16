'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import styles from './search-field.module.css';

interface SearchFieldProps {
  placeholder: string,
}

export default function SearchField({ placeholder }: SearchFieldProps) {
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();
  const [inputTitle, setInputTitle] = useState<string>('');

  useEffect(() => {
    const searchedTitle = searchParams.get('title');
    if (searchedTitle) setInputTitle(searchedTitle);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (inputTitle) params.set('title', inputTitle);
    else params.delete('title');

    router.push(`${pathname}?${params.toString()}`);
  }, [inputTitle, pathname, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  }

  const handleFocus = () => {
    if (!pathname.startsWith('/movies')) {
      router.replace('/movies');
    }
  }

  return (
    <input
      className={styles.search}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      onFocus={handleFocus}
      value={inputTitle}
    />
  );
}