// componentes/tarjeta-producto.js
// Componente Web Nativo <tarjeta-producto> para el emprendimiento LIRACAM
// Integración técnica colaborativa: Liliana Averos · Camila Perrazo · Rashell Pinos

// 1. Template para el componente que tiene la estructura HTML con Shadow DOM y slots
const tarjetaProductoTemplate = `
  <article class="tarjeta">
    <div class="caja-foto">
      <slot name="foto">
        <div class="foto-respaldo"></div>
      </slot>
    </div>

    <div class="detalles">
      <h3 class="titulo">
        <slot name="nombre">Producto Andino</slot>
      </h3>

      <p class="descripcion">
        <slot>Sin descripción disponible para este producto.</slot>
      </p>

      <div class="pie">
        <div class="caja-precio">
          <span class="etiqueta-precio">Precio</span>
          <span class="precio" id="precio-display">$0.00</span>
        </div>
        <button class="btn-comprar" type="button">Comprar</button>
      </div>
    </div>
  </article>
`;

// 2. Estilos del componente encapsulados dentro del Shadow DOM
const tarjetaProductoStyles = `
  :host {
    display: flex;
    flex-direction: column;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    border: 2px solid var(--color-borde-tarjeta, #E2E8F0);
    border-radius: 16px;
    overflow: hidden;
    background: var(--color-superficie, #FFFFFF);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    width: 100%;
    min-width: 260px;
    box-sizing: border-box;
  }

  :host(:hover) {
    transform: translateY(-5px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
  }

  /* Reto extra opcional: estilo destacado para resaltar un producto */
  :host([destacado]) {
    border: 2px solid var(--color-marca, #3D8B4F);
    box-shadow: 0 6px 20px rgba(61, 139, 79, 0.22);
  }

  :host([destacado]:hover) {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(61, 139, 79, 0.30);
  }

  .tarjeta {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .caja-foto {
    position: relative;
    width: 100%;
    height: 190px;
    background: linear-gradient(135deg, #F4F6F4 0%, #E8EFEA 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  ::slotted(img),
  ::slotted([slot="foto"]) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  :host(:hover) ::slotted(img),
  :host(:hover) ::slotted([slot="foto"]) {
    transform: scale(1.05);
  }

  .foto-respaldo {
    font-size: 3.5rem;
    opacity: 0.6;
    user-select: none;
  }

  .detalles {
    padding: 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
  }

  .titulo {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-marca, #3D8B4F);
    margin: 0;
    line-height: 1.35;
  }

  ::slotted(h3),
  ::slotted([slot="nombre"]) {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-marca, #3D8B4F);
    line-height: 1.35;
  }

  .descripcion {
    font-size: 0.88rem;
    color: var(--color-texto-suave, #5A6B7C);
    margin: 0;
    line-height: 1.5;
    flex-grow: 1;
    min-height: 48px;
  }

  ::slotted(p) {
    margin: 0;
    font-size: 0.88rem;
    color: var(--color-texto-suave, #5A6B7C);
    line-height: 1.5;
  }

  .pie {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 12px;
    border-top: 1px solid var(--color-borde-tarjeta, #E2E8F0);
  }

  .caja-precio {
    display: flex;
    flex-direction: column;
  }

  .etiqueta-precio {
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--color-texto-suave, #5A6B7C);
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .precio {
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--color-precio, #E67E22);
    letter-spacing: -0.02em;
  }

  .btn-comprar {
    background: var(--color-marca, #3D8B4F);
    color: #FFFFFF;
    border: none;
    padding: 8px 16px;
    border-radius: 24px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(61, 139, 79, 0.25);
    transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }

  .btn-comprar:hover {
    background: var(--color-btn-hover, #2E6B3C);
    transform: scale(1.04);
    box-shadow: 0 4px 12px rgba(61, 139, 79, 0.35);
  }

  .btn-comprar:active {
    transform: scale(0.98);
  }
`;

// 3. Declaración de una sola plantilla en memoria fuera de la clase
const template = document.createElement("template");
template.innerHTML = `
  <style>${tarjetaProductoStyles}</style>
  ${tarjetaProductoTemplate}
`;

// 4. Definición de la clase para el Custom Element nativo
export class TarjetaProducto extends HTMLElement {
  constructor() {
    super();
    // Inicialización del Shadow DOM en modo abierto
    this.attachShadow({ mode: "open" });
  }

  // Declaración del atributo observado para reactividad
  static get observedAttributes() {
    return ["precio"];
  }

  // Sincronización de la propiedad JavaScript con el atributo HTML
  get precio() {
    return this.getAttribute("precio") ?? "";
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }

  // Actualización segura y reactiva del precio en el Shadow DOM
  actualizarPrecio(valor) {
    const contenedorPrecio = this.shadowRoot ? this.shadowRoot.querySelector("#precio-display") : null;
    if (contenedorPrecio) {
      if (valor !== null && valor !== undefined && valor !== "") {
        const num = Number(valor);
        contenedorPrecio.textContent = !isNaN(num) ? `$${num.toFixed(2)}` : `$${valor}`;
      } else {
        contenedorPrecio.textContent = "$0.00";
      }
    }
  }

  // Callback del ciclo de vida que reacciona en tiempo real ante setAttribute("precio")
  attributeChangedCallback(nombre, anterior, nuevo) {
    if (nombre === "precio" && anterior !== nuevo) {
      this.actualizarPrecio(nuevo);
    }
  }

  // Callback del ciclo de vida: clonación de la plantilla al insertar en el documento
  connectedCallback() {
    this.shadowRoot.replaceChildren(template.content.cloneNode(true));
    this.actualizarPrecio(this.precio);
  }
}

// 5. Registro único del Custom Element en el navegador con guion obligatorio
customElements.define("tarjeta-producto", TarjetaProducto);
