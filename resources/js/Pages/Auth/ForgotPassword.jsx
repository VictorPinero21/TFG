import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

const ForgotPassword = () => {
  const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
    email: '',
  });

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/password/reset-link', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Error enviando el correo.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg">
        {/* Header */}
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent mb-2">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            No te preocupes, te enviaremos un enlace para restablecer tu contraseña
          </p>
          {recentlySuccessful && (
            <p className="text-green-600 mt-2 text-sm">
              Enlace de recuperación enviado a tu correo.
            </p>
          )}
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          <form onSubmit={submit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  required
                  className={`w-full h-12 pl-10 pr-3 border-2 rounded-lg text-sm focus:outline-none transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className={`w-full h-12 rounded-lg text-sm font-medium text-white flex items-center justify-center transition ${
                processing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {processing ? (
                <>
                  <svg
                    className="animate-spin mr-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar enlace de recuperación'
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              ← Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
