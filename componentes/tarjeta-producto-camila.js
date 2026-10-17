const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            --color-marca: var(--color-marca,#3D8B4F); 
            --color-naranja: #E67E22;
            --color-fondo: #FFFFFF;
            --color-texto: #2C3E50;
            --color-gris-suave: #7F8C8D;
            display: block;
            width: 320px;
            margin: 25px auto;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .card {
            background-color: var(--color-fondo);
            border-radius: 20px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(61, 139, 79, 0.12);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-6px);
            box-shadow: 0 18px 35px rgba(61, 139, 79, 0.18);
        }

        .badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background-color: var(--color-marca);
            color: white;
            padding: 5px 12px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-radius: 20px;
            z-index: 10;
            backdrop-filter: blur(4px);
        }

        .card .imgBox {
            position: relative;
            width: 100%;
            height: 220px;
            background-color: #f7f9f7;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card .imgBox ::slotted(img),
        .card .imgBox img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .card .imgBox ::slotted(img):hover,
        .card .imgBox img:hover {
            transform: scale(1.08);
        }

        .card .details {
            padding: 22px;
            display: flex;
            flex-direction: column;
        }

        .card .details h2 {
            margin: 0 0 10px 0;
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--color-texto);
            line-height: 1.3;
        }

        .card .details p {
            margin: 0 0 20px 0;
            font-size: 0.88rem;
            color: var(--color-gris-suave);
            line-height: 1.5;
        }

        .price-action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #f0f0f0;
            padding-top: 15px;
            margin-top: auto;
        }

        .price-container {
            display: flex;
            flex-direction: column;
        }

        .price-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            color: var(--color-gris-suave);
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        .card .details h3 {
            margin: 0;
            font-size: 1.35rem;
            color: var(--color-marca);
            font-weight: 800;
        }

        .card .details button {
            padding: 10px 20px;
            font-size: 13px;
            color: #fff;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-radius: 25px;
            border: none;
            background: linear-gradient(135deg, #E67E22, #D35400);
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(230, 126, 34, 0.35);
            transition: all 0.2s ease;
        }

        .card .details button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(230, 126, 34, 0.45);
        }

        .card .details button:active {
            transform: translateY(0);
        }
    </style>

    <main class="card">
        <div class="badge">Orgánico</div>
        <section class="imgBox">
            <slot name="foto">
                <img src="./img/galletas.png" alt="Imagen por defecto"/>
            </slot>
        </section>

        <section class="details">
            <h2><slot name="nombre">Nombre del producto</slot></h2>
            <p>
                <slot>Sin descripción</slot>
            </p>
            <div class="price-action">
                <div class="price-container">
                    <span class="price-label">Precio</span>
                    <h3>$<span id="precio-valor">2.50</span></h3>
                </div>
                <button>Añadir</button>
            </div>
        </section>
    </main>
`;

class TarjetaProducto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // Clonar la plantilla en el Shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["precio"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "precio" && oldValue !== newValue) {
            this.actualizarPrecio(newValue);
        }
    }

    get precio() {
        return this.getAttribute("precio");
    }

    set precio(v) {
        this.setAttribute("precio", v);
    }

    actualizarPrecio(valor) {
        const spanPrecio = this.shadowRoot.getElementById("precio-valor");
        if (spanPrecio) {
            spanPrecio.textContent = valor;
        }
    }

    connectedCallback() {
        if (this.hasAttribute("precio")) {
            this.actualizarPrecio(this.getAttribute("precio"));
        }
    }
}
customElements.define("tarjeta-producto", TarjetaProducto);