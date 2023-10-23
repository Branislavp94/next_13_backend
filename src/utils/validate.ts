/* eslint-disable import/prefer-default-export */
import validator from 'validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validateRegister = async (payload) => {
  const errorMessage = [];

  const validate = [
    {
      check: validator.isLength(payload.username, { min: 4 }),
      error: 'Username is Invalid',
    },
    {
      check: validator.isEmail(payload.email),
      error: 'Email is Invalid',
    },
    // {
    //   check: validator.isStrongPassword(payload.password, { minLength: 4 }),
    //   error: 'Password is Invalid',
    // },
  ];

  const existUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existUser) {
    validate.push({
      check: false,
      error: 'User with that email alredy exist',
    });
  }

  await validate.forEach((el) => {
    if (!el.check) {
      errorMessage.push({ name: el.error });
    }
  });

  return errorMessage;
};
