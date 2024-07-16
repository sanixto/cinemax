'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

import styles from './nav-link.module.css';
import { LOGIN_PATH, LOGOUT_PATH } from '@/constants';

export default function AuthButton() {
  const { user, error, isLoading } = useUser();
  if (isLoading || error) return

  const path = user ? LOGOUT_PATH : LOGIN_PATH;
  const text = user ? 'Logout' : 'Login';

  return <a className={styles.link} href={path}>{text}</a>;
}