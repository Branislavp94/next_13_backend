import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAuthUser = async (req) => {
  try {
    const { email } = req.query;

    const result = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return {
      success: true,
      status: 'success',
      result,
    };
  } catch (e: any) {
    return {
      success: false,
      status: 'failed',
      message: 'Server Error',
    };
  }
};
