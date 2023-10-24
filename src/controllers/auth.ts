/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { validateRegister } from '../utils/validate';

const prisma = new PrismaClient();

export const registration = async (req) => {
  try {
    const { username, password, email } = req.body;
    const validate = await validateRegister(req.body);

    if (validate.length) {
      return {
        success: false,
        status: 'verification-valied',
        message: validate,
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashPassword,
        email,
      },
    });

    return {
      success: true,
      status: 'success',
    };
  } catch (e: any) {
    return {
      success: false,
      status: 'failed',
      message: 'Server Error',
    };
  }
};
