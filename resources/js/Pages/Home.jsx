"use client"
import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col">
            <header className="container mx-auto px-6 py-6 flex justify-between items-center">
                <h1 className="text-pink-500 text-3xl font-extrabold tracking-wide">FinTrack</h1>
                <nav className="space-x-6">
                    <a href="/login" className="text-pink-400 hover:text-pink-600 font-semibold transition">Login</a>
                    <a href="/register" className="text-pink-400 hover:text-pink-600 font-semibold transition">Register</a>
                </nav>
            </header>

            <main className="flex-grow container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-pink-500 text-5xl font-extrabold leading-tight mb-6">
                        Domina tus finanzas con <span className="text-white">FinTrack</span>
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg max-w-lg">
                        Gestiona gastos, ingresos y recibe consejos inteligentes de nuestro asistente IA para que tu dinero trabaje para ti.
                    </p>

                    <div className="flex justify-center md:justify-start gap-4">
                        <a
                            href="/dashboard"
                            className="px-8 py-3 bg-pink-600 rounded-full text-white font-semibold shadow-lg hover:bg-pink-700 transition"
                        >
                            Comenzar ahora
                        </a>
                        <a
                            href="/docs/Daw_Victor_Pinero_Documentacion_TFG.pdf"
                            className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition"
                            download
                        >
                            Docs
                        </a>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <div className="bg-gradient-to-tr from-pink-700 to-pink-900 rounded-xl shadow-2xl p-6 text-white">
                        <h3 className="text-2xl font-bold mb-4">¿Qué ofrece FinTrack?</h3>
                        <ul className="space-y-4 text-pink-300">
                            {[
                                {
                                    icon: "M9 12l2 2l4 -4",
                                    text: "Seguimiento automático de gastos e ingresos",
                                },
                                {
                                    icon: "M12 20l9-5-9-5-9 5 9 5z",
                                    text: "Análisis financiero inteligente con IA",
                                },
                                {
                                    icon: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0m0-6v6m0 6h.01",
                                    text: "Newsletter semanal con novedades y consejos exclusivos",
                                },
                                {
                                    icon: "M21 12v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-7m7-2l5 5l5 -5",
                                    text: "Chatbot IA para responder tus dudas financieras al instante",
                                },
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <svg
                                        className="w-6 h-6 text-pink-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d={item.icon} />
                                    </svg>
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>

           
        </div>
    );
}
