import React, { useState, useEffect } from 'react';
import Layout from "../Layouts/Layout";
import { jsPDF } from "jspdf";

export default function Chat({ csrf_token }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('finbot_history');
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('finbot_history', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrf_token,
        },
        body: JSON.stringify({
          message: question,
          history: [...messages, userMessage],
        }),
        credentials: 'same-origin',
      });

      const data = await res.json();
      const botReply = data.reply || 'Sin respuesta del bot.';

      setMessages((prev) => [...prev, { role: 'bot', content: botReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'bot', content: 'Error en la solicitud al bot.' }]);
    }

    setLoading(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Chat con FinBot", 10, 10);
    let y = 20;

    messages.forEach((msg) => {
      const roleLabel = msg.role === 'user' ? "Tú" : "FinBot";
      const text = `${roleLabel}: ${msg.content}`;
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 10, y);
      y += splitText.length * 8;
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save("chat-finbot.pdf");
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg flex flex-col font-sans min-h-[600px]">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Chat con FinBot</h1>

      <div className="flex flex-col gap-4 h-96 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 italic select-none">Aquí aparecerán tus mensajes y las respuestas de FinBot.</p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-3/4 px-5 py-3 rounded-lg shadow-sm break-words
              ${msg.role === 'user' ? 'self-end bg-blue-600 text-white rounded-tr-none' : 'self-start bg-gray-200 text-gray-900 rounded-tl-none'}`}
          >
            <small className="block opacity-60 mb-1 font-semibold">
              {msg.role === 'user' ? 'Tú' : 'FinBot'}
            </small>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4 mt-6">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Haz una pregunta..."
          required
          disabled={loading}
          className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 rounded-full text-white font-semibold transition
            ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => {
            setMessages([]);
            localStorage.removeItem('finbot_history');
          }}
          className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Limpiar conversación
        </button>
        <button
          onClick={generatePDF}
          className="px-5 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Descargar chat en PDF
        </button>
      </div>
    </div>
  );
}

Chat.layout = (page) => <Layout children={page} />;
