"use client";

import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Layout from "../../Layouts/Layout";

export default function Dashboard({ expenses = [], incomes = [] }) {
  
  const data = useMemo(() => {
    const map = new Map();

    const addToMap = (items, keyName) => {
      items.forEach(({ date, amount }) => {
        const key = new Date(date).toLocaleDateString();
        if (!map.has(key)) map.set(key, { date: key, totalExpenses: 0, totalIncomes: 0 });
        map.get(key)[keyName] += parseFloat(amount);
      });
    };

    addToMap(expenses, "totalExpenses");
    addToMap(incomes, "totalIncomes");

    return Array.from(map.values()).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [expenses, incomes]);

  const totalExpenses = expenses.reduce((acc, { amount }) => acc + parseFloat(amount), 0);
  const totalIncomes = incomes.reduce((acc, { amount }) => acc + parseFloat(amount), 0);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Financiero General</h1>

      <div className="mb-8 flex justify-between">
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded shadow w-1/2 mr-4">
          <h2 className="font-semibold">Total Gastos</h2>
          <p className="text-xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-3 rounded shadow w-1/2">
          <h2 className="font-semibold">Total Ingresos</h2>
          <p className="text-xl font-bold">${totalIncomes.toFixed(2)}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="totalExpenses" fill="#ef4444" name="Gastos" />
          <Bar dataKey="totalIncomes" fill="#22c55e" name="Ingresos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

Dashboard.layout = (page) => <Layout>{page}</Layout>;
