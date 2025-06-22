import axios from 'axios';

export async function sendChat(prompt, model, temperature, tool) {
  const res = await axios.post('/api/chat', { prompt, model, temperature, tool });
  return res.data;
}
