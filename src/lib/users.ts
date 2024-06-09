import prisma from '../lib/prisma';
import { User } from '@prisma/client';
import Auth0User from '@/interfaces/auth0User.interface';
import UserDto from '@/dto/user.dto';

export async function getUsers(): Promise<User[]> {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users data.');
  }
}

export async function getUser(id: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({ where: { id: id } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch user data with id ${id}.`);
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch user data with email ${email}.`);
  }
}

export async function checkIfUserWithEmailExists(email: string): Promise<boolean> {
  try {
    const data = await prisma.user.findFirst({ where: { email } });

    if (data) return true;
    return false;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch user data with email ${email}.`);
  }
}

export async function saveUser(user: Auth0User): Promise<User> {
  const name = user.name === user.email ? user.nickname : user.name;
  try {
    return await prisma.user.create({
      data: {
        name: name ,
        email: user.email,
        imageUrl: user.picture,
      }
    });

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save user data in database.');
  }
}

export async function updateUser(id: string, userData: Partial<UserDto>): Promise<User> {
  try {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to update user data with id ${id}.`);
  }
}

export async function deleteUser(id: string): Promise<User> {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete user data with id ${id}.`);
  }
}