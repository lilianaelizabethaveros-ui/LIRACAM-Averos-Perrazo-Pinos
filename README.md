# Proyecto LIRACAM · Base Inicial

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Detalle |
|---|---|
| Emprendimiento | LIRACAM |
| Integrantes del equipo | Averos Fonseca Liliana Elizabeth (@lilianaelizabethaveros-ui)<br>Perrazo Guerra Camila Mayte (@CamilaPerrazo)<br>Pinos Cordero Rashell Estefany (@rashellpinos) |
| Asignatura | Programación Integrativa de Componentes Web |
| Unidad | Unidad 1: Web Components |
| NRC | 36642 |
| Fecha | Octubre de 2026 |
| Enlace del repositorio | https://github.com/lilianaelizabethaveros-ui/LIRACAM-Averos-Perrazo-Pinos |

---

## 1. Identificación del proyecto

Este repositorio contiene la **base inicial colaborativa** para el desarrollo del proyecto **LIRACAM**, correspondiente a la Unidad 1 de la asignatura.

El objetivo de esta etapa es establecer una estructura de archivos limpia, estandarizada y modular basada en estándares web nativos, sirviendo como punto de partida para que cada integrante del equipo construya su componente web en una rama de trabajo independiente sin dependencias externas ni frameworks.

---

## 2. Propuesta del emprendimiento (LIRACAM)

- **Nombre del emprendimiento:** LIRACAM
- **Descripción del negocio:** Tienda digital interactiva enfocada en la comercialización de snacks saludables y repostería artesanal elaborada con insumos tradicionales y granos andinos de la sierra ecuatoriana, como galletas de quinua y cacao fino de aroma.
- **Problema o necesidad que atiende:** La falta de opciones de alimentación rápida que sean verdaderamente saludables, nutritivas y accesibles para la rutina diaria, ofreciendo una alternativa libre de procesados que revaloriza el producto local.
- **Cliente o público objetivo:** Jóvenes universitarios, profesionales con rutinas aceleradas, deportistas y personas con un estilo de vida consciente que buscan snacks funcionales y de alta calidad en Quito y la región interandina.
- **Propuesta de valor:** Fusionar la riqueza nutricional de los superalimentos andinos con una experiencia de compra web moderna y modular basada en componentes web, garantizando origen natural, excelente sabor y estética profesional.
- **Identidad visual:**
  - **Colores:**
    - Verde fresco y natural (`#3D8B4F`): evoca la agricultura orgánica y la naturaleza de la sierra.
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
1. **Elementos personalizados (*Custom Elements*):** Creación de etiquetas HTML propias con nombres que incluyen un guion (ejemplo: `<tarjeta-producto>`), extendiendo la clase nativa `HTMLElement` y registrándolas mediante `customElements.define`.
2. **Shadow DOM (Modo `open`):** Árbol DOM encapsulado que aísla la estructura interna y los estilos CSS del componente, evitando colisiones con el diseño global de la página.
3. **Plantillas HTML (*HTML Templates*):** Declaración de bloques inertes con `<template>` que contienen el HTML y CSS del componente, clonados eficientemente en memoria mediante `cloneNode(true)`.
4. **Ranuras de contenido (*Slots*):** Mecanismo de proyección para insertar contenido dinámico desde el documento principal hacia el componente (fotos, nombres y descripciones con textos de respaldo).
5. **Ciclo de vida y reactividad:**
   - `constructor()`: Inicialización del componente y creación del Shadow DOM.
   - `connectedCallback()`: Inserción y renderizado de la plantilla en el DOM.
   - `static get observedAttributes()`: Declaración de atributos a vigilar (como el precio).
   - `attributeChangedCallback()`: Actualización reactiva del contenido visible ante cambios en los atributos.
   - *Getters* y *Setters*: Sincronización entre las propiedades de JavaScript y los atributos de HTML.

### Estructura de archivos y carpetas
```text
LIRACAM/
├── index.html              # Página web principal de presentación y contenedor del catálogo
├── estilos.css             # Estilos CSS globales de la página (layout, tipografía y variables)
├── README.md               # Documentación general, arquitectura y guía de trabajo del equipo
├── img/                    # Recursos gráficos, logotipos e imágenes de productos del emprendimiento
│   ├── guayusa.jpg         # Imagen real del producto (Rashell Pinos)
│   ├── producto-1.svg      # Gráfico referencial inicial
│   ├── producto-2.svg      # Gráfico referencial inicial
│   └── producto-3.svg      # Gráfico referencial inicial
└── componentes/            # Directorio donde residen los Web Components modulares del equipo
    ├── .gitkeep            # Archivo de control para Git
    └── tarjeta-producto-rashell-pinos.js  # Componente individual de producto (Rashell Pinos)
```

---

## 5. Cómo se utilizará el proyecto

