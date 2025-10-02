# 🤖 Sistema de Scraping de Datos de Seguros

Este sistema automatiza la recolección y actualización de datos de seguros para perros en Dinamarca.

## 📋 Características

- **Scraping automático** de 8+ aseguradoras principales
- **Actualización cada 2 meses** via GitHub Actions
- **Validación de datos** automática
- **Monitoreo de precios** y cambios
- **Backup automático** de datos existentes
- **Logs detallados** de todas las operaciones

## 🏢 Aseguradoras Monitoreadas

1. **Agria** - https://www.agria.dk/hundeforsikring/
2. **Tryg** - https://www.tryg.dk/forsikring/hund
3. **Alka Forsikring** - https://www.alka.dk/forsikringer/hund
4. **GF Forsikring** - https://www.gf.dk/hund
5. **Dyrekassen Danmark** - https://www.dyrekassen.dk/hund/
6. **Topdanmark** - https://www.topdanmark.dk/hund
7. **Codan** - https://www.codan.dk/forsikring/hundeforsikring
8. **Gjensidige** - https://www.gjensidige.dk/forsikring/hundeforsikring

## 🚀 Uso

### Comandos Disponibles

```bash
# Scraping completo
npm run scrape-data

# Validar datos
npm run validate-data

# Monitorear cambios de precios
npm run monitor-prices

# Ejecutar todo el proceso
npm run update-all
```

### Ejecución Manual

```bash
# Scraping individual
node scripts/scrape-insurance-data.js

# Validación
node scripts/validate-data.js

# Monitoreo de precios
node scripts/price-monitor.js
```

## ⚙️ Configuración

### GitHub Actions

El sistema se ejecuta automáticamente cada 2 meses via GitHub Actions:

- **Cron**: `0 9 1 */2 *` (1er día de cada 2 meses a las 9:00 AM UTC)
- **Trigger manual**: Disponible en GitHub Actions
- **Auto-deploy**: Vercel despliega automáticamente los cambios

### Estructura de Datos

```json
{
  "udbyder": "Agria",
  "produkt": "Agria Ansvar",
  "pris_mdr": "79 kr./md",
  "dækning": "Lovpligtig hundeansvarsforsikring",
  "tilvalg": ["Sygeforsikring", "Tanddækning", "Medicindækning"],
  "kampagne": "10% rabat ved online bestilling",
  "link": "https://www.agria.dk/hundeforsikring/",
  "last_updated": "2025-01-15T10:30:00.000Z"
}
```

## 📊 Monitoreo

### Logs

- **Ubicación**: `logs/scraping.log`
- **Formato**: Timestamp + mensaje
- **Rotación**: Automática (GitHub Actions)

### Historial de Precios

- **Archivo**: `data/price-history.json`
- **Tracking**: Cambios de precios por proveedor
- **Alertas**: Cambios significativos (>5%)

### Validación

- ✅ Estructura de datos correcta
- ✅ URLs válidas
- ✅ Precios en formato correcto
- ✅ Campos requeridos presentes

## 🔧 Personalización

### Agregar Nuevas Aseguradoras

1. Editar `scripts/scrape-insurance-data.js`
2. Agregar entrada en array `PROVIDERS`
3. Configurar selectores CSS específicos
4. Probar con `npm run scrape-data`

### Modificar Frecuencia

1. Editar `.github/workflows/update-insurance-data.yml`
2. Cambiar cron expression
3. Commit y push

### Selectores CSS

```javascript
{
  name: 'Nueva Aseguradora',
  url: 'https://ejemplo.dk/hundeforsikring',
  selectors: {
    price: '.price, .pris, [data-price]',
    product: '.product-name, .product-title, h1, h2',
    campaign: '.campaign, .offer, .rabat',
    coverage: '.coverage, .dækning, .includes'
  }
}
```

## 🛡️ Seguridad y Ética

- **Rate limiting**: 2 segundos entre requests
- **User-Agent**: Identificación clara del bot
- **Respeto**: No sobrecarga los servidores
- **Fallback**: Datos de respaldo si falla el scraping
- **Logs**: Transparencia total de operaciones

## 📈 Métricas

### Datos Recolectados

- **Precios mensuales** en DKK
- **Productos** y nombres específicos
- **Coberturas** incluidas
- **Tilvalg** (opciones adicionales)
- **Kampagner** (ofertas especiales)
- **Enlaces** directos a productos

### Alertas Automáticas

- 📈 **Aumentos de precio** >5%
- 📉 **Reducciones de precio** >5%
- 🆕 **Nuevos productos** detectados
- ❌ **Errores de scraping** >50% de proveedores

## 🔄 Flujo de Trabajo

1. **GitHub Action** se ejecuta cada 2 meses
2. **Scraping** de todas las aseguradoras
3. **Validación** de datos recolectados
4. **Backup** de datos existentes
5. **Actualización** del archivo JSON
6. **Monitoreo** de cambios de precios
7. **Commit** y push automático
8. **Deploy** automático en Vercel

## 🚨 Troubleshooting

### Errores Comunes

**Timeout en requests**
```bash
# Aumentar timeout en CONFIG
timeout: 60000  # 60 segundos
```

**Selectores CSS no funcionan**
```bash
# Verificar selectores en browser dev tools
# Actualizar en PROVIDERS array
```

**Datos no válidos**
```bash
# Ejecutar validación
npm run validate-data
```

### Logs de Debug

```bash
# Ver logs completos
tail -f logs/scraping.log

# Filtrar errores
grep "❌" logs/scraping.log
```

## 📞 Soporte

Para problemas o mejoras:

1. **Issues**: Crear issue en GitHub
2. **Logs**: Incluir logs relevantes
3. **Datos**: Verificar estructura de datos
4. **Testing**: Probar localmente primero

---

**Última actualización**: Enero 2025  
**Próxima ejecución**: Marzo 2025  
**Estado**: ✅ Activo
