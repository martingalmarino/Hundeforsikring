# 🚀 Ejecutar Hundeforsikring Localmente

## Opción 1: Servidor Node.js (Recomendado)

```bash
# Ejecutar servidor local
npm run local
```

**O directamente:**
```bash
node start-local.js
```

**URL:** http://localhost:3000

---

## Opción 2: Servidor Python (Alternativo)

```bash
# Ejecutar servidor Python
python3 start-simple.py
```

**URL:** http://localhost:3001

---

## Opción 3: Servidor HTTP Simple

```bash
# Instalar y ejecutar http-server
npx http-server . -p 3000 -o
```

**URL:** http://localhost:3000

---

## ✨ Características del Servidor Local

- 🔄 **Sin caché** - Cambios visibles inmediatamente
- 📁 **Sirve archivos estáticos** (HTML, CSS, JS, JSON)
- 🛡️ **Seguro** - Previene directory traversal
- 🎯 **MIME types correctos** para todos los archivos
- ⚡ **Rápido** - Sin compilación, solo sirve archivos

## 🎯 Páginas para Probar

- **Home:** http://localhost:3000/
- **Forsikring:** http://localhost:3000/forsikring/
- **Kommune:** http://localhost:3000/forsikring/kobenhavn/
- **FAQ:** http://localhost:3000/faq/

## 🛑 Detener el Servidor

Presiona `Ctrl+C` en la terminal donde está ejecutándose el servidor.

## 🔧 Solución de Problemas

**Si el puerto está ocupado:**
- Cambia el puerto en el archivo `start-local.js` (línea 5)
- O usa `python3 start-simple.py` que usa puerto 3001

**Si no ves los cambios:**
- El servidor local tiene caché deshabilitado
- Refresca la página (F5 o Cmd+R)
- Verifica que estés en la URL correcta

**Si hay errores de CORS:**
- El servidor local maneja CORS automáticamente
- No deberías tener problemas con fetch() a archivos JSON
