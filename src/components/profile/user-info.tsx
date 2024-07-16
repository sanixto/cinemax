import Image from 'next/image';

import styles from './user-info.module.css';
import { formatDateAndTime } from '@/lib/formatDate';
import { User } from '@prisma/client';

interface UserInfoProps {
  user: User,
  amountOfReviews: number,
}

export default function UserInfo({ user, amountOfReviews }: UserInfoProps) {
  return (
    <div className={styles.container}>
      <Image src={user.imageUrl} alt="User's picture" width={200} height={200} priority />
      <ul>
        <li><b>Електронна пошта: </b>{user.email}</li>
        <li><b>Ім&#39;я: </b>{user.name}</li>
        <li><b>Реєстрація: </b>{formatDateAndTime(user.createdAt)}</li>
        <li><b>Кількість відгуків </b>{amountOfReviews}</li>
      </ul>
    </div>
  );
}