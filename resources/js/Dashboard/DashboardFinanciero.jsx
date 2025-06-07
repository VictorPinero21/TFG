"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { CreditCard, TrendingDown, TrendingUp, Wallet, ChevronDown } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const gastosData = [
  { categoria: "alimentacion", monto: 1250, fill: "hsl(var(--chart-1))" },
  { categoria: "transporte", monto: 850, fill: "hsl(var(--chart-2))" },
  { categoria: "entretenimiento", monto: 650, fill: "hsl(var(--chart-3))" },
  { categoria: "servicios", monto: 1100, fill: "hsl(var(--chart-4))" },
  { categoria: "salud", monto: 450, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  monto: { label: "Monto" },
  alimentacion: { label: "Alimentación", color: "hsl(var(--chart-1))" },
  transporte: { label: "Transporte", color: "hsl(var(--chart-2))" },
  entretenimiento: { label: "Entretenimiento", color: "hsl(var(--chart-3))" },
  servicios: { label: "Servicios", color: "hsl(var(--chart-4))" },
  salud: { label: "Salud", color: "hsl(var(--chart-5))" },
}

const ultimosGastos = [
  {
    id: 1,
    descripcion: "Supermercado Central",
    categoria: "Alimentación",
    monto: 125.5,
    fecha: "2024-01-15",
    tipo: "gasto",
  },
  {
    id: 2,
    descripcion: "Gasolina Shell",
    categoria: "Transporte",
    monto: 85.0,
    fecha: "2024-01-14",
    tipo: "gasto",
  },
  {
    id: 3,
    descripcion: "Netflix Suscripción",
    categoria: "Entretenimiento",
    monto: 15.99,
    fecha: "2024-01-13",
    tipo: "gasto",
  },
  {
    id: 4,
    descripcion: "Salario Enero",
    categoria: "Ingreso",
    monto: 3500.0,
    fecha: "2024-01-12",
    tipo: "ingreso",
  },
  {
    id: 5,
    descripcion: "Farmacia San Pablo",
    categoria: "Salud",
    monto: 45.75,
    fecha: "2024-01-11",
    tipo: "gasto",
  },
  {
    id: 6,
    descripcion: "Luz Eléctrica",
    categoria: "Servicios",
    monto: 120.0,
    fecha: "2024-01-10",
    tipo: "gasto",
  },
]

export default function DashboardFinanciero() {
  const [activeCategoria, setActiveCategoria] = React.useState(gastosData[0].categoria)
  const [isSelectOpen, setIsSelectOpen] = React.useState(false)

  const activeIndex = React.useMemo(
    () => gastosData.findIndex((item) => item.categoria === activeCategoria),
    [activeCategoria],
  )

  const totalGastos = React.useMemo(() => gastosData.reduce((acc, item) => acc + item.monto, 0), [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
    })
  }

  const handleSelectCategory = (categoria) => {
    setActiveCategoria(categoria)
    setIsSelectOpen(false)
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h1>
          <p className="text-gray-600 dark:text-gray-400">Resumen de tus gastos e ingresos del mes</p>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Gastos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Gastos</h3>
            <TrendingDown className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(totalGastos)}</div>
          <p className="text-xs text-gray-500">+2.5% desde el mes pasado</p>
        </div>

        {/* Ingresos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Ingresos</h3>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(3500)}</div>
          <p className="text-xs text-gray-500">Mismo que el mes pasado</p>
        </div>

        {/* Balance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Balance</h3>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(3500 - totalGastos)}</div>
          <p className="text-xs text-gray-500">Disponible este mes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Gastos por Categoría */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col">
          <div className="flex-row items-start space-y-0 pb-4 flex justify-between">
            <div className="grid gap-1">
              <h3 className="text-lg font-semibold">Gastos por Categoría</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Distribución mensual de gastos</p>
            </div>

            {/* Custom Select */}
            <div className="relative">
              <button
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="ml-auto h-8 w-36 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <span>{chartConfig[activeCategoria]?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isSelectOpen && (
                <div className="absolute right-0 top-9 z-10 w-36 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-lg">
                  {gastosData.map((item) => {
                    const config = chartConfig[item.categoria]
                    return (
                      <button
                        key={item.categoria}
                        onClick={() => handleSelectCategory(item.categoria)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
                      >
                        <span className="flex h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: item.fill }} />
                        {config?.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 justify-center pb-0">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={gastosData}
                  dataKey="monto"
                  nameKey="categoria"
                  innerRadius={60}
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
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                              {formatCurrency(gastosData[activeIndex].monto)}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                              {chartConfig[activeCategoria]?.label}
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>

        {/* Últimos Movimientos */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="pb-4">
            <h3 className="text-lg font-semibold">Últimos Movimientos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tus transacciones más recientes</p>
          </div>

          <div className="space-y-4">
            {ultimosGastos.map((gasto) => (
              <div
                key={gasto.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      gasto.tipo === "ingreso"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                        : "bg-red-100 text-red-600 dark:bg-red-900/20"
                    }`}
                  >
                    {gasto.tipo === "ingreso" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{gasto.descripcion}</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-600 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {gasto.categoria}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(gasto.fecha)}</span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${gasto.tipo === "ingreso" ? "text-green-600" : "text-red-600"}`}>
                  {gasto.tipo === "ingreso" ? "+" : "-"}
                  {formatCurrency(gasto.monto)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
