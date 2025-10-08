import express, { Request, Response } from 'express';
import videoRoutes from './routes/videoRoutes';
import porchRoutes from "./routes/porchRoutes";

const app = express();

app.use(express.json());

app.use('/videos', videoRoutes);

app.use('/porch', porchRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World MimiKa Server');
});

export default app;