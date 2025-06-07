"use client"

import { useEffect, useState } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Home, Receipt, Wallet, MessageCircle, Settings, HelpCircle, Bell, Sun, Moon } from "lucide-react"

export default function Layout({ children }) {
  const { url } = usePage()

  // Estado tema, con manejo seguro para SSR
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        setTheme(savedTheme)
      } else {
        // Puedes detectar el tema del sistema aquí si quieres:
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setTheme(prefersDark ? "dark" : "light")
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
      const root = document.documentElement
      if (theme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  const navigation = [
    {
      title: "OVERVIEW",
      items: [{ name: "Dashboard", href: "/", icon: Home }],
    },
    {
      title: "FINANCE",
      items: [
        { name: "Ingresos", href: "/incomes", icon: Receipt },
        { name: "Gastos", href: "/expenses", icon: Wallet },
      ],
    },
    {
      title: "TEAM",
      items: [{ name: "IA chat", href: "/chat", icon: MessageCircle }],
    },
  ]

  // Mejor función para determinar si una ruta está activa,
  // considerando que solo rutas exactas o subrutas contiguas deben ser activas.
  const isActive = (href) => {
    if (href === "/") {
      return url === "/" || url === ""
    }
    // Añadimos "/" al final de href para evitar casos donde "/incomes" active "/income" accidentalmente
    const normalizedHref = href.endsWith("/") ? href : href + "/"
    const normalizedUrl = url.endsWith("/") ? url : url + "/"
    return normalizedUrl.startsWith(normalizedHref)
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-[208px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Fintrack</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 bg-white dark:bg-gray-800">
          {navigation.map(({ title, items }) => (
            <div key={title} className="mb-6">
              <h3 className="px-4 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {title}
              </h3>
              <div>
                {items.map(({ name, href, icon: Icon }) => {
                  const active = isActive(href)
                  return (
                    <Link
                      key={name}
                      href={href}
                      preserveScroll
                      className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
                        active
                          ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium border-r-2 border-green-500"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          active ? "text-green-500 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
                        }`}
                      />
                      {name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-4 bg-white dark:bg-gray-800">
          <Link
            href="/settings"
            preserveScroll
            className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
              isActive("/settings")
                ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium border-r-2 border-green-500"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <Settings
              className={`mr-3 h-5 w-5 ${
                isActive("/settings") ? "text-green-500 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
              }`}
            />
            Settings
          </Link>
          <Link
            href="/help"
            preserveScroll
            className={`flex items-center px-4 py-2 text-sm transition-colors duration-150 ${
              isActive("/help")
                ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium border-r-2 border-green-500"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <HelpCircle
              className={`mr-3 h-5 w-5 ${
                isActive("/help") ? "text-green-500 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
              }`}
            />
            Help
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div /> {/* Placeholder para posible contenido futuro */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-150"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-150"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  )
}
