/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 * * Cualquier cambio en el contenido de este archivo hace que el service
 * worker se reinstale. */

/**
 * Cambia el número de la versión cuando cambia el contenido de los
 * archivos.
 */
const VERSION = "1.1" // <- Subimos la versión para forzar la actualización limpia

/**
 * Nombre de la carpeta de caché.
 */
const CACHE = "pwamd"

/**
 * Archivos requeridos para que la aplicación funcione fuera de
 * línea.
 */
const ARCHIVOS = [
 "ayuda.html",
 "css/estilos.css",
 "css/material-symbols-outlined.css",
 "css/transicion_pestanas.css",
 "equipo.html", // <- Agregamos tu nueva pantalla de equipo
 "favicon.ico",
 "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints",
 "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].ttf",
 "fonts/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2",
 "fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
 "fonts/Roboto-VariableFont_wdth,wght.ttf",
 // Agregamos las fotos de los integrantes del equipo:
 "img/Angel.png",
 "img/Brian.png",
 "img/Cris.png",
 "img/Daniel.png",
 "img/Nuci.png",
 "img/Pluma.png",
 // Mantenemos los iconos del sistema:
 "img/icono2048.png",
 "img/maskable_icon.png",
 "img/maskable_icon_x128.png",
 "img/maskable_icon_x192.png",
 "img/maskable_icon_x384.png",
 "img/maskable_icon_x48.png",
 "img/maskable_icon_x512.png",
 "img/maskable_icon_x72.png",
 "img/maskable_icon_x96.png",
 "img/screenshot_horizontal.png",
 "img/screenshot_vertical.png",
 "index.html",
 "js/nav-tab-fixed.js",
 "js/registraServiceWorker.js",
 "libclienteweb/abreElementoHtml.js",
 "libclienteweb/cierraElementoHtmo.js",
 "libclienteweb/ES_APPLE.js",
 "libclienteweb/getAttribute.js",
 "libclienteweb/manejaErrores.js",
 "libclienteweb/muestraError.js",
 "libclienteweb/muestraTextoDeAyuda.js",
 "libclienteweb/ProblemDetailsError.js",
 "libclienteweb/querySelector.js",
 "libclienteweb/resaltaSiEstasEn.js",
 "libmde/md-app-bar.js",
 "libmde/md-filled-button.css",
 "libmde/md-filled-text-field.css",
 "libmde/md-list.css",
 "libmde/md-menu.css",
 "libmde/md-options-menu.js",
 "libmde/md-outline-button.css",
 "libmde/md-select-menu.js",
 "libmde/md-tab.css",
 "material-tokens/css/baseline.css",
 "material-tokens/css/colors.css",
 "material-tokens/css/elevation.css",
 "material-tokens/css/motion.css",
 "material-tokens/css/palette.css",
 "material-tokens/css/shape.css",
 "material-tokens/css/state.css",
 "material-tokens/css/theme/dark.css",
 "material-tokens/css/theme/light.css",
 "material-tokens/css/typography.css",
 "select.html",
 "site.webmanifest",
 "ungap/es.js",
 "/"
]

// Verifica si el código corre dentro de un service worker.
if (self instanceof ServiceWorkerGlobalScope) {
 // Evento al empezar a instalar el servide worker,
 self.addEventListener("install",
  (/** @type {ExtendableEvent} */ evt) => {
   console.log("El service worker se está instalando.")
   evt.waitUntil(llenaElCache())
  })

 // Evento al solicitar información a la red.
 self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
  if (evt.request.method === "GET") {
   evt.respondWith(buscaLaRespuestaEnElCache(evt))
  }
 })

 // Evento cuando el service worker se vuelve activo.
 self.addEventListener("activate",
  () => console.log("El service worker está activo."))
}

async function llenaElCache() {
 // Borra todos los cachés viejos obligatoriamente
 const keys = await caches.keys()
 for (const key of keys) {
  await caches.delete(key)
 }
 // Abre el nuevo caché
 const cache = await caches.open(CACHE)
 await cache.addAll(ARCHIVOS)
 console.log("Cache cargado exitosamente:", CACHE)
 console.log("Nueva Versión:", VERSION)
}

/** @param {FetchEvent} evt */
async function buscaLaRespuestaEnElCache(evt) {
 const cache = await caches.open(CACHE)
 const request = evt.request
 const response = await cache.match(request, { ignoreSearch: true })
 if (response === undefined) {
  return fetch(request)
 } else {
  return response
 }
}