// componentes/tarjeta-producto-lili.js
// Desarrollado por: Liliana Averos 

// Template para el componente.
// Definición de la estructura HTML del componente con Shadow DOM y slots.
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
                <slot>Descripción no disponible para este producto.</slot>
            </p>

            <div class="pie">
                <span class="precio" id="precio-display">$0.00</span>
                <button class="btn-comprar" type="button">Comprar</button>
            </div>
        </div>
    </article>
`;

// Estilos del componente encapsulados en el Shadow DOM
const tarjetaProductoStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

    :host {
        display: flex;
        flex-direction: column;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        border: 2px solid var(--color-borde-tarjeta, #e2e8f0);
        border-radius: 16px;
        overflow: hidden;
        background: #ffffff;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        width: 100%;
        min-width: 260px;
        box-sizing: border-box;
    }

    :host(:hover) {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }

    /* Reto extra: estilo destacado para resaltar un producto */
    :host([destacado]) {
        border: 2px solid var(--color-marca, #3D8B4F);
        box-shadow: 0 6px 20px rgba(61, 139, 79, 0.22);
    }

    :host([destacado]:hover) {
        transform: translateY(-6px);
        box-shadow: 0 14px 34px rgba(61, 139, 79, 0.30);
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
        height: 200px;
        background: linear-gradient(135deg, #f2f7f3 0%, #e3ede6 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    ::slotted(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.4s ease;
    }

    :host(:hover) ::slotted(img) {
        transform: scale(1.06);
    }

    .foto-respaldo {
        font-size: 5rem;
        opacity: 0.6;
        user-select: none;
    }

    .detalles {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex-grow: 1;
    }

    .titulo {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-marca, #3D8B4F);
        margin: 0;
        line-height: 1.35;
    }

    ::slotted(h3),
    ::slotted([slot="nombre"]) {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-marca, #3D8B4F);
        line-height: 1.35;
    }

    .descripcion {
        font-size: 0.88rem;
        color: #4a5568;
        margin: 0;
        line-height: 1.55;
        min-height: 40px;
        flex-grow: 1;
    }

    ::slotted(p) {
        margin: 0;
        font-size: 0.88rem;
        color: #4a5568;
        line-height: 1.55;
    }

    .pie {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        padding-top: 14px;
        border-top: 1px solid #edf2ee;
    }

    .precio {
        font-size: 1.45rem;
        font-weight: 800;
        color: var(--color-precio, #E67E22);
        letter-spacing: -0.02em;
    }

    .btn-comprar {
        background: var(--color-marca, #3D8B4F);
        color: #ffffff;
        border: none;
        padding: 9px 18px;
        border-radius: 30px;
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        box-shadow: 0 2px 8px rgba(61, 139, 79, 0.25);
    }

    .btn-comprar:hover {
        background: var(--color-btn-hover, #2e6b3c);
        transform: scale(1.04);
        box-shadow: 0 4px 12px rgba(61, 139, 79, 0.35);
    }

    .btn-comprar:active {
        transform: scale(0.98);
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${tarjetaProductoStyles}</style>
    ${tarjetaProductoTemplate}
`;

// Definición de la clase para el componente web
class TarjetaProducto extends HTMLElement {
    constructor() {
        // Inicializa la instancia del componente y activa el Shadow DOM
        super();
        this.attachShadow({ mode: "open" });
    }

    // Observa únicamente el atributo precio para reaccionar a sus modificaciones
    static get observedAttributes() {
        return ["precio"];
    }

    // Aqui le sincronice la propiedad JavaScript con el atributo HTML
    get precio() {
        return this.getAttribute("precio") ?? "";
    }

    set precio(valor) {
        this.setAttribute("precio", valor);
    }

    // Actualiza de forma segura el valor visible del precio dentro del Shadow DOM
    actualizarPrecio(valor) {
        const contenedorPrecio = this.shadowRoot.querySelector("#precio-display");
        if (contenedorPrecio) {
            contenedorPrecio.textContent = valor ? `$${valor}` : "$0.00";
        }
    }

    // Reacciona en tiempo real cuando cambia el atributo precio
    attributeChangedCallback(nombre, anterior, nuevo) {
        if (nombre === "precio" && anterior !== nuevo) {
            this.actualizarPrecio(nuevo);
        }
    }

    // Clona la plantilla en el Shadow DOM e inicializa el precio del producto
    render() {
        this.shadowRoot.replaceChildren(template.content.cloneNode(true));
        this.actualizarPrecio(this.precio);
    }

    // Se ejecuta al insertar el elemento en el documento
    connectedCallback() {
        this.render();
    }
}

// Registro del Custom Element en el navegador
customElements.define("tarjeta-producto", TarjetaProducto);
