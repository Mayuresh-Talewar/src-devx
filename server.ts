import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/menu', async (req, res) => {
  const items = await prisma.menuItem.findMany();
  res.json(items);
});

app.post('/reservations', async (req, res) => {
  const { name, email, phone, date } = req.body;
  const reservation = await prisma.reservation.create({
    data: { name, email, phone, date },
  });
  res.status(201).json(reservation);
});

app.post('/orders', async (req, res) => {
  const { items } = req.body;
  const order = await prisma.order.create({
    data: { items: { create: items } },
  });
  res.status(201).json(order);
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});