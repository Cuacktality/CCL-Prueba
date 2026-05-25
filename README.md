# CCL-Prueba
Proyecto de Prueba - Vacante CCL

# MiniSistema de Gestión de Inventario — CCL

Aplicación web para gestionar el inventario de productos de la empresa CCL. Permite a usuarios autenticados consultar el inventario y registrar entradas y salidas de productos.

---

## Tecnologías utilizadas

| Capa | Tecnología |
|------|------------|
| Backend | C# · .NET 9 · Entity Framework Core |
| Base de datos | PostgreSQL |
| Frontend | Angular 19 · TypeScript |
| Autenticación | JWT (Bearer Token) |

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrese de tener instalado lo siguiente:

- .NET 9 SDK
- Node.js 20+ y Angular
- PostgreSQL 15+
- Visual Studio 2022 o 2026
- VS Code

---

## Pasos para ejecutar el proyecto

### 1. Clonar o descargar el repositorio

### 2. Configurar la base de datos

Abra **pgAdmin 4**, conéctese al servidor local y en la herramienta de consultas ejecute el siguiente script (El mismo se encuentra en la carpeta Scripts/CreacionDB.sql):

```sql
CREATE DATABASE cclInventario;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0
);

INSERT INTO productos (nombre, cantidad) VALUES 
('Laptop Omen', 15),
('Monitor LG 32', 30),
('Teclado Mecánico Logitech', 0),
('SSD Kingston 512GB', 50),
('RAM Crucial 16GB', 10),
('Diadema Genius', 2),
('Silla Ergonómica de Oficina Negra', 4),
('Router Rompemuros', 12),
('Base Refrigerante para Portátil', 18),
('Adaptador Bluetooth USB 5.0', 0), 
('Pad Mouse Antideslizante XL', 60);
```

> **Nota:** Si su usuario o contraseña de PostgreSQL son distintos a los predeterminados, actualice la cadena de conexión en `CclInventarioBackend/appsettings.json`:
> ```json
> "DefaultConnection": "Host=localhost;Port=5432;Database=ccl_inventario;Username=postgres;Password=SU_CONTRASEÑA"
> ```

---

### 3. Ejecutar el backend

Abra la solución `CclInventarioBackend.slnx` en **Visual Studio 2026** o Visual Studio 2022.
El backend quedará disponible en `http://localhost:5144`.

---

### 4. Ejecutar el frontend

Abra la carpeta `ccl-inventario-frontend` en **VS Code** y ejecute en la terminal:

```bash
ng serve -o
```
Se abrirá el proyecto en el navegador en `http://localhost:4200`.

---

## Credenciales de acceso

| Campo | Valor |
|-------|-------|
| Usuario | `admin` |
| Contraseña | `root` |

---

## Flujo de uso

1. Ingresar con las credenciales indicadas en la pantalla de login.
2. Verificar el inventario actual en la pantalla principal.
3. Registrar un movimiento de **entrada** o **salida** seleccionando el producto y la cantidad.
4. Confirmar que el inventario se actualiza correctamente.

> El sistema valida que no se puedan registrar salidas si el stock disponible es insuficiente.

---

## Endpoints disponibles para prueba en Postman

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| POST | `/auth/login` | No | Retorna un JWT válido por 8 horas |
| GET | `/productos/inventario` | Bearer Token | Obtiene todos los productos con su cantidad |
| POST | `/productos/movimiento` | Bearer Token | Registra la entrada o salida de un producto |

### Ejemplo de body para movimiento

```json
{
  "productoId": 1,
  "tipo": "entrada",
  "cantidad": 10
}
```

`tipo` acepta los valores `"entrada"` o `"salida"`.
