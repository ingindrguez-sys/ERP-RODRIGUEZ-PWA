# ERP Rodríguez PWA v1.1

Aplicación PWA de Grupo Comercial Rodríguez, conectada a la misma base de datos Supabase del ERP actual.

## Incluye
- Login persistente.
- Centro de Control.
- Ventas.
- Clientes.
- Productos.
- Gastos.
- Inventario.
- Configuración.
- Zona horaria de México.
- Manifest PWA.
- Service Worker.
- Iconos instalables.
- Diseño para celular y computadora.

## Importante
En Next.js, `manifest.webmanifest` y `sw.js` van dentro de `public`.
El archivo global de estilos va en `app/globals.css`.
No existe `app.js`, porque Next.js usa archivos `page.tsx`.

## Vercel
Configura estas variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

Nunca uses la llave `service_role`.
