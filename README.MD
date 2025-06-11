# 🧠 Proyecto Calendar - Prueba técnica

Este repositorio contiene una API REST en **Express.js** desarrollada para completar una prueba ténica que consiste en un calendario, con eventos, distintas vistas y auth.
Utiliza una base de datos **PostgreSQL**.

---

## ✅ Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js v18.3.0**
  - Puedes usar [`nvm`](https://github.com/nvm-sh/nvm) para controlar distintas versiones de Node. Luego, haz lo siguiente para instalar esta versión:
    ```bash
    nvm install 18.3.0
    nvm use 18.3.0
    ```
    Si no sabes si tienes esta versión de Node, puedes ver tus versiones con el siguiente comando:
    ```bash
    nvm list
    ```
    y si tienes esta versión ya instalada, directamenta la utilizas con el comando
    ```bash
    nvm use 18.3.0
    ```
- **PostgreSQL**
  - Asegúrate de tener acceso a una base de datos PostgreSQL local o remota.

---

## 🚀 Pasos para levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/francofraiese/calendar-server.git
cd calendar-server
```

### 2. Instalar dependencias

```bash
npm install
# o si usás yarn
yarn install
```

### 3. Crear base de datos en PostgreSQL

Asegurate de tener PostgreSQL corriendo y crear una base de datos para el proyecto:

```sql
CREATE DATABASE calendar_db;
```

> Podés usar otro nombre si preferís, pero recordá cambiarlo en el .env cuando lo crees en el siguiente paso.

### 4. Crear archivo de variables de entorno

Tomá de referencia el archivo `.env.example` (o copialo) y creá tu archivo `.env`:

En este, colocá en cada key el valor correspondiente a tu base de datos creada y demás datos necesarios.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=calendar_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

FRONTEND_URL=https://www.tu-frontend.com
```

---

### 5. Iniciar el servidor

```bash
npm start
```

Verás un mensaje como:

```
Server up @ http://localhost:3000
```

La API estará lista para recibir peticiones desde el frontend configurado en `FRONTEND_URL`.


## Información del repositorio

### 📂 Estructura del proyecto

```bash
.src
├── /controllers        # Controladores con la lógica de los endpoints
├── /database           # Archivos y conexión a la BBDD
│   ├── db.ts           # Configuración de TypeORM y conexión a la base de datos
│   ├── migrate.ts      # Validador de migraciones previo a compilación
│   └── /entities       # Entidades de la BBDD
│   └── /migrations     # Migraciones de la BBDD
├── /middlewares        # Middlewares utilizados para optimización del código en el ruteo
├── /routes             # Rutas del proyecto
├── /utils              # Funciones utilizadas en el código para ciertos propósitos específicos.
├── app.ts              # Configuración de Express y middlewares globales
├── main.ts             # Archivo principal para la ejecución del servidor
.env                    # Variables de entorno utilizadas
.env.example            # Ejemplo de archivo .env para referencia
package.json            # Dependencias y scripts del proyecto
tsconfig.json           # Configuración del compilador TypeScript
```

## Migraciones

### Correr migraciones

El proyecto corre por si solo en cada compilación las validaciones de migraciones necesarias, pero en caso de necesitar correrlo manualmente es el siguiente:

```bash
npm run migration:run
```

Este comando mostrará en consola en mensaje de migración satisfactoria o, de haberlo, mostrará el error que hubo al corrar una determinada migración lo cual cancelará las demás migraciones.

### Crear migraciones

De necesitar crear una nueva migracion para añadir, modificar o eliminar tablas, columnas o relaciones, pueden crearlas corriendo el siguiente comando:

```bash
npm run migration:new src/database/migrations/nombre-descriptivo-de-la-migración
```

Esto nos dará un archivo base de migración, con nombre en base al timestamp de la hora de la creación del archivo seguido del nombre seleccionado. 

Dentro del archivo contaremos con 2 funciones (up y down) las cuales deberán tener la información a modificar o agregar y las acciones necesarias para revertir ese cambio, respectivamente.