import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

export default function Edit({ mustVerifyEmail, status, authUser, plans }) {
  const [tab, setTab] = useState('profile'); 

  const { data, setData, patch, errors, processing, reset } = useForm({
    subscription_plan_id: authUser.subscription_plan_id || null,
    newsletter: authUser.newsletter || false,
    name: authUser.name || '',
    email: authUser.email || '',
    age: authUser.age || '',
    phone: authUser.phone || '',
  });

  useEffect(() => {
    setData('subscription_plan_id', authUser.subscription_plan_id || null);
    setData('newsletter', authUser.newsletter || false);
  }, [authUser.subscription_plan_id, authUser.newsletter]);

  useEffect(() => {
    if (status === 'profile-updated') {
      reset();
    }
  }, [status, reset]);

  function toggleNewsletter() {
    setData('newsletter', !data.newsletter);
  }

  function onHandleChange(e) {
    setData(e.target.name, e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    patch(route('profile.update'), {
      preserveScroll: true,
    });
  }

  // Obtener el nombre del plan actual
  const currentPlan = plans.find((plan) => plan.id === data.subscription_plan_id);

  return (
    <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Perfil de usuario</h2>}>
      <Head title="Perfil de usuario" />
    
      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded shadow">
        {/* Menu pestañas */}
        <nav className="flex space-x-6 border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-semibold ${
              tab === 'profile'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setTab('profile')}
          >
            Perfil
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              tab === 'password'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setTab('password')}
          >
            Cambiar contraseña
          </button>
          <button
            className={`py-2 px-4 font-semibold ${
              tab === 'delete'
                ? 'border-b-2 border-red-600 text-red-600'
                : 'text-gray-600 hover:text-red-600'
            }`}
            onClick={() => setTab('delete')}
          >
            Eliminar cuenta
          </button>
        </nav>

   
        {tab === 'profile' && (
          <form onSubmit={submit} className="space-y-6">
        
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                value={data.name}
                onChange={onHandleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={onHandleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="age" className="block font-medium text-gray-700">Edad</label>
              <input
                id="age"
                name="age"
                type="number"
                value={data.age}
                onChange={onHandleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium text-gray-700">Teléfono</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={data.phone}
                onChange={onHandleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

         
            <div>
              <label htmlFor="subscription_plan_id" className="block font-medium text-gray-700 mb-1">
                Tipo de suscripción
              </label>
              <div className="flex items-center space-x-4">
                <select
                  id="subscription_plan_id"
                  name="subscription_plan_id"
                  disabled
                  value={data.subscription_plan_id || ''}
                  className="block w-64 rounded-md border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
                >
                  <option value="">{currentPlan ? currentPlan.name : 'Sin suscripción'}</option>
                </select>

                <a
                  href={route('subscription-plans.index')}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Cambiar suscripción
                </a>
              </div>
              {errors.subscription_plan_id && (
                <p className="text-red-600 text-sm mt-1">{errors.subscription_plan_id}</p>
              )}
            </div>

     
            <div className="flex items-center space-x-4">
              <label htmlFor="newsletter" className="font-medium text-gray-700 cursor-pointer select-none">
                Quiero recibir el newsletter
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={data.newsletter}
                id="newsletter"
                onClick={() => setData('newsletter', !data.newsletter)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  data.newsletter ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    data.newsletter ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Guardar cambios
            </button>
          </form>
        )}

        {tab === 'password' && (
          <div>
            <UpdatePasswordForm />
          </div>
        )}

        {tab === 'delete' && (
          <div>
            <DeleteUserForm />
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
