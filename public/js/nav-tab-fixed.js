import { resaltaSiEstasEn } from "../libclienteweb/resaltaSiEstasEn.js"

export class NavTabFixed extends HTMLElement {

 constructor() {
  super()
  this.creado = false
 }

 connectedCallback() {
  this.classList.add("md-tab", "fixed")

  if (!this.creado) {

   this.innerHTML = /* HTML */`
    <a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
     <span class="material-symbols-outlined">home</span>
     Inicio
    </a>
 
    <a ${resaltaSiEstasEn(["/select.html"])} href="select.html">
     <span class="material-symbols-outlined">bottom_panel_close</span>
     Select
    </a>

    <a ${resaltaSiEstasEn(["/equipo.html"])} href="equipo.html">
     <span class="material-symbols-outlined">groups</span>
     Equipo
    </a>
 
    <a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
     <span class="material-symbols-outlined">help</span>
     Ayuda
    </a>
    
     <a ${resaltaSiEstasEn(["/archivosCamara.html"])} href="archivosCamara.html">
     <span class="material-symbols-outlined">add_photo_alternate</span>
     Archivos
    </a>`
   this.creado = true

  }

 }

}

customElements.define("nav-tab-fixed", NavTabFixed)