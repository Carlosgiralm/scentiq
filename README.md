# ScentIQ 🧪
### Asesor personal de perfumes con inteligencia artificial

---

## Archivos del proyecto

```
scentiq/
├── index.html        ← La app completa (frontend)
├── api/
│   └── chat.js       ← El servidor que conecta con Claude
├── vercel.json       ← Configuración de despliegue
├── package.json      ← Info del proyecto
└── README.md         ← Esta guía
```

---

## Cómo desplegarlo en Vercel (paso a paso)

### Paso 1 — Subir el código a GitHub

1. Ve a **github.com** e inicia sesión
2. Clic en el botón verde **"New"** (arriba a la izquierda)
3. En "Repository name" escribe: `scentiq`
4. Deja todo lo demás por defecto
5. Clic en **"Create repository"**
6. En la página que aparece, busca la sección **"uploading an existing file"** y haz clic ahí
7. Arrastra todos los archivos de esta carpeta (index.html, vercel.json, package.json, y la carpeta api/)
8. Clic en **"Commit changes"**

### Paso 2 — Conectar GitHub con Vercel

1. Ve a **vercel.com** e inicia sesión
2. Clic en **"Add New Project"**
3. Busca tu repositorio `scentiq` y clic en **"Import"**
4. No cambies nada en la configuración
5. Clic en **"Deploy"**
6. Espera 1-2 minutos — Vercel construye la app

### Paso 3 — Agregar tu API Key (IMPORTANTE)

Sin este paso la app no funciona:

1. En Vercel, ve a tu proyecto `scentiq`
2. Clic en **"Settings"** (arriba)
3. Clic en **"Environment Variables"** (menú izquierdo)
4. En "Key" escribe exactamente: `ANTHROPIC_API_KEY`
5. En "Value" pega tu API key de Anthropic
6. Clic en **"Save"**
7. Ve a **"Deployments"** y clic en **"Redeploy"** para aplicar los cambios

### Paso 4 — Listo 🎉

Vercel te da una URL como: `https://scentiq-tuusuario.vercel.app`

¡Esa es tu app funcionando en internet!

---

## Funcionalidades del MVP

- ✅ Asesor conversacional con IA (Claude Sonnet)
- ✅ Perfil olfativo acumulativo visible
- ✅ Fase 1: Perfil básico (género, ciudad, ocasión, estilo, presupuesto)
- ✅ Fase 2: ADN emocional (memorias, identidad, emociones)
- ✅ Recomendaciones con match técnico + emocional
- ✅ Cards de perfumes con notas, precio y vendors Colombia
- ✅ Barra de progreso de la consulta
- ✅ Accesos rápidos por ocasión
- ✅ Diseño responsivo (móvil y escritorio)

## Próximas funcionalidades

- 📸 Análisis por foto de outfit
- 🔔 Alertas de bajada de precios
- 👤 Perfil acumulativo entre sesiones
- 🏪 Portal B2B para perfumerías
- 💬 Bot de WhatsApp

---

## Soporte

Cualquier problema con el despliegue, revisar:
- Que la API key esté correctamente configurada en Vercel
- Que el repositorio tenga todos los archivos incluyendo la carpeta `api/`
