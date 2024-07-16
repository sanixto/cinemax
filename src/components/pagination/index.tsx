'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import styles from './index.module.css';

interface PaginationProps {
  totalPages: number,
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname: string = usePathname();
  const searchParams = useSearchParams();
  const currentPage: number = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <article className={styles.container}>
      <a href={createPageURL(currentPage - 1)} >{'<'}</a>
      { pages.map(page => (
        <a className={currentPage === page ? styles.active : undefined} key={page} href={createPageURL(page)}>{page}</a>
      ))}
      <a href={createPageURL(currentPage + 1)}>{'>'}</a>
    </article>
  );
}