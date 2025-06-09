"use client";

import React, { useState, useMemo } from "react";
import { PieChart, Pie, Sector, Tooltip } from "recharts";
import Layout from "../../Layouts/Layout";

export default function DashboardFinanciero({ expenses = [], incomes = [], view }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const data = useMemo(() => {
    const items = view === "expenses" ? expenses : view === "incomes" ? incomes : [];
    const grouped = items.reduce((acc, item) => {
      if (item.category) {
        acc[item.category] = (acc[item.category] || 0) + parseFloat(item.amount);
      }
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, amount], i) => ({
      category,
      amount,
      fill: `hsl(${(i * 40) % 360}, 70%, 60%)`,
    }));
  }, [expenses, incomes, view]);

  const total = data.reduce((acc, item) => acc + item.amount, 0);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="bold" fontSize={18}>
          {payload.category}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="#333"
          strokeWidth={2}
        />
        <path d={`M${sx},${sy}L${mx},${my}`} stroke={fill} fill="none" />
        <circle cx={mx} cy={my} r={4} fill={fill} stroke="none" />
        <text x={mx + (cos >= 0 ? 1 : -1) * 12} y={my} textAnchor={textAnchor} fill="#333" fontWeight="bold">
          {`$${value.toFixed(2)}`}
        </text>
        <text x={mx + (cos >= 0 ? 1 : -1) * 12} y={my} dy={18} textAnchor={textAnchor} fill="#999">
          {(percent * 100).toFixed(1)}%
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 capitalize">{view === "expenses" ? "Gastos" : "Ingresos"}</h2>

      <div className="flex gap-8">
        <div className="flex-shrink-0 w-2/5 flex flex-col items-center">
          {data.length > 0 ? (
            <PieChart width={300} height={300}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                cursor="pointer"
              />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          ) : (
            <p className="text-center text-gray-500">No hay datos para mostrar</p>
          )}
          <p className="text-lg font-bold mt-4">Total: ${total.toFixed(2)}</p>
          {activeIndex !== null && data[activeIndex] && (
            <p className="mt-2 text-gray-600">
              Categoría activa: <strong>{data[activeIndex].category}</strong>
            </p>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold mb-2">Últimos movimientos</h3>
          <ul className="divide-y divide-gray-200 overflow-auto max-h-[500px]">
            {(view === "expenses" ? expenses : incomes).map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <div>
                  <p className="font-medium">{item.description || item.category || "Sin descripción"}</p>
                  <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <p className={`font-semibold ${view === "expenses" ? "text-red-600" : "text-green-600"}`}>
                  ${parseFloat(item.amount).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

DashboardFinanciero.layout = (page) => <Layout>{page}</Layout>;
