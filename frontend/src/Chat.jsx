import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat({ messages, loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="messages">
      {messages.map((m, i) => (
        <div key={i} className={`message ${m.role}`}> 
          {m.role === 'bot' && <span className="avatar">🤖</span>}
          <ReactMarkdown>{m.text}</ReactMarkdown>
        </div>
      ))}
      {loading && <div className="loading">Pensando...</div>}
      <div ref={endRef}></div>
    </div>
  );
}
