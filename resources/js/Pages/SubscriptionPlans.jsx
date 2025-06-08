import React from 'react';

export default function SubscriptionPlans({ plans }) {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900">Elige tu plan</h1>
        <p className="mt-2 text-gray-500">Encuentra el plan que mejor se adapte a tus necesidades.</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between border h-80 transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl ${
              plan.price === '0.00' ? 'border-green-400' : 'border-gray-200'
            }`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">{plan.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <div className="mt-6">
              <p className="text-2xl font-bold text-gray-800">
                {plan.price === '0.00'
                  ? 'Gratis'
                  : `$${parseFloat(plan.price).toFixed(2)} / ${plan.interval}`}
              </p>
              <button
                className={`mt-4 w-full py-2 px-4 rounded-xl font-medium text-white transition ${
                  plan.price === '0.00'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {plan.price === '0.00' ? 'Empieza gratis' : 'Suscribirse'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
