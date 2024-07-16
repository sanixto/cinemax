import { handleAuth, handleCallback, AfterCallback, Session } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';
import { saveUser, checkIfUserWithEmailExists } from '@/lib/users';
import Auth0User from '@/interfaces/auth0User.interface';

const afterCallback: AfterCallback = async (req: NextRequest, session: Session) => {
  const user: Auth0User = session?.user as Auth0User;
  if (user) {
    const userAlreadyExists = await checkIfUserWithEmailExists(user.email);
    if (!userAlreadyExists) {
      await saveUser(user);
    }
  }
  return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});