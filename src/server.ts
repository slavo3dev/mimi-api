import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World MimiKa Server');
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT} (env PORT=${process.env.PORT ?? 3000})`);
});
