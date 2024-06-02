'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import { getNextFormattedDays } from '@/lib/formatDate';
import styles from './showtime-picker.module.css';
import calendarImg from '@/assets/calendar.png';
import Showtime from '@/interfaces/showtime.interface';
import DateData from '@/interfaces/dateData.interface';
import { LOGIN_PATH } from '@/constants';

interface ShowtimePicker {
  showtimes: Showtime[],
}

export default function ShowtimePicker({ showtimes }: ShowtimePicker) {
  const [selectedDate, setSelectedDate] = useState<DateData | null>(null);
  const router = useRouter();
  const pathname: string = usePathname();
  const searchParams = useSearchParams();
  const { user, error, isLoading } = useUser();

  const datesData = getNextFormattedDays(new Date(), 7);

  useEffect(() => {
    setSelectedDate(datesData[0]);
  }, []);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    if (selectedDate) {
      currentSearchParams.set('date', selectedDate.date.toString());
    } else {
      currentSearchParams.delete('date');
    }
    const newUrl = `${pathname}?${currentSearchParams.toString()}`;
    router.replace(`${newUrl}`, { scroll: false});
  }, [selectedDate, pathname, searchParams, router]);

  const handleDateClick = (date: DateData) => {
    setSelectedDate(date);
  }

  const handleTimeClick = () => {
    if (!isLoading && !error && !user ) router.push(LOGIN_PATH);
  }

  return (
    <article className={styles.article}>
      <h3>Виберіть дату та час сенсу</h3>
      <section>
        <ul className={styles.list}>
          {datesData.map(dateData => (
            <li
              key={dateData.dateAndMonth}
              onClick={() => handleDateClick(dateData)}
              className={searchParams.get('date') === dateData.date.toString() ? styles.active : ''}
            >
              <span>{dateData.dateAndMonth}</span>
              <span><b>{dateData.dayOfWeek}</b></span>
            </li>
          ))}
        </ul>
        <div className={styles.calendar}>
          <Image src={calendarImg} alt="Calendar icon" fill/>
        </div>
      </section>
      <section>
        <h4>{selectedDate?.dateAndMonth}, <b>{selectedDate?.dayOfWeek}</b></h4>
        <ul className={styles.list}>
          {showtimes.length > 0 ? (
            showtimes.map(showtime => (
              <li
                key={showtime.id}
                onClick={handleTimeClick}
              >
                <span>{showtime.time}</span>
              </li>
            ))
          ) : <p>Немає сеансів на вибраний день.</p>
         }
        </ul>
      </section>
    </article>
  )
}