### Apertura y ejecución local
1. Abrir la carpeta `LIRACAM` en Visual Studio Code.
2. Iniciar la página mediante la extensión **Live Server** (clic derecho sobre `index.html` → **Open with Live Server**) o situando la carpeta en `htdocs` de XAMPP y accediendo por `http://localhost/...`.
3. **¿Por qué se requiere un servidor local?:** Al abrir un archivo con `file://`, las políticas de seguridad del navegador impiden la carga de módulos de JavaScript (`<script type="module">`). Un servidor local proporciona el protocolo `http://` necesario para que los módulos y componentes funcionen correctamente.

### Incorporación de componentes por el equipo
- Cada integrante creará su archivo JavaScript dentro de `componentes/`.
- Las fotografías correspondientes a cada snack o producto se alojarán en `img/`.
- En `index.html` se importará el script modular de cada componente para conformar el catálogo unificado de la tienda.

---

## 6. Organización de Git y GitHub

El equipo implementará el flujo de ramas acordado en clase:

```text
main  (Versión estable y entregas oficiales)
  └── develop  (Rama de integración del equipo)
        ├── feature/rashell-pinos                 (Componente individual · Rashell Pinos)
        ├── [Rama individual por definir]         (Liliana Averos)
        └── [Rama individual por definir]         (Camila Perrazo)
```

1. **Rama `main`:** Contiene exclusivamente las versiones estables y aprobadas del proyecto.
2. **Rama `develop`:** Rama de integración creada a partir de `main`. En ella se integrarán y probarán conjuntamente los componentes desarrollados por las tres integrantes.
3. **Ramas individuales:** Ramas creadas a partir de `develop` para que cada integrante trabaje de manera independiente en su componente sin interferir con el resto (por ejemplo, `feature/rashell-pinos` para Rashell Pinos; las demás ramas individuales se crearán cuando cada integrante inicie el desarrollo de su respectivo componente).
4. **Revisión y merge:** Cada integrante prueba su componente localmente. Tras la revisión y aprobación del equipo, se realiza el *merge* hacia `develop`. Una vez verificado el catálogo completo, se realiza el *merge* hacia `main`.

> *Nota:* La rama `develop` ya se encuentra publicada en el repositorio remoto. Las ramas individuales se crearán a partir de `develop` cuando cada integrante inicie el desarrollo de su componente.

---

## 7. Responsabilidades de las integrantes

| Integrante | Rol y asignación en el proyecto | Estado |
|---|---|---|
| Averos Fonseca Liliana Elizabeth (@lilianaelizabethaveros-ui) | Preparación de la base inicial del proyecto (estructura de archivos, arquitectura base y documentación). Desarrollo de su componente individual en su rama de trabajo. | Base inicial completada |
| Perrazo Guerra Camila Mayte (@CamilaPerrazo) | Desarrollo y verificación de su componente individual de producto en su respectiva rama de trabajo. | Pendiente de desarrollo en rama |
| Pinos Cordero Rashell Estefany (@rashellpinos) | Desarrollo y verificación de su componente individual de producto en su respectiva rama de trabajo. | Componente implementado en rama `feature/rashell-pinos`; pendiente de validación visual e integración grupal |

---

## 8. Declaración de uso de inteligencia artificial

- **Herramientas consultadas:** Gemini y Claude.
- **Propósito de la consulta:** Asistencia técnica para estructurar la documentación académica, organizar las secciones del proyecto y redactar con claridad la arquitectura de Web Components y el flujo colaborativo de Git.
- **Verificación humana:** Todo el contenido, los nombres de las integrantes, la propuesta del emprendimiento y la configuración de archivos fueron revisados, adaptados y verificados por el equipo de estudiantes. Esta declaración se mantendrá actualizada conforme avance el desarrollo de los componentes individuales.

---

## 9. Seguimiento de los componentes individuales del equipo

Esta sección permite realizar el seguimiento técnico del desarrollo e integración de los Web Components individuales asignados a cada integrante del equipo:

| Integrante | Producto o componente | Archivo JavaScript | Rama de trabajo | Estado |
|---|---|---|---|---|
| Averos Fonseca Liliana Elizabeth (@lilianaelizabethaveros-ui) | *Pendiente de confirmación* | *Pendiente de confirmación* | *Pendiente de confirmación* | Pendiente de desarrollo en rama |
| Perrazo Guerra Camila Mayte (@CamilaPerrazo) | *Pendiente de confirmación* | *Pendiente de confirmación* | *Pendiente de confirmación* | Pendiente de desarrollo en rama |
| Pinos Cordero Rashell Estefany (@rashellpinos) | Infusión fría de Guayusa Orgánica con Limón | `componentes/tarjeta-producto-rashell-pinos.js` | `feature/rashell-pinos` | Implementado en su rama individual; pendiente de validación visual e integración grupal |