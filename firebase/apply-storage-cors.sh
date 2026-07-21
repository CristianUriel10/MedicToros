#!/usr/bin/env bash
set -euo pipefail

# Aplica CORS al bucket de Firebase Storage para permitir subida de PDFs
# desde localhost y Netlify.
#
# Requisitos (una sola vez):
#   brew install google-cloud-sdk
#   gcloud auth login
#   gcloud config set project medicotoros
#
# Uso:
#   bash firebase/apply-storage-cors.sh

BUCKET="${FIREBASE_STORAGE_BUCKET:-medictoros.firebasestorage.app}"
CORS_FILE="$(cd "$(dirname "$0")" && pwd)/storage.cors.json"

if ! command -v gcloud >/dev/null 2>&1; then
  echo "Instala Google Cloud SDK: brew install google-cloud-sdk"
  exit 1
fi

echo "Aplicando CORS a gs://${BUCKET} ..."
gcloud storage buckets update "gs://${BUCKET}" --cors-file="${CORS_FILE}"

echo "Listo. Verifica con:"
echo "  gcloud storage buckets describe gs://${BUCKET} --format='json(cors_config)'"
