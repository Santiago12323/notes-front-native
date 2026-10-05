# Notas 1.0

Primera versión de una aplicación para escribir a mano en cuadernos digitales. Está hecha con Expo, React Native y TypeScript, y funciona en Web, Android e iOS.

Esta versión no tiene cuentas, servidor ni sincronización. Los cuadernos y los dibujos viven en memoria: al cerrar o recargar la aplicación se pierden.

## Qué incluye

### Cuadernos

- Lista de cuadernos.
- Crear, renombrar y eliminar.
- Título y descripción opcional.
- Portadas: Salvia, Arcilla, Tinta y Arena.

### Páginas

- Crear, editar y eliminar páginas dentro de un cuaderno.
- Título, asunto opcional y fecha.
- Ordenar páginas hacia arriba o hacia abajo.
- Pasar a la página anterior o siguiente desde el editor.

### Dibujo

- Lápiz, pincel y borrador.
- Doce colores de tinta.
- Cuatro grosores: pequeño, mediano, grande y extra grande.
- Deshacer y rehacer.
- Acercar, alejar y restablecer el zoom.
- Desplazar el papel.
- El trazo se guarda como puntos, no como una imagen final.

### Papel

- En blanco.
- Cuadrícula. Al hacer zoom o desplazar el papel, la cuadrícula sigue cubriendo el área visible.
- Líneas.
- Puntos.

### Ajustes

- Tema claro y oscuro.
- Idioma: español e inglés.
- La interfaz se adapta a teléfono y a un ancho de tablet.

## Cómo iniciar el proyecto

Hace falta Node.js 22.13 o superior.

```bash
npm install
npx setup-skia-web public
npm start
```

`setup-skia-web` copia `canvaskit.wasm` a `public/`. Sin ese archivo, el lienzo no dibuja en Web.

Con el servidor en marcha:

- Escanea el código QR con Expo Go para abrirla en un teléfono.
- Pulsa `w` para abrirla en el navegador.
- Pulsa `a` para Android o `i` para iOS, si el emulador ya está disponible.

También puedes arrancar cada plataforma directamente:

```bash
npm run web
npm run android
npm run ios
```

## Comprobaciones

```bash
npm run typecheck
npm test
npm run lint
```

## Versión

**1.0.0** — primera versión usable del cuaderno: organización local, páginas y dibujo a mano.
