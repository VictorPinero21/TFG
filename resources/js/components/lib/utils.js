// resources/js/components/lib/utils.js

/**
 * Función para concatenar clases condicionalmente.
 * Ignora valores falsy (undefined, null, false, '').
 *
 * @param  {...string} classes - Clases CSS
 * @returns {string} - Cadena de clases concatenadas
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  