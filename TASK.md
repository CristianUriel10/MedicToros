# Medic Toro - Tareas

## Completadas

- [x] Crear proyecto React + Vite + TypeScript — 2026-07-21
- [x] Landing page inicial — 2026-07-21
- [x] Refactorizar a portal de revistas de investigación médica — 2026-07-21
- [x] Catálogo con búsqueda y filtros — 2026-07-21
- [x] Formulario de subida de revistas PDF — 2026-07-21

- [x] Integración Firebase Firestore + Storage — 2026-07-21

- [x] Subida de carteles y eliminación editorial protegida — 2026-07-21

## Pendientes

- [ ] Desplegar reglas actualizadas de `firebase/firestore.rules` y `firebase/storage.rules` en Firebase Console
- [ ] Configurar las mismas variables `VITE_FIREBASE_*` en el hosting al desplegar
- [ ] Autenticación de usuarios investigadores
- [ ] Configurar CI/CD

## Descubierto Durante el Trabajo

- Sin `.env`, el portal funciona en modo local con datos de ejemplo
- Los PDF se almacenan en Firebase Storage, no directamente en Firestore
- Las revistas de ejemplo no tienen PDF descargable hasta subirse a Firebase
