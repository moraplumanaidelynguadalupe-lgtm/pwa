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
 
    <a ${resaltaSiEstasEn(["/gps.html"])} href="gps.html">
     <span class="material-symbols-outlined">location_on</span>
     Ubicación
    </a>
    
    <a ${resaltaSiEstasEn(["/ayuda.html"])} href="ayuda.html">
     <span class="material-symbols-outlined">help</span>
     Ayuda
    </a>`

   this.creado = true

  }

 }

}

customElements.define("nav-tab-fixed", NavTabFixed)