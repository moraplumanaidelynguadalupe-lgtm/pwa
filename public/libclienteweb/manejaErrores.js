import { muestraError } from "./muestraError.js"

/**
 * Intercepta Response.prototype.json para capturar errores de parseo
 * y asegurar que se reporten correctamente en navegadores Chromium.
 */
{
 const originalJson = Response.prototype.json

 Response.prototype.json = function () {
  // Llamamos al método original usando el contexto (this) de la respuesta
  return originalJson.call(this)
   .catch((/** @type {any} */ error) => {
    // Corrige un error de Chrome que evita el manejo correcto de errores.
    throw new Error(error)
   })
 }
}
/*
window.onerror = function (
  _event,
  _fuente,
  _numeroDeLinea,
  _numeroDeColumna,
  error
) {
  muestraError(error)
  return true
}

window.addEventListener('unhandledrejection', event => {
  muestraError(event.reason)
  event.preventDefault()
})
*/