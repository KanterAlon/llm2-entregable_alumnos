import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createAgent } from './agent.js';

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(new URL('../frontend/build', import.meta.url).pathname));
app.use(express.static(new URL('../public', import.meta.url).pathname));


app.post('/api/chat', async (req, res) => {
  const { prompt, model, temperature } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt requerido' });
  }
  const agente = createAgent({ model, temperature });
  try {
    const respuesta = await agente.run(prompt);
    res.json({ result: respuesta.data.result });
  } catch (err) {
    console.error('Error al procesar el mensaje', err);
    res.status(500).json({ error: 'No se pudo procesar el mensaje' });
  }
});

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export default app;
