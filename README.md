# Proyecto LIRACAM · Base Inicial

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Detalle |
|---|---|
| Emprendimiento | LIRACAM |
| Integrantes del equipo | Averos Fonseca Liliana Elizabeth (@lilianaelizabethaveros-ui)<br>Perrazo Guerra Camila Mayte (@CamilaPerrazo)<br>Pinos Cordero Rashell Estefany (@rashellpinos) |
| Asignatura | Programación Integrativa de Componentes Web |
| Unidad | Unidad 1: Web Components Nativos |
| NRC | 36642 |
| Fecha | Octubre de 2026 |
| Enlace del repositorio | https://github.com/lilianaelizabethaveros-ui/LIRACAM-Averos-Perrazo-Pinos |

---

## 1. Identificación del proyecto

Este repositorio contiene la **base colaborativa e integrada** para el desarrollo del proyecto **LIRACAM**, correspondiente a la Unidad 1 de la asignatura.

El objetivo de esta entrega es construir el componente web nativo `<tarjeta-producto>` bajo estándares W3C/WHATWG sin el uso de frameworks ni librerías externas, cumpliendo rigurosamente los cinco pasos de la práctica de laboratorio y desplegando el catálogo de snacks saludables del emprendimiento.

---

## 2. Propuesta del emprendimiento (LIRACAM)

- **Nombre del emprendimiento:** LIRACAM
- **Descripción del negocio:** Tienda digital interactiva enfocada en la comercialización de snacks saludables y repostería artesanal elaborada con insumos tradicionales y granos andinos de la sierra ecuatoriana, como maíz tostado sazonado, infusiones naturales de guayusa y galletas de quinua con cacao fino de aroma.
- **Problema o necesidad que atiende:** La falta de opciones de alimentación rápida que sean verdaderamente saludables, nutritivas y accesibles para la rutina diaria, ofreciendo una alternativa libre de procesados que revaloriza el producto local.
- **Cliente o público objetivo:** Jóvenes universitarios, profesionales con rutinas aceleradas, deportistas y personas con un estilo de vida consciente que buscan snacks funcionales y de alta calidad en Quito y la región interandina.
- **Propuesta de valor:** Fusionar la riqueza nutricional de los superalimentos andinos con una experiencia de compra web moderna y modular basada en componentes web nativos, garantizando origen natural, excelente sabor y estética profesional.
- **Identidad visual:**
  - **Colores:**
    - Verde fresco y natural (`#3D8B4F`): evoca la agricultura orgánica y la naturaleza de la sierra ecuatoriana.
    - Naranja apetitoso (`#E67E22`): resalta botones, precios y llamadas a la acción.
    - Tonos blancos y neutros limpios (`#FFFFFF` y `#F4F6F4`): proporcionan un diseño minimalista, ordenado y de lectura cómoda.
  - **Tipografía:** Fuentes limpias y modernas de tipo *sans-serif* (como Segoe UI, system-ui o Arial), diseñadas para ofrecer una lectura ágil y una interfaz visualmente impecable.

---

## 3. Herramientas y tecnologías utilizadas

Para el desarrollo del proyecto se utilizan exclusivamente herramientas estándar y tecnologías nativas enseñadas en clase:

- **Visual Studio Code:** Editor de código fuente principal para la edición y organización del proyecto.
- **Live Server (Extensión de VS Code) / Apache en XAMPP:** Servidor web local que permite ejecutar la aplicación bajo el protocolo `http://`, requisito indispensable para que el navegador cargue módulos JavaScript sin restricciones de seguridad CORS.
- **Navegador web moderno (Google Chrome / Microsoft Edge):** Entorno de ejecución y visualización de la interfaz, utilizando las Herramientas para Desarrolladores (*DevTools* / Consola F12) para inspeccionar el Shadow DOM y validar los atributos reactivos.
- **Git y GitHub:** Sistema de control de versiones y plataforma de alojamiento remoto para la gestión colaborativa del código mediante ramas de trabajo.
- **HTML5, CSS3 y JavaScript ES6+:** Tecnologías nativas del navegador, sin uso de frameworks, bibliotecas externas ni compiladores.

