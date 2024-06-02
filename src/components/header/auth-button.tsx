'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

import NavLink from './nav-link';
import { LOGIN_PATH, LOGOUT_PATH } from '@/constants';

export default function AuthButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) throw error;

  return user ? (
    <NavLink href={LOGOUT_PATH}>Logout</NavLink>
   ) : (
     <NavLink href={LOGIN_PATH}>Login</NavLink>
   );
}