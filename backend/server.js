import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { elAgente } from './agent.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(new URL('../frontend/build', import.meta.url).pathname));
app.use(express.static(new URL('../public', import.meta.url).pathname));


app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt requerido' });
  }
  try {
    const respuesta = await elAgente.run(prompt);
    res.json({ result: respuesta.data.result });
  } catch (err) {
    console.error('Error al procesar el mensaje', err);
    res.status(500).json({ error: 'No se pudo procesar el mensaje' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
