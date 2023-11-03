import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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

export const getUser = async (req) => {
  try {
    const { id } = req.query;

    const result = await prisma.user.findUnique({
      where: {
        id: parseFloat(id),
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

export const updateUser = async (req) => {
  try {
    const {
      username,
      email,
      role,
      id,
    } = req.body;

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        role,
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

export const updateUserPassword = async (req) => {
  try {
    const { current_password, id, new_password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: parseFloat(id),
      },
    });

    const isSamePassword = await bcrypt.compare(current_password, user.password);

    if (!isSamePassword) {
      return {
        success: false,
        status: 'verification-valied',
        message: [{
          name: 'You enter incorect current password',
        }],
      };
    }

    const password = await bcrypt.hash(new_password, 10);

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
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

export const uploadFile = async (req) => {
  try {
    const { file } = req;
    const { id } = req.body;

    await prisma.user.update({
      where: {
        id: parseFloat(id),
      },
      data: {
        image: `${process.env.BACKEND_APP_DOMAIN}/${file.path}`,
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
