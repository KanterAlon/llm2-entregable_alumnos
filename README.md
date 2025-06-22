# Proyecto de ejemplo

Este repositorio incluye un backend en `backend/` y una interfaz web en `frontend/`.

## Instalación

Ejecuta un único comando para instalar todas las dependencias:

```bash
npm install
```

El script `postinstall` instalará automáticamente los paquetes del frontend.

## Ejecución

Para levantar el servidor y la aplicación web en paralelo, usa:

```bash
npm run start:dev
```

Se abrirá la página en tu navegador y el backend quedará disponible en `http://localhost:3000`.

Si solo deseas utilizar el asistente por consola puedes ejecutar:

```bash
npm start
```

### Solución de problemas

En algunos entornos Windows puede aparecer un mensaje similar a:

```
npm warn cleanup [...]
npm ERR! EPERM: operation not permitted, rmdir '...\\node_modules'
```

Esto suele indicar que la carpeta `frontend/node_modules` está en uso. Cierra
cualquier proceso que esté ejecutando la aplicación, elimina dicha carpeta y
vuelve a ejecutar `npm install`.
