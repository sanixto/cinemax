'use client';

import styles from './nav-link.module.css';
import { useUser } from '@auth0/nextjs-auth0/client';

import { LOGIN_PATH, LOGOUT_PATH } from '@/constants';

export default function AuthButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) throw error;

  const path = user ? LOGOUT_PATH : LOGIN_PATH;
  const text = user ? 'Logout' : 'Login';

  return <a className={styles.link} href={path}>{text}</a>;
}