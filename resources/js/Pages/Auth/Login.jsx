import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

const ModernLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, password });
    Inertia.post('/login', {
      email,
      password,
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '32px 32px 0 32px', textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #2563eb, #9333ea)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9h-9v3.6h5.2c-.2 1.2-1 2.3-2 3l3.3 2.6c2-1.9 3.2-4.6 3.2-7.3z" />
            </svg>
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #1f2937, #6b7280)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 8px 0',
            }}
          >
            Bienvenido de vuelta
          </h1>
          <p style={{ color: '#6b7280', margin: '0 0 32px 0', fontSize: '14px' }}>
            Inicia sesión en tu cuenta para continuar
          </p>
        </div>

        {/* Botones sociales */}
        <div style={{ padding: '0 32px 32px 32px' }}>
  <div style={{ marginBottom: '24px' }}>
    <a
      href="/login/google"
      className="bg-red-500 text-white px-4 py-2 rounded"
      style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}
    >
      Iniciar sesión con Google
    </a>

    <button
      style={{
        width: '100%',
        height: '48px',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s',
        marginTop: '16px',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#f9fafb';
        e.target.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'white';
        e.target.style.transform = 'scale(1)';
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '12px' }}>
        {/* Apple icon */}
        <path d="M15.53 3.83...z" />
      </svg>
      Continuar con Apple
    </button>
  </div>

  {/* ... resto del formulario */}
</div>
      </div>
    </div>
  );
};

export default ModernLogin;
