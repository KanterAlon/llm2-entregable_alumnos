const { useState, useRef, useEffect } = React;

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg.text })
      });
      const data = await res.json();
      const botMsg = { role: 'bot', text: data.result || data.error };
      setMessages(m => [...m, botMsg]);
    } catch (err) {
      setMessages(m => [...m, { role: 'bot', text: 'Error al conectar' }]);
    } finally {
      setLoading(false);
    }
  }

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

ReactDOM.createRoot(document.getElementById('root')).render(<ChatApp />);
