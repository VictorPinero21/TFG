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
      if (item.category && typeof item.category === 'string') {
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

  const activeIndex = React.useMemo(
    () => gastosData.findIndex((item) => item.categoria === activeCategoria),
    [activeCategoria, gastosData],
  )

  const totalGastos = React.useMemo(() =>
    gastosData.reduce((acc, item) => acc + item.monto, 0), [gastosData])

  const totalIngresos = React.useMemo(() =>
    incomes.reduce((acc, item) => acc + parseFloat(item.amount), 0), [incomes])

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
    })

  const handleSelectCategory = (categoria) => {
    setActiveCategoria(categoria)
    setIsSelectOpen(false)
  }

  const ultimosMovimientos = React.useMemo(() => {
    const combined = [
      ...expenses.map((e) => ({ ...e, tipo: "gasto" })),
      ...incomes.map((i) => ({ ...i, tipo: "ingreso" })),
    ]
    return combined.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)
  }, [expenses, incomes])

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
          <p className="text-gray-600">Resumen de tus gastos e ingresos del mes</p>
        </div>
        <Wallet className="h-8 w-8 text-blue-600" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Gastos</h3>
            <TrendingDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(totalGastos)}</div>
          <p className="text-xs text-gray-500">+2.5% desde el mes pasado</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Ingresos</h3>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIngresos)}</div>
          <p className="text-xs text-gray-500">Mismo que el mes pasado</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between pb-2">
            <h3 className="text-sm font-medium text-gray-600">Balance</h3>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalIngresos - totalGastos)}
          </div>
          <p className="text-xs text-gray-500">Disponible este mes</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between pb-4">
            <div>
              <h3 className="text-lg font-semibold">Gastos por Categoría</h3>
              <p className="text-sm text-gray-600">Distribución mensual de gastos</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="ml-auto h-8 w-36 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm flex items-center justify-between hover:bg-gray-50"
              >
                <span>{chartConfig[activeCategoria]?.label || activeCategoria}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isSelectOpen && (
                <div className="absolute right-0 top-9 z-10 w-36 rounded-lg border border-gray-300 bg-white shadow-lg">
                  {gastosData.map((item) => {
                    const config = chartConfig[item.categoria]
                    return (
                      <button
                        key={item.categoria}
                        onClick={() => handleSelectCategory(item.categoria)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
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
          <div className="flex flex-1 justify-center">
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
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan className="fill-foreground text-2xl font-bold">
                            {formatCurrency(gastosData[activeIndex]?.monto || 0)}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                            {chartConfig[activeCategoria]?.label || activeCategoria}
                          </tspan>
                        </text>
                      )
                    }
                    return null
                  }}
                />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Últimos Movimientos</h3>
          <ul className="divide-y divide-gray-100 border-b border-gray-200">
            {ultimosMovimientos.map((item) => (
              <li key={item.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex gap-x-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    item.tipo === "gasto" ? "bg-red-100" : "bg-green-100"
                  }`}>
                    {item.tipo === "gasto"
                      ? <TrendingDown className="h-6 w-6 text-red-600" />
                      : <TrendingUp className="h-6 w-6 text-green-600" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.description}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{formatDate(item.date)}</p>
                  </div>
                </div>
                <div className={`text-sm font-semibold leading-6 ${
                  item.tipo === "gasto" ? "text-red-600" : "text-green-600"
                }`}>
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

DashboardFinanciero.layout = (page) => <Layout children={page} />
