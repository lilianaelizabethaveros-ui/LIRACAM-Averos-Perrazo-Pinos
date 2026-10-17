// Componente Web Nativo: <tarjeta-producto>
// Desarrollado por: Rashell Estefany Pinos Cordero
// Rama: feature/rashell-pinos

const plantilla = document.createElement("template");
plantilla.innerHTML = `
  <style>
    :host {
      display: block;
      background-color: #FFFFFF;
      color: #2C3E50;
      border: 2px solid var(--color-marca, #2C3E50);
      border-radius: 12px;
      padding: 16px;
      box-sizing: border-box;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
    }

    :host(:hover) {
      background-color: rgba(61, 139, 79, 0.1);
    }

    :host([destacado]) {
      border: 3px solid #E67E22;
    }

    .contenedor-foto {
      width: 100%;
      height: 180px;
      overflow: hidden;
      border-radius: 8px;
    }

    ::slotted([slot="foto"]),
    ::slotted(img) {
      display: block;
      width: 100%;
      max-width: 100%;
      height: 180px;
      object-fit: cover;
      object-position: center;
      box-sizing: border-box;
      border-radius: 8px;
    }

    ::slotted([slot="nombre"]) {
      color: var(--color-marca, #2C3E50);
      margin: 12px 0 8px;
      font-size: 1.15rem;
    }

    ::slotted(p) {
      color: #2C3E50;
      margin: 0 0 12px;
      font-size: 0.95rem;
      line-height: 1.4;
    }

    .precio {
      margin: 12px 0 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #E67E22;
      display: block;
    }
  </style>

  <div class="contenedor-foto">
    <slot name="foto"></slot>
  </div>
  <slot name="nombre"></slot>
  <slot>Sin descripción</slot>
  <p class="precio">$<span id="precio">2.00</span></p>
`;

export class TarjetaProducto extends HTMLElement {
  static get observedAttributes() {
    return ["precio"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.append(plantilla.content.cloneNode(true));
    const elPrecio = this.shadowRoot.querySelector("#precio");
    if (elPrecio) {
      const valor = this.getAttribute("precio");
      const num = valor !== null && valor !== "" ? Number(valor) : 2.00;
      elPrecio.textContent = (!isNaN(num) ? num : 2.00).toFixed(2);
    }
  }

  attributeChangedCallback(nombre, anterior, valor) {
    if (nombre === "precio") {
      const elPrecio = this.shadowRoot ? this.shadowRoot.querySelector("#precio") : null;
      if (elPrecio) {
        const num = valor !== null && valor !== "" ? Number(valor) : 2.00;
        elPrecio.textContent = (!isNaN(num) ? num : 2.00).toFixed(2);
      }
    }
  }

  get precio() {
    return Number(this.getAttribute("precio") || 2.00);
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }
}

if (!customElements.get("tarjeta-producto")) {
  customElements.define("tarjeta-producto", TarjetaProducto);
}
