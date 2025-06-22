import { useState, useEffect } from 'react';
import Chat from './Chat.jsx';
import { sendChat } from './api.js';

export default function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('qwen3:1.7b');
  const [temperature, setTemperature] = useState(0.75);
  const [tool, setTool] = useState('estudiantes');

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const data = await sendChat(userMsg.text, model, temperature, tool);
      const botMsg = { role: 'bot', text: data.result || data.error };
      setMessages(m => [...m, botMsg]);
    } catch (err) {
      setMessages(m => [...m, { role: 'bot', text: 'Error al conectar' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <Chat messages={messages} loading={loading} />
      <form className="input-area" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribí tu pregunta"
        />
        <select value={tool} onChange={e => setTool(e.target.value)}>
          <option value="estudiantes">Estudiantes</option>
        </select>
        <select value={model} onChange={e => setModel(e.target.value)}>
          <option value="qwen3:1.7b">qwen3:1.7b</option>
          <option value="llama2:7b">llama2:7b</option>
        </select>
        <input
          type="number"
          step="0.01"
          min="0"
          max="1"
          value={temperature}
          onChange={e => setTemperature(parseFloat(e.target.value))}
          style={{ width: '4rem' }}
        />
        <button type="submit" disabled={loading}>Enviar</button>
      </form>
    </div>
  );
}
