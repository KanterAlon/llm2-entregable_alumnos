import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { prompt: userMsg.text });
      const data = res.data;
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
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>{m.text}</div>
        ))}
        {loading && <div className="loading">Pensando...</div>}
        <div ref={endRef}></div>
      </div>
      <form className="input-area" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribí tu pregunta"
        />
        <button type="submit" disabled={loading}>Enviar</button>
      </form>
    </div>
  );
}

export default App;
