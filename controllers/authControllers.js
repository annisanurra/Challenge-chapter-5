const prisma = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export const register = async (req, res) => {
 const { name, email, password, identity_type, identity_number, address } = req.body;

 try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: {
          create: {
            identity_type,
            identity_number,
            address,
          },
        },
      },
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
 } catch (error) {
    res.status(400).json({
      message: 'Error registering user',
      error,
    });
 }
};

export const login = async (req, res) => {
 const { email, password } = req.body;

 try {
    const user = await prisma.users.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }

    const token = sign({ userId: user.id }, 'your_jwt_secret_key', { expiresIn: '60m' });

    res.status(200).json({
      message: 'User logged in successfully',
      token,
    });
 } catch (error) {
    res.status(400).json({
      message: 'Error logging in user',
      error,
    });
 }
};

export const authenticate = async (req, res, next) => {
 const token = req.headers.authorization?.split(' ')[1];

 if (!token) {
   return res.status(401).json({
     message: 'Unauthorized access',
   });
 }

 try {
    const decoded = verify(token, 'your_jwt_secret_key');

    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    req.user = user;
    next();
 } catch (error) {
    res.status(400).json({
      message: 'Error authenticating user',
      error,
    });
 }
};