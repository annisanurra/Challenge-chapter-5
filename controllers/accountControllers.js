const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  createAccount: async (req, res) => {
     try {
       const { user_id, bank_name, bank_account_number, balance } = req.body;
       const account = await BankAccount.create({ data: { user_id, bank_name, bank_account_number, balance } });
       res.status(201).json(account);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
  },
 
  getAllAccounts: async (req, res) => {
     try {
       const accounts = await BankAccount.findMany();
       res.status(200).json(accounts);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
  },
 
  getAccountById: async (req, res) => {
     try {
       const { id } = req.params;
       const account = await BankAccount.findUnique({ where: { id: parseInt(id) } });
       res.status(200).json(account);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
  },
 
  updateAccount: async (req, res) => {
     try {
       const { id } = req.params;
       const { bank_name, bank_account_number, balance } = req.body;
       const account = await BankAccount.update({ where: { id: parseInt(id) }, data: { bank_name, bank_account_number, balance } });
       res.status(200).json(account);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
  },
 
  deleteAccount: async (req, res) => {
     try {
       const { id } = req.params;
       const account = await BankAccount.delete({ where: { id: parseInt(id) } });
       res.status(200).json(account);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
  },
 };