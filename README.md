# Medic Toro

Portal para publicar y consultar revistas de investigación médica, con soporte para **Firebase Firestore** y **Firebase Storage**.

## Requisitos

- Node.js 20+
- npm 10+
- Proyecto en [Firebase Console](https://console.firebase.google.com/) (opcional, para persistencia en la nube)

## Instalación

```bash
npm install
```

## Configurar Firebase

1. Crea un proyecto en Firebase Console
2. Habilita **Firestore Database** y **Storage**
3. Copia las credenciales web de tu app:

```bash
cp .env.example .env
```

4. Completa las variables en `.env` con los valores de Firebase
5. Despliega las reglas de seguridad desde la carpeta `firebase/`:

   - `firestore.rules` → Firestore Rules
   - `storage.rules` → Storage Rules

6. Reinicia el servidor de desarrollo

## Cómo funciona

| Dato | Dónde se guarda |
|------|-----------------|
| Título, autores, resumen, categoría | **Firestore** (`journals`) |
| Archivo PDF | **Firebase Storage** (`journals/{id}/archivo.pdf`) |
| URL de descarga | Firestore (campo `fileUrl`) |

Sin `.env` configurado, el portal usa **modo local** con revistas de ejemplo.

## Scripts

| Comando           | Descripción                    |
|-------------------|--------------------------------|
| `npm run dev`     | Servidor de desarrollo         |
| `npm run build`   | Build de producción            |
| `npm run preview` | Preview del build              |
| `npm run test`    | Ejecutar pruebas unitarias     |
| `npm run lint`    | Linter (oxlint)                |

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Licencia

Proyecto privado.
