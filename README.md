# Hundeforsikring.dk

Sammenlign hundeforsikring priser i hele Danmark. Find den bedste og billigste hundeforsikring fra alle udbydere.

## 🚀 Características

- **Comparación de precios**: Tabla interactiva con todos los proveedores de seguros para perros
- **121 páginas de municipios**: Contenido localizado para cada kommune de Dinamarca
- **Diseño responsive**: Optimizado para móviles y desktop
- **SEO optimizado**: Meta tags, JSON-LD y contenido estructurado
- **FAQ completo**: Preguntas frecuentes con schema markup

## 📊 Datos

El sitio incluye datos de 6 proveedores principales:
- Alka Forsikring (75 kr./md)
- Agria (79 kr./md)
- Tryg (85 kr./md)
- GF Forsikring (89 kr./md)
- Dyrekassen Danmark (95 kr./md)
- Topdanmark (99 kr./md)

## 🛠️ Tecnologías

- **HTML5** semántico
- **CSS3** con variables CSS y Grid/Flexbox
- **JavaScript** vanilla (ES6+)
- **Font Awesome** para iconos
- **Google Fonts** (Inter)
- **Vercel** para hosting

## 📁 Estructura del proyecto

```
hundeforsikring/
├── css/
│   └── style.css
├── data/
│   ├── hundeforsikring.json
│   └── kommuner.json
├── js/
│   ├── main.js
│   └── forsikring.js
├── forsikring/
│   └── [kommune]/
│       └── index.html (121 páginas generadas)
├── guide/
│   └── index.html
├── faq/
│   └── index.html
├── scripts/
│   └── generate-kommune-pages.js
├── index.html
├── vercel.json
└── package.json
```

## 🚀 Deploy en Vercel

1. **Conectar repositorio**: Conecta este repositorio a Vercel
2. **Configuración automática**: Vercel detectará automáticamente la configuración
3. **Deploy**: El sitio se desplegará automáticamente

### Configuración manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Desarrollo local

```bash
# Clonar repositorio
git clone https://github.com/martingalmarino/Hundeforsikring.git

# Instalar dependencias
npm install

# Servidor de desarrollo
vercel dev
```

## 📝 Generación de páginas

Para regenerar las páginas de municipios:

```bash
node scripts/generate-kommune-pages.js
```

## 🎨 Diseño

- **Colores**: Verde primario (#2E7D32), Azul secundario (#1565C0)
- **Tipografía**: Inter (Google Fonts)
- **Iconos**: Font Awesome 6.0
- **Responsive**: Mobile-first design

## 📈 SEO

- Meta tags optimizados
- JSON-LD schema markup
- URLs amigables
- Contenido localizado por municipio
- Sitemap XML incluido

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Martin Galmarino**
- GitHub: [@martingalmarino](https://github.com/martingalmarino)
- Proyecto: [Hundeforsikring.dk](https://github.com/martingalmarino/Hundeforsikring)

---

*Hundeforsikring.dk - Danmarks førende sammenligning af hundeforsikring priser*