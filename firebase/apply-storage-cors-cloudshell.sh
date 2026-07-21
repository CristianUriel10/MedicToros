#!/usr/bin/env bash
# ============================================================
# MedicToros — Aplicar CORS en Firebase Storage (Google Cloud)
# ============================================================
# NO es Firestore. El PDF sube a Storage; Firestore solo guarda metadatos.
#
# OPCIÓN MÁS FÁCIL: Google Cloud Shell (sin instalar nada en tu Mac)
# 1. Abre: https://console.cloud.google.com/storage/browser?project=medictoros
# 2. Arriba a la derecha, clic en el icono ">_" (Cloud Shell)
# 3. Pega y ejecuta TODO el bloque de abajo:
# ============================================================

cat <<'EOF'
gcloud config set project medicotoros

cat > /tmp/medictoros-cors.json <<'JSON'
[
  {
    "origin": [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://medictoro.netlify.app",
      "https://medictoros.netlify.app"
    ],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600,
    "responseHeader": [
      "Content-Type",
      "Authorization",
      "Content-Length",
      "User-Agent",
      "X-Requested-With",
      "x-goog-resumable",
      "x-goog-upload-protocol",
      "x-goog-upload-command",
      "x-goog-upload-header-content-length",
      "x-goog-upload-header-content-type",
      "x-goog-upload-offset",
      "x-firebase-gmpid"
    ]
  }
]
JSON

gcloud storage buckets update gs://medictoros.firebasestorage.app --cors-file=/tmp/medictoros-cors.json

echo "--- CORS aplicado. Verificación:"
gcloud storage buckets describe gs://medictoros.firebasestorage.app --format="json(cors_config)"
EOF

echo ""
echo "Copia el bloque entre 'gcloud config set project' y el final del echo."
echo "Si falla el bucket, prueba también:"
echo "  gcloud storage buckets update gs://medictoros.appspot.com --cors-file=/tmp/medictoros-cors.json"
