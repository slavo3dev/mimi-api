import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes'

const app = express();

app.use(express.json());

app.use("/users", userRoutes)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World MimiKa Server');
});

export default app;