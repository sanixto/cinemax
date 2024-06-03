import User from '@/interfaces/user.interface';
import prisma from '../lib/prisma';
import { parseDataFromDB } from './databaseData';
import Auth0User from '@/interfaces/auth0User.interface';

export async function getUsers(): Promise<User[] | null> {
  try {
    const data = await prisma.user.findMany();

    if (!data) return null;

    const parsedUsers: User[] = data.map(user => parseDataFromDB(user));

    return parsedUsers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users data.');
  }
}

export async function getUser(id: string): Promise<User | null> {
  try {
    const data = await prisma.user.findFirst({
      where: {
        id: id,
      }
    });

    if (!data) return null;

    const parsedUser: User = parseDataFromDB(data);

    return parsedUser;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users data.');
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    if (!data) return null;

    const parsedUser: User = parseDataFromDB(data);

    return parsedUser;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users data.');
  }
}

export async function checkIfUserExists(email: string): Promise<boolean> {
  try {
    const data = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    if (data) return true;
    return false;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function saveUser(user: Auth0User): Promise<User | null> {
  const name = user.name === user.email ? user.nickname : user.name;
  try {
    const data = await prisma.user.create({
      data: {
        name: name ,
        email: user.email,
        image_url: user.picture,
      }
    });

    if (!data) return null;

    const parsedUser: User = parseDataFromDB(data);

    return parsedUser;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save user data in database.');
  }
}

