# Proyecto de ejemplo

Este repositorio incluye un backend en `backend/` y una interfaz web en `frontend/`.

## Instalación

Con un único comando podrás instalar todas las dependencias y lanzar el entorno de desarrollo:

```bash
npm run dev
```

Tras ejecutar `npm run dev` se instalarán las dependencias del proyecto principal y del frontend, iniciando después ambos servidores.

El frontend quedará disponible en `http://localhost:3000` y el backend en `http://localhost:3001` automáticamente. Gracias a `cross-env` no es necesario cambiar puertos manualmente, incluso en Windows.

Si en algún momento necesitas reinstalar las dependencias sin arrancar el proyecto puedes utilizar:

```bash
npm run setup
```

Y si solo deseas utilizar el asistente por consola ejecuta:

```bash
npm start
```
