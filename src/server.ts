import dotenv from 'dotenv';
import app from './app'

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT} (env PORT=${process.env.PORT ?? 3000})`);
});

