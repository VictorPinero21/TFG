"use client"

import * as React from "react"
import { PieChart, Pie, Sector, Label, Tooltip } from "recharts"
import { CreditCard, TrendingDown, TrendingUp, Wallet, ChevronDown } from "lucide-react"
import Layout from "../../Layouts/Layout"

const chartConfig = {
  alimentacion: { label: "Alimentación", color: "hsl(var(--chart-1))" },
  transporte: { label: "Transporte", color: "hsl(var(--chart-2))" },
  entretenimiento: { label: "Entretenimiento", color: "hsl(var(--chart-3))" },
  servicios: { label: "Servicios", color: "hsl(var(--chart-4))" },
  salud: { label: "Salud", color: "hsl(var(--chart-5))" },
  vivienda: { label: "Vivienda", color: "hsl(var(--chart-6))" },
  educacion: { label: "Educación", color: "hsl(var(--chart-7))" },
  otros: { label: "Otros", color: "hsl(var(--chart-8))" },
  salario: { label: "Salario", color: "hsl(var(--chart-9))" },
}

export default function DashboardFinanciero({ expenses = [], incomes = [] }) {
  const [activeCategoria, setActiveCategoria] = React.useState(null)
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)

  const gastosData = React.useMemo(() => {
    const grouped = expenses.reduce((acc, item) => {
      if (item.category && typeof item.category === "string") {
        const cat = item.category.toLowerCase()
        acc[cat] = (acc[cat] || 0) + parseFloat(item.amount)
      }
      return acc
    }, {})

    return Object.entries(grouped).map(([categoria, monto], i) => ({
      categoria,
      monto,
      fill: `hsl(var(--chart-${(i % 9) + 1}))`,
    }))
  }, [expenses])

  React.useEffect(() => {
    if (gastosData.length > 0 && !activeCategoria) {
      setActiveCategoria(gastosData[0].categoria)
    }
  }, [gastosData, activeCategoria])

  const activeIndex = gastosData.findIndex((item) => item.categoria === activeCategoria)

  const totalGastos = gastosData.reduce((acc, item) => acc + item.monto, 0)
  const totalIngresos = incomes.reduce((acc, item) => acc + parseFloat(item.amount), 0)
  const balance = totalIngresos - totalGastos

  const ultimosMovimientos = React.useMemo(() => {
    const combined = [
      ...expenses.map((e) => ({ ...e, tipo: "gasto" })),
      ...incomes.map((i) => ({ ...i, tipo: "ingreso" })),
    ]
    return combined.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)
  }, [expenses, incomes])

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount)

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
    })

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Resumen Financiero</h1>
          <p className="text-muted-foreground">Tu situación actual de ingresos y gastos</p>
        </div>
        <Wallet className="h-8 w-8 text-blue-500" />
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: "Total Gastos",
            icon: <TrendingDown className="text-red-600" />,
            value: formatCurrency(totalGastos),
            color: "text-red-600",
            caption: "+2.5% desde el mes pasado",
          },
          {
            label: "Ingresos",
            icon: <TrendingUp className="text-green-600" />,
            value: formatCurrency(totalIngresos),
            color: "text-green-600",
            caption: "Mismo que el mes pasado",
          },
          {
            label: "Balance",
            icon: <CreditCard className="text-blue-600" />,
            value: formatCurrency(balance),
            color: balance < 0 ? "text-red-600" : "text-blue-600",
            caption: "Disponible este mes",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{item.label}</span>
              {item.icon}
            </div>
            <div className={`text-2xl font-semibold ${item.color}`}>{item.value}</div>
            <p className="text-xs text-gray-400">{item.caption}</p>
          </div>
        ))}
      </div>

      {/* Sección de gráfico y movimientos */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h3 className="text-lg font-semibold">Gastos por Categoría</h3>
              <p className="text-sm text-muted-foreground">Distribución mensual</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md text-sm"
              >
                {chartConfig[activeCategoria]?.label || activeCategoria}
                <ChevronDown className="h-4 w-4" />
              </button>
              {isSelectOpen && (
                <div className="absolute z-10 mt-2 right-0 w-40 bg-white border shadow rounded-md">
                  {gastosData.map((item) => {
                    const config = chartConfig[item.categoria]
                    return (
                      <button
                        key={item.categoria}
                        onClick={() => {
                          setActiveCategoria(item.categoria)
                          setIsSelectOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.fill }} />
                        {config?.label || item.categoria}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <PieChart width={300} height={300}>
              <Pie
                data={gastosData}
                dataKey="monto"
                nameKey="categoria"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox) return null
                    return (
                      <>
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan className="fill-foreground text-2xl font-bold">
                            {formatCurrency(gastosData[activeIndex]?.monto || 0)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            {chartConfig[activeCategoria]?.label || activeCategoria}
                          </tspan>
                        </text>
                      </>
                    )
                  }}
                />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Últimos Movimientos</h3>
          <ul className="divide-y divide-gray-100">
            {ultimosMovimientos.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full ${
                      item.tipo === "gasto" ? "bg-red-100" : "bg-green-100"
                    }`}
                  >
                    {item.tipo === "gasto" ? (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                  </div>
                </div>
                <div
                  className={`text-sm font-semibold ${
                    item.tipo === "gasto" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatCurrency(parseFloat(item.amount))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

DashboardFinanciero.layout = (page) => <Layout>{page}</Layout>