---

## 4. Arquitectura del proyecto

La arquitectura de LIRACAM está construida bajo el enfoque de **Componentes Web Nativos (W3C/WHATWG)**, asegurando modularidad, reutilización e independencia entre elementos:

### Pilares de la arquitectura de componentes
1. **Elementos personalizados (*Custom Elements*):** Creación de etiquetas HTML propias con nombres que incluyen un guion (`<tarjeta-producto>`), extendiendo la clase nativa `HTMLElement` y registrándolas mediante `customElements.define`.
2. **Shadow DOM (Modo `open`):** Árbol DOM encapsulado que aísla la estructura interna y los estilos CSS del componente, evitando colisiones con el diseño global de la página.
3. **Plantillas HTML (*HTML Templates*):** Declaración de bloques inertes con `<template>` que contienen el HTML y CSS del componente, clonados eficientemente en memoria mediante `cloneNode(true)`.
4. **Ranuras de contenido (*Slots*):** Mecanismo de proyección para insertar contenido dinámico desde el documento principal hacia el componente (fotos, nombres y descripciones con textos de respaldo).
5. **Ciclo de vida y reactividad:**
   - `constructor()`: Inicialización del componente y creación del Shadow DOM en modo abierto.
   - `connectedCallback()`: Inserción y clonación de la plantilla en el DOM.
   - `static get observedAttributes()`: Declaración de atributos a vigilar (`precio`).
   - `attributeChangedCallback()`: Actualización reactiva del contenido visible ante cambios en los atributos.
   - *Getters* y *Setters*: Sincronización bidireccional entre la propiedad JavaScript y el atributo HTML.

### Estructura de archivos y carpetas
```text
LIRACAM/
├── index.html                           # Página principal que consume el componente <tarjeta-producto>
├── style.css                            # Estilos globales de la página y variables CSS de marca
├── estilos.css                          # Redirección e importación de respaldo para compatibilidad
├── README.md                            # Documentación completa, registros técnicos y guía de trabajo
├── app.js                               # Módulo auxiliar de entrada seguro
├── img/                                 # Fotografías reales de los productos del emprendimiento
│   ├── tostado-andino.jpeg              # Fotografía: Tostado Andino Crujiente (Liliana Averos)
│   ├── guayusa.jpg                      # Fotografía: Infusión fría de Guayusa Orgánica (Rashell Pinos)
│   └── galletas.png                     # Fotografía: Galletas de Quinua y Cacao (Camila Perrazo)
└── componentes/                         # Módulos JavaScript de Web Components
    ├── tarjeta-producto.js              # Componente Web canónico unificado e importado por la página
    ├── tarjeta-producto-lili.js          # Respaldo de desarrollo individual (Liliana Averos)
    ├── tarjeta-producto-rashell-pinos.js # Respaldo de desarrollo individual (Rashell Pinos)
    └── tarjeta-producto-camila.js        # Respaldo de desarrollo individual (Camila Perrazo)
```

---

## 5. Registros técnicos de la práctica de laboratorio (Pasos 1 al 5)

A continuación se detallan los cinco registros técnicos exigidos por la rúbrica y las instrucciones de la práctica de laboratorio:

### Registro Paso 1: Módulo ES, etiqueta personalizada y carga en la página
- **Nombre de la etiqueta registrada:** `<tarjeta-producto>`.
- **Por qué el nombre lleva guion obligatorio:**  
  De acuerdo con la especificación oficial de la W3C y WHATWG para Custom Elements, todos los nombres de elementos personalizados deben contener obligatoriamente al menos un guion (`-`). Esta regla garantiza que el motor del navegador distinga sin ambigüedades las etiquetas personalizadas de las etiquetas estándar del lenguaje HTML (presentes o futuras), evitando conflictos de nomenclatura y garantizando la compatibilidad hacia adelante.
