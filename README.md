# DRWX — Read. Write. Execute.
### drwx.io — Software & Systems

## Estructura del proyecto
```
drwx-website/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos
│   ├── js/
│   │   └── main.js         # JavaScript
│   └── img/                # Imágenes (vacío por ahora)
└── README.md
```

## Setup con Cursor + Git + Hostinger

### 1. Abrir en Cursor
```bash
# Abre esta carpeta en Cursor IDE
cursor drwx-website/
```

### 2. Inicializar Git
```bash
cd drwx-website
git init
git add .
git commit -m "initial: DRWX website"
```

### 3. Crear repo en GitHub
- Ve a github.com → New Repository → `drwx-website` → Private
```bash
git remote add origin git@github.com:TU_USUARIO/drwx-website.git
git branch -M main
git push -u origin main
```

### 4. Conectar Hostinger
- hPanel → Advanced → Git
- Repository URL: tu repo de GitHub
- Branch: main
- Directory: public_html
- Copiar Webhook URL → pegarlo en GitHub → Settings → Webhooks

### 5. Deploy automático
Cada `git push` despliega automáticamente a drwx.io

## Stack
- HTML5 / CSS3 / Vanilla JS
- Sin dependencias externas
- Fonts: Google Fonts (JetBrains Mono, IBM Plex Sans)

---
© 2026 DRWX. drwxrwxrwx.
