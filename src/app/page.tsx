"use client"

import { useState, useEffect } from "react"
import { Check, Crown, Sparkles, Lock, Unlock, Video, BookOpen, Wrench, Headphones, Zap, Users, Calendar, Bell, Settings, CreditCard, LogOut, Mail, User, Menu, X, MessageCircle, HelpCircle, Shield } from "lucide-react"

type Plan = "Premium" | "Essencial" | null
type Page = "home" | "login" | "payment" | "dashboard" | "account" | "notifications" | "support"

interface UserData {
  email: string
  name: string
  plan: Plan
  notifications: Notification[]
}

interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [selectedPlan, setSelectedPlan] = useState<Plan>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Carregar dados do usuário do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("userData")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserData(user)
      setCurrentPage("dashboard")
    }
  }, [])

  // Salvar dados do usuário
  const saveUserData = (data: UserData) => {
    setUserData(data)
    localStorage.setItem("userData", JSON.stringify(data))
  }

  // Logout
  const handleLogout = () => {
    setUserData(null)
    localStorage.removeItem("userData")
    setCurrentPage("home")
  }

  // Login
  const handleLogin = (email: string, password: string) => {
    const newUser: UserData = {
      email,
      name: email.split("@")[0],
      plan: null,
      notifications: [
        {
          id: "1",
          title: "Bem-vindo!",
          message: "Obrigado por se juntar a nós. Escolha um plano para começar.",
          date: new Date().toLocaleDateString("pt-PT"),
          read: false
        }
      ]
    }
    saveUserData(newUser)
    setCurrentPage("home")
  }

  // Processar pagamento
  const handlePayment = (plan: Plan, cardNumber: string) => {
    if (userData) {
      const updatedUser = {
        ...userData,
        plan,
        notifications: [
          {
            id: Date.now().toString(),
            title: "Assinatura ativada!",
            message: `Seu plano ${plan} foi ativado com sucesso. Aproveite todo o conteúdo exclusivo!`,
            date: new Date().toLocaleDateString("pt-PT"),
            read: false
          },
          ...userData.notifications
        ]
      }
      saveUserData(updatedUser)
      setCurrentPage("dashboard")
    }
  }

  // Marcar notificação como lida
  const markAsRead = (id: string) => {
    if (userData) {
      const updatedUser = {
        ...userData,
        notifications: userData.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      }
      saveUserData(updatedUser)
    }
  }

  // Página de Login
  if (currentPage === "login" && !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h2>
            <p className="text-gray-600">Entre para acessar sua conta</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleLogin(formData.get("email") as string, formData.get("password") as string)
          }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage("home")}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Voltar para planos
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Página de Pagamento
  if (currentPage === "payment" && selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Assinatura</h2>
            <p className="text-gray-600">Plano {selectedPlan} - €{selectedPlan === "Premium" ? "9,99" : "5,99"}/mês</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handlePayment(selectedPlan, formData.get("cardNumber") as string)
          }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome no cartão</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                placeholder="João Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número do cartão</label>
              <input
                type="text"
                name="cardNumber"
                required
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Validade</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  required
                  maxLength={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  placeholder="123"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">€{selectedPlan === "Premium" ? "9,99" : "5,99"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IVA (23%)</span>
                <span className="font-medium text-gray-900">€{selectedPlan === "Premium" ? "2,30" : "1,38"}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">€{selectedPlan === "Premium" ? "12,29" : "7,37"}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Confirmar Pagamento
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage("home")}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Página de Notificações
  if (currentPage === "notifications" && userData) {
    const unreadCount = userData.notifications.filter(n => !n.read).length

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header 
          userData={userData} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          handleLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notificações</h1>
            <p className="text-gray-600">{unreadCount} não lida{unreadCount !== 1 ? "s" : ""}</p>
          </div>

          <div className="space-y-4">
            {userData.notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                  !notification.read ? "border-2 border-purple-200" : "border border-gray-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    !notification.read 
                      ? "bg-gradient-to-br from-purple-600 to-blue-600" 
                      : "bg-gray-100"
                  }`}>
                    <Bell className={`w-6 h-6 ${!notification.read ? "text-white" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">{notification.date}</span>
                    </div>
                    <p className="text-gray-600">{notification.message}</p>
                    {!notification.read && (
                      <span className="inline-block mt-2 text-xs font-medium text-purple-600">Nova</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Página de Gestão de Conta
  if (currentPage === "account" && userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header 
          userData={userData} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          handleLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestão de Conta</h1>

          <div className="space-y-6">
            {/* Informações Pessoais */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                  Salvar Alterações
                </button>
              </div>
            </div>

            {/* Plano Atual */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Plano Atual
              </h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userData.plan || "Nenhum"}</p>
                  <p className="text-gray-600">
                    {userData.plan ? `€${userData.plan === "Premium" ? "9,99" : "5,99"}/mês` : "Escolha um plano"}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  {userData.plan ? "Mudar Plano" : "Escolher Plano"}
                </button>
              </div>
              {userData.plan && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">Próxima cobrança: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-PT")}</p>
                </div>
              )}
            </div>

            {/* Método de Pagamento */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Método de Pagamento
              </h2>
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">•••• •••• •••• 3456</p>
                    <p className="text-sm text-gray-600">Expira 12/25</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Alterar
                </button>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança
              </h2>
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all">
                Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Página de Suporte
  if (currentPage === "support" && userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header 
          userData={userData} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          handleLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Suporte</h1>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chat ao Vivo</h3>
              <p className="text-gray-600 mb-4">Fale conosco em tempo real</p>
              {userData.plan === "Premium" && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                  Resposta prioritária
                </span>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">suporte@exemplo.com</p>
              <span className="text-sm text-gray-500">Resposta em até 24h</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <span className="font-medium text-gray-900">Como cancelar minha assinatura?</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="p-4 text-gray-600">
                  Você pode cancelar sua assinatura a qualquer momento na página de Gestão de Conta. O acesso continuará até o fim do período pago.
                </p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <span className="font-medium text-gray-900">Posso mudar de plano?</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="p-4 text-gray-600">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações serão aplicadas no próximo ciclo de cobrança.
                </p>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                  <span className="font-medium text-gray-900">Qual a diferença entre os planos?</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="p-4 text-gray-600">
                  O plano Premium inclui conteúdo exclusivo (vídeos, e-books, ferramentas), suporte prioritário e acesso antecipado a novidades. O Essencial oferece acesso ilimitado a artigos, vídeos regulares e participação em fóruns.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard (Área Exclusiva)
  if (currentPage === "dashboard" && userData && userData.plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header 
          userData={userData} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          handleLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">Bem-vindo, {userData.name}!</h2>
                <p className="text-lg text-purple-100">Aproveite todo o conteúdo do plano {userData.plan}</p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ContentCard
              icon={Video}
              title="Vídeos Exclusivos"
              description="Acesso a tutoriais em vídeo e masterclasses"
              count="24 vídeos"
              gradient="from-red-500 to-pink-500"
              color="text-red-600"
            />

            <ContentCard
              icon={BookOpen}
              title="E-books Premium"
              description="Biblioteca completa de guias e materiais"
              count="12 e-books"
              gradient="from-blue-500 to-cyan-500"
              color="text-blue-600"
            />

            <ContentCard
              icon={Wrench}
              title="Ferramentas Exclusivas"
              description="Acesso a ferramentas e recursos premium"
              count="8 ferramentas"
              gradient="from-green-500 to-emerald-500"
              color="text-green-600"
            />

            {userData.plan === "Premium" && (
              <>
                <ContentCard
                  icon={Headphones}
                  title="Suporte Prioritário"
                  description="Atendimento rápido e personalizado"
                  count="Resposta em até 2h"
                  gradient="from-orange-500 to-yellow-500"
                  color="text-orange-600"
                />

                <ContentCard
                  icon={Zap}
                  title="Acesso Antecipado"
                  description="Seja o primeiro a testar novidades"
                  count="3 novidades em breve"
                  gradient="from-purple-500 to-pink-500"
                  color="text-purple-600"
                />
              </>
            )}

            <ContentCard
              icon={Users}
              title="Fóruns Exclusivos"
              description="Participe de discussões com a comunidade"
              count="1.2k membros ativos"
              gradient="from-indigo-500 to-purple-500"
              color="text-indigo-600"
            />

            <ContentCard
              icon={Calendar}
              title="Webinars ao Vivo"
              description="Participe de eventos online exclusivos"
              count="Próximo: Amanhã às 19h"
              gradient="from-teal-500 to-green-500"
              color="text-teal-600"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard value="24" label="Vídeos" color="text-purple-600" />
            <StatCard value="12" label="E-books" color="text-blue-600" />
            <StatCard value="8" label="Ferramentas" color="text-green-600" />
            <StatCard value="1.2k" label="Membros" color="text-orange-600" />
          </div>
        </div>
      </div>
    )
  }

  // Página Inicial (Planos)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {userData && (
        <Header 
          userData={userData} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          handleLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Escolha seu plano ideal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Desbloqueie todo o
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> conteúdo exclusivo</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Acesso ilimitado a vídeos, e-books, ferramentas e muito mais
          </p>

          {!userData && (
            <button
              onClick={() => setCurrentPage("login")}
              className="inline-flex items-center gap-2 bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <User className="w-5 h-5" />
              Já tem conta? Entrar
            </button>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Plano Essencial */}
          <PricingCard
            name="Essencial"
            price="5,99"
            description="Para começar"
            icon={Lock}
            gradient="from-blue-500 to-cyan-500"
            features={[
              "Acesso ilimitado a artigos",
              "Vídeos regulares",
              "Participação em fóruns",
              "Acesso a webinars"
            ]}
            buttonText="Assinar"
            onSelect={() => {
              setSelectedPlan("Essencial")
              if (userData) {
                setCurrentPage("payment")
              } else {
                setCurrentPage("login")
              }
            }}
          />

          {/* Plano Premium */}
          <PricingCard
            name="Premium"
            price="9,99"
            description="Experiência completa"
            icon={Crown}
            gradient="from-purple-600 to-blue-600"
            isPremium
            features={[
              "Conteúdo exclusivo (vídeos, e-books, ferramentas)",
              "Suporte prioritário",
              "Acesso antecipado a novidades",
              "+ Todos os benefícios do Essencial"
            ]}
            buttonText="Assinar já"
            onSelect={() => {
              setSelectedPlan("Premium")
              if (userData) {
                setCurrentPage("payment")
              } else {
                setCurrentPage("login")
              }
            }}
          />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Video}
            title="Vídeos Premium"
            description="Conteúdo exclusivo em vídeo"
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={BookOpen}
            title="E-books"
            description="Biblioteca completa de guias"
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={Wrench}
            title="Ferramentas"
            description="Recursos práticos exclusivos"
            gradient="from-green-500 to-emerald-500"
          />
          <FeatureCard
            icon={Headphones}
            title="Suporte"
            description="Atendimento prioritário"
            gradient="from-orange-500 to-red-500"
          />
        </div>
      </div>
    </div>
  )
}

// Componentes auxiliares
function Header({ userData, currentPage, setCurrentPage, handleLogout, mobileMenuOpen, setMobileMenuOpen }: any) {
  const unreadCount = userData.notifications.filter((n: Notification) => !n.read).length

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Unlock className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Área Exclusiva</h1>
              <p className="text-sm text-gray-600">Plano {userData.plan}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavButton
              icon={Unlock}
              label="Dashboard"
              active={currentPage === "dashboard"}
              onClick={() => setCurrentPage("dashboard")}
            />
            <NavButton
              icon={Bell}
              label="Notificações"
              active={currentPage === "notifications"}
              onClick={() => setCurrentPage("notifications")}
              badge={unreadCount}
            />
            <NavButton
              icon={Settings}
              label="Conta"
              active={currentPage === "account"}
              onClick={() => setCurrentPage("account")}
            />
            <NavButton
              icon={MessageCircle}
              label="Suporte"
              active={currentPage === "support"}
              onClick={() => setCurrentPage("support")}
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
            <MobileNavButton
              icon={Unlock}
              label="Dashboard"
              active={currentPage === "dashboard"}
              onClick={() => {
                setCurrentPage("dashboard")
                setMobileMenuOpen(false)
              }}
            />
            <MobileNavButton
              icon={Bell}
              label="Notificações"
              active={currentPage === "notifications"}
              onClick={() => {
                setCurrentPage("notifications")
                setMobileMenuOpen(false)
              }}
              badge={unreadCount}
            />
            <MobileNavButton
              icon={Settings}
              label="Conta"
              active={currentPage === "account"}
              onClick={() => {
                setCurrentPage("account")
                setMobileMenuOpen(false)
              }}
            />
            <MobileNavButton
              icon={MessageCircle}
              label="Suporte"
              active={currentPage === "support"}
              onClick={() => {
                setCurrentPage("support")
                setMobileMenuOpen(false)
              }}
            />
            <button
              onClick={() => {
                handleLogout()
                setMobileMenuOpen(false)
              }}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}

function NavButton({ icon: Icon, label, active, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
        active
          ? "bg-purple-100 text-purple-700"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )
}

function MobileNavButton({ icon: Icon, label, active, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
        active
          ? "bg-purple-100 text-purple-700"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
      {badge > 0 && (
        <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )
}

function PricingCard({ name, price, description, icon: Icon, gradient, isPremium, features, buttonText, onSelect }: any) {
  return (
    <div className={`rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${
      isPremium
        ? `bg-gradient-to-br ${gradient}`
        : "bg-white border-2 border-gray-100 hover:border-blue-200"
    }`}>
      {isPremium && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Crown className="w-3 h-3" />
          POPULAR
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isPremium ? "bg-white/20 backdrop-blur-sm" : `bg-gradient-to-br ${gradient}`
        }`}>
          <Icon className={`w-6 h-6 ${isPremium ? "text-white" : "text-white"}`} />
        </div>
        <div>
          <h3 className={`text-2xl font-bold ${isPremium ? "text-white" : "text-gray-900"}`}>{name}</h3>
          <p className={`text-sm ${isPremium ? "text-purple-100" : "text-gray-600"}`}>{description}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold ${isPremium ? "text-white" : "text-gray-900"}`}>€{price}</span>
          <span className={isPremium ? "text-purple-100" : "text-gray-600"}>/mês</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              isPremium ? "bg-white/20 backdrop-blur-sm" : "bg-blue-100"
            }`}>
              <Check className={`w-3 h-3 ${isPremium ? "text-white" : "text-blue-600"}`} />
            </div>
            <span className={isPremium ? "text-white font-medium" : "text-gray-700"}>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 ${
          isPremium
            ? "bg-white text-purple-600 hover:bg-gray-50"
            : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700"
        }`}
      >
        {buttonText}
      </button>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, gradient }: any) {
  return (
    <div className="text-center">
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}

function ContentCard({ icon: Icon, title, description, count, gradient, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className={`flex items-center gap-2 text-sm ${color} font-medium`}>
        <span>{count}</span>
      </div>
    </div>
  )
}

function StatCard({ value, label, color }: any) {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-md">
      <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}
