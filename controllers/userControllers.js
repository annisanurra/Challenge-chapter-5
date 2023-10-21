const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
// const { User } = require('../models');

module.exports = {
 createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 },

 getAllUsers: async (req, res) => {
    try {
      const users = await User.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 },

 getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findUnique({ where: { id: parseInt(id) } });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 },

 updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.update({ where: { id: parseInt(id) }, data: { name, email, password: hashedPassword } });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 },

 deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.delete({ where: { id: parseInt(id) } });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 },
};