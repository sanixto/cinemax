'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

import NavLink from './nav-link';
import defaultProfileImg from '@/assets/profile.png';
import Image, { StaticImageData } from 'next/image';

export default function ProfileButton() {
  const { user } = useUser();

  let imageUrl: string | StaticImageData = defaultProfileImg;
  let alt: string = 'Default user image';

  if (user && user.picture) {
    imageUrl = user.picture;
    alt = user.name!;
  }

  return (
    <NavLink href='/profile'>
      <Image src={imageUrl!} alt={alt!} width={50} height={50} />
    </NavLink>
  );
}