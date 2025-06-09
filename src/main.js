import { empezarChat } from "./lib/cli-chat.js";
import { elAgente } from "./agent.js";

const mensajeBienvenida = `
¡Hola! Soy tu asistente para gestionar estudiantes.
Puedo ayudarte a:
- Buscar estudiantes por nombre o apellido
- Agregar nuevos estudiantes
- Mostrar la lista completa de estudiantes

¿Qué necesitás?
`;

empezarChat(elAgente, mensajeBienvenida);
