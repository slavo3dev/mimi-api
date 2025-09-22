import express, { Request, Response } from 'express';
import videoRoutes from './routes/videoRoutes'

const app = express();

app.use(express.json());

app.use('/videos', videoRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World MimiKa Server');
});

export default app;