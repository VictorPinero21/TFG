// resources/js/app.jsx (o donde uses createInertiaApp)
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';

createInertiaApp({
  resolve: name => import(`./Pages/${name}`),  // debe coincidir con tu estructura
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
