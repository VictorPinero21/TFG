import {
    Plus,
    Send,
    ArrowUp,
    MoreHorizontal,
    ArrowDown,
    ArrowRight,
    ShoppingCart,
    Building,
    Mail,
    Calendar,
    CreditCard,
  } from "lucide-react"
  import Layout from "../Layouts/Layout";
  export default function Dashboard() {
    return (
      <div className="space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Accounts */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-lg font-semibold flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Accounts
              </h2>
            </div>
  
            <div className="p-6 space-y-6">
              {/* Total Balance */}
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Balance</p>
                <p className="text-3xl font-bold">$26,540.25</p>
              </div>
  
              {/* Your Accounts */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-4">Your Accounts</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center mr-3">
                        <Building className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Main Savings</p>
                        <p className="text-xs text-gray-400">Personal savings</p>
                      </div>
                    </div>
                    <span className="font-semibold">$8,459.45</span>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Checking Account</p>
                        <p className="text-xs text-gray-400">Daily expenses</p>
                      </div>
                    </div>
                    <span className="font-semibold">$2,850.00</span>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center mr-3">
                        <ArrowUp className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Investment Portfolio</p>
                        <p className="text-xs text-gray-400">Stock & ETFs</p>
                      </div>
                    </div>
                    <span className="font-semibold">$15,230.80</span>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center mr-3">
                        <CreditCard className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-xs text-gray-400">Pending charges</p>
                      </div>
                    </div>
                    <span className="font-semibold">$1,200.00</span>
                  </div>
  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center mr-3">
                        <Building className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Savings Account</p>
                        <p className="text-xs text-gray-400">Emergency fund</p>
                      </div>
                    </div>
                    <span className="font-semibold">$3,000.00</span>
                  </div>
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <button className="flex items-center justify-center py-2 px-3 bg-white text-black rounded-md hover:bg-gray-100 text-sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
                <button className="flex items-center justify-center py-2 px-3 border border-gray-700 text-white rounded-md hover:bg-gray-800 text-sm">
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </button>
                <button className="flex items-center justify-center py-2 px-3 border border-gray-700 text-white rounded-md hover:bg-gray-800 text-sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  Top-up
                </button>
                <button className="flex items-center justify-center py-2 px-3 border border-gray-700 text-white rounded-md hover:bg-gray-800 text-sm">
                  <MoreHorizontal className="h-4 w-4 mr-1" />
                  More
                </button>
              </div>
            </div>
          </div>
  
          {/* Recent Transactions */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Recent Transactions
                </h2>
              </div>
            </div>
  
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Recent Activity (23 transactions)</span>
                <span className="text-sm text-gray-400">This Month</span>
              </div>
  
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <ShoppingCart className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Apple Store Purchase</p>
                      <p className="text-xs text-gray-400">Today, 2:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center text-red-400">
                    -$999.00
                    <ArrowUp className="h-4 w-4 ml-1" />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <Building className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Salary Deposit</p>
                      <p className="text-xs text-gray-400">Today, 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center text-green-400">
                    +$4,500.00
                    <ArrowDown className="h-4 w-4 ml-1" />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Netflix Subscription</p>
                      <p className="text-xs text-gray-400">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center text-red-400">
                    -$15.99
                    <ArrowUp className="h-4 w-4 ml-1" />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <ShoppingCart className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Apple Store Purchase</p>
                      <p className="text-xs text-gray-400">Today, 2:45 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center text-red-400">
                    -$999.00
                    <ArrowUp className="h-4 w-4 ml-1" />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Supabase Subscription</p>
                      <p className="text-xs text-gray-400">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center text-red-400">
                    -$15.99
                    <ArrowUp className="h-4 w-4 ml-1" />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Vercel Subscription</p>
                      <p className="text-xs text-gray-400">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center text-red-400">
                    -$15.99
                    <ArrowUp className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
  
              <button className="w-full mt-6 py-2 px-4 border border-gray-700 text-white rounded-md hover:bg-gray-800 flex items-center justify-center">
                View All Transactions
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
  
      
      </div>
    )
  }
  Dashboard.layout = (page) => <Layout children={page} />;