- **Cómo importa la página el módulo:**  
  En el archivo `index.html` se importa directamente el archivo JavaScript con la sintaxis de módulo ES:
  ```html
  <script type="module" src="./componentes/tarjeta-producto.js"></script>
  ```
  Esto permite cargar el código en un ámbito modular aislado, con ejecución diferida automática (*deferred execution*) y soporte de exportación/importación nativa.

### Registro Paso 2: Plantilla, Shadow DOM y ranuras de contenido (Slots)
- **Ranuras (*Slots*) implementadas en la plantilla:**
  1. `<slot name="foto">`: Ranura con nombre destinada a proyectar la imagen o fotografía del producto.
  2. `<slot name="nombre">`: Ranura con nombre destinada a proyectar el encabezado o denominación del producto.
  3. `<slot>` (slot por defecto / anónimo): Ranura encargada de proyectar la descripción textual del producto.
- **Contenido de respaldo (*Fallback Content*):**
  - Para el slot de foto: se implementó un elemento visual alternativo `<div class="foto-respaldo">🍃</div>` en caso de que no se proporcione imagen.
  - Para el slot de nombre: texto por defecto `Producto Andino`.
  - Para el slot por defecto de descripción: texto de respaldo `Sin descripción disponible para este producto.`. Si la página exterior omite el párrafo descriptivo, el componente muestra este respaldo de forma limpia.
- **¿Qué pasaría si no se clonara la plantilla con `cloneNode(true)`?:**  
  El elemento `<template>` almacena su estructura interna en un `DocumentFragment`. Si en lugar de clonar dicho fragmento con `cloneNode(true)` se anexara directamente al Shadow DOM de un elemento, los nodos del fragmento serían consumidos (extraídos de su contenedor original en memoria). En consecuencia, **únicamente la primera tarjeta creada obtendría el DOM y los estilos**; la segunda y tercera tarjetas quedarían completamente vacías y rotas. El método `.cloneNode(true)` realiza una copia profunda e independiente de toda la estructura para cada instancia del componente en el catálogo.

### Registro Paso 3: Atributo precio, reactividad y estilos encapsulados
- **Método que reacciona al cambio de precio:**  
  El método del ciclo de vida nativo es `attributeChangedCallback(nombre, anterior, nuevo)`. El componente declara en `observedAttributes` que vigila el atributo `precio`. Cuando se modifica dicho atributo (por ejemplo mediante `elemento.setAttribute("precio", "25")`), este método se dispara automáticamente e invoca la función `actualizarPrecio(nuevo)`, la cual localiza el span `#precio-display` en el Shadow DOM y formatea el valor de forma reactiva e inmediata en pantalla.
- **Sincronización de propiedad y atributo:**  
  Se implementaron getters y setters:
  ```javascript
  get precio() { return this.getAttribute("precio") ?? ""; }
  set precio(valor) { this.setAttribute("precio", valor); }
  ```
- **Estilos con `:host` y variables CSS con valor de respaldo:**  
  El componente define su diseño básico mediante el selector `:host { display: flex; flex-direction: column; ... }`.  
  Todos los valores de color se obtienen mediante variables CSS con valores de respaldo obligatorios:
  - Color de marca: `var(--color-marca, #3D8B4F)` (Verde fresco natural).
  - Color de precio: `var(--color-precio, #E67E22)` (Naranja apetitoso).
  - Borde de tarjeta: `var(--color-borde-tarjeta, #E2E8F0)`.
  - Botón hover: `var(--color-btn-hover, #2E6B3C)`.  
  La página exterior (`style.css`) define `--color-marca: #3D8B4F;` y se la entrega al componente, respetando el encapsulamiento sin invadir los selectores internos de la tarjeta.

### Registro Paso 4: Tres productos del emprendimiento
El catálogo contiene tres productos reales y diferenciados de LIRACAM:
1. **Tostado Andino Crujiente con Sal Marina y Hierbas:**
   - **Precio:** `$1.75`
   - **Imagen:** `./img/tostado-andino.jpeg` (`alt="Tostado Andino Crujiente sazonado con sal marina y hierbas"`)
   - **Descripción:** Maíz tostado tradicional de la serranía ecuatoriana, sazonado con sal marina y hierbas aromáticas finas. Snack 100% natural, crocante y nutritivo.
2. **Infusión Fría de Guayusa Orgánica con Limón (Producto Destacado):**
   - **Precio:** `$2.00`
   - **Imagen:** `./img/guayusa.jpg` (`alt="Infusión fría de Guayusa Orgánica con Limón"`)
   - **Descripción:** Bebida ancestral andina-amazónica ecuatoriana, energizante natural y refrescante elaborada con hojas de guayusa orgánica y un toque cítrico.
   - **Reto extra:** Incorpora el atributo booleano `destacado`, activando el selector `:host([destacado])` para resaltar el producto con borde y sombra acentuados.
3. **Galletas de Quinua y Cacao Fino de Aroma:**
   - **Precio:** `$2.50`
   - **Imagen:** `./img/galletas.png` (`alt="Galletas artesanales de quinua y cacao fino de aroma"`)
   - **Descripción:** Galletas artesanales horneadas, libres de gluten, elaboradas con harina de quinua andina y trozos de chocolate 70% fino de aroma ecuatoriano.

### Registro Paso 5: Repositorio y participación de las tres integrantes
- **Enlace al repositorio oficial en GitHub:**  
  [https://github.com/lilianaelizabethaveros-ui/LIRACAM-Averos-Perrazo-Pinos](https://github.com/lilianaelizabethaveros-ui/LIRACAM-Averos-Perrazo-Pinos)
- **Detalle de participación y aportes de cada integrante:**
  - **Liliana Elizabeth Averos Fonseca:** Preparación y estructuración de la base inicial colaborativa del repositorio; documentación general y arquitectura en el README; propuesta y desarrollo del producto Tostado Andino Crujiente (`tostado-andino.jpeg`); estructuración de la plantilla con ranuras de contenido (`slots`), Shadow DOM en modo `open` y estilos base encapsulados.
  - **Rashell Estefany Pinos Cordero:** Propuesta y desarrollo del producto Infusión Fría de Guayusa Orgánica (`guayusa.jpg`); implementación del atributo reactivo `destacado` utilizando el selector `:host([destacado])`; verificación de la reactividad del atributo `precio` mediante `observedAttributes` y `attributeChangedCallback`.
  - **Camila Mayte Perrazo Guerra:** Propuesta y desarrollo del producto Galletas de Quinua y Cacao Fino de Aroma (`galletas.png`); diseño estético de las tarjetas (degradados en cabecera de foto, badge, sombras suaves y botón de compra estilizado con estados hover/active); adaptación de la cuadrícula responsiva del catálogo.
  - **Integración Técnica Final:** Creación del módulo canónico unificado `componentes/tarjeta-producto.js` que integra las mejores prácticas de las tres estudiantes, manteniendo los módulos individuales `tarjeta-producto-lili.js`, `tarjeta-producto-rashell-pinos.js` y `tarjeta-producto-camila.js` como respaldo histórico y evidencia de autoría.

---

## 6. Declaración de uso de inteligencia artificial

- **Herramientas consultadas:** Gemini y Claude.
- **Propósito de la consulta:** Asistencia técnica para diagnosticar errores de resolución de rutas de módulos ES, verificar el cumplimiento de la rúbrica de Web Components, estructurar la documentación técnica y ordenar las secciones del README de acuerdo a los requerimientos pedagógicos de la asignatura.
- **Verificación humana:** Todas las líneas de código, la lógica de los Custom Elements, la reactividad de los atributos, los nombres de los productos, la propuesta del emprendimiento y los archivos finales fueron revisados, probados y verificados minuciosamente por el equipo de estudiantes.
