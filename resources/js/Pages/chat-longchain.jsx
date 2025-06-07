import React, { useState } from 'react';
import Layout from "../Layouts/Layout";
export default function Chat({ csrf_token }) {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse('');

        try {
          const res = await fetch('/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrf_token,
            },
            body: JSON.stringify({ question }),
            credentials: 'same-origin' 
            });

            const data = await res.json();

            if (data.response) {
                setResponse(data.response);
            } else {
                setResponse('Error: ' + (data.error || 'Sin respuesta'));
            }
        } catch (err) {
            setResponse('Error en la solicitud');
        }

        setLoading(false);
    };

    return (
      <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Chat con el Bot</h1>
  
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
              <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Haz una pregunta"
                  required
                  style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 4,
                      border: '1px solid #ccc',
                      fontSize: 16,
                  }}
              />
              <button
                  type="submit"
                  disabled={loading}
                  style={{
                      padding: '10px 20px',
                      borderRadius: 4,
                      border: 'none',
                      backgroundColor: loading ? '#aaa' : '#007bff',
                      color: '#fff',
                      fontSize: 16,
                      cursor: loading ? 'not-allowed' : 'pointer',
                  }}
              >
                  {loading ? 'Enviando...' : 'Enviar'}
              </button>
          </form>
  
          <div style={{ marginTop: 30 }}>
              <strong>Respuesta:</strong>
              <p style={{ backgroundColor: '#f9f9f9', padding: 10, borderRadius: 4 }}>{response}</p>
          </div>
      </div>
  );
  
}
Chat.layout = (page) => <Layout children={page} />;