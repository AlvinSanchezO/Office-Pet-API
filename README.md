# Office Pet API

## Descripción

**Office Pet API** es una API REST construida con [NestJS](https://nestjs.com/) que gestiona mascotas de oficina y sus propietarios. Permite a los usuarios registrarse, autenticarse con JWT, crear mascotas y administrar su información.

### Características principales

- 🔐 Autenticación con JWT
- 👥 Gestión de propietarios
- 🐾 Gestión de mascotas
- 🗄️ Base de datos PostgreSQL con Prisma ORM
- 📚 Documentación Swagger automática
- ✔️ Validación de datos con class-validator
- 🧪 Pruebas unitarias e integración con Jest

## Arquitectura del Proyecto

El proyecto está estructurado en módulos siguiendo la arquitectura de NestJS:

- **auth**: Maneja la autenticación y autorización usando JWT. Incluye controladores para login, guards para proteger rutas, y DTOs para validación.
- **owners**: Gestiona los propietarios de mascotas. Contiene controladores para operaciones CRUD, servicios para lógica de negocio, DTOs para requests, y entidades para modelos de datos.
- **pets**: Similar a owners, pero para mascotas. Incluye relaciones con propietarios.
- **prisma**: Proporciona el servicio de base de datos usando Prisma ORM para consultas y migraciones.

Las capas se organizan así:
- **Controladores**: Manejan las rutas HTTP y delegan a servicios.
- **Servicios**: Contienen la lógica de negocio.
- **DTOs**: Definen la estructura y validación de datos de entrada/salida.
- **Entidades**: Representan los modelos de datos (usados con Prisma).

Esto asegura separación de responsabilidades y mantenibilidad.

---

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalados:

- **Node.js**: v18.0.0 o superior ([Descargar](https://nodejs.org/))
- **npm**: v8.0.0 o superior (incluido con Node.js)
- **PostgreSQL**: v12.0 o superior ([Descargar](https://www.postgresql.org/))
- **Git**: Para clonar el repositorio ([Descargar](https://git-scm.com/))

### Verificar las versiones instaladas

```bash
node --version
npm --version
psql --version
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/AlvinSanchezO/Office-Pet-API.git
cd Office-Pet-API
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
# Opción 1: Copiar el archivo ejemplo y editarlo
cp .env.example .env

# Opción 2: Crear manualmente el archivo .env
```

### 4. Configurar la base de datos PostgreSQL

#### Usando Docker Compose (Recomendado)

El proyecto incluye `docker-compose.yml` con una instancia de PostgreSQL preconfigurada:

```bash
docker-compose up -d
```

Esto levantará une contenedor PostgreSQL en el puerto 5435.

#### Instalación manual

Si prefieres una instalación local:

1. Abre psql o tu cliente PostgreSQL
2. Crea la base de datos:

```sql
CREATE DATABASE office_pets_db;
```

### 5. Ejecutar migraciones de Prisma

```bash
npm run prisma:migrate
```

O si es la primera vez:

```bash
npx prisma migrate deploy
```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de Datos PostgreSQL
# Formato: postgresql://usuario:contraseña@host:puerto/nombre_db?schema=public
DATABASE_URL="postgresql://user_office:password123@localhost:5435/office_pets_db?schema=public"

# JWT - Secreto para firmar tokens
# Cambiar en producción a una cadena segura y larga
JWT_SECRET="super-secret-key-office-2026"

# Entorno (development, production, test)
NODE_ENV="development"

# Puerto donde corre la aplicación
PORT=3000
```

### Notas sobre variables:

- **DATABASE_URL**: Actualiza según tu configuración local de PostgreSQL
- **JWT_SECRET**: En producción, usa un valor seguro y generado aleatoriamente
- Los datos sensibles **nunca** deben commitearse (`.env` está en `.gitignore`)

---

## Ejecución del Proyecto

### Modo desarrollo (con hot-reload)

```bash
npm run start:dev
```

La API estará disponible en: `http://localhost:3000`

### Modo desarrollo (debug)

```bash
npm run start:debug
```

### Modo producción

Primero, compila el proyecto:

```bash
npm run build
```

Luego, ejecuta:

```bash
npm run start:prod
```

---

## Pruebas

### Ejecutar todas las pruebas

```bash
npm run test
```

### Pruebas en modo watch (re-ejecutan cuando cambias archivos)

```bash
npm run test:watch
```

### Pruebas con cobertura

```bash
npm run test:cov
```

### Pruebas end-to-end (E2E)

```bash
npm run test:e2e
```

---

## Estructura del Proyecto

```
office-pets-api/
├── src/
│   ├── auth/                 # Módulo de autenticación
│   ├── owners/               # Módulo de propietarios
│   ├── pets/                 # Módulo de mascotas
│   ├── prisma/               # Servicio y módulo de Prisma
│   ├── app.controller.ts     # Controlador raíz
│   ├── app.service.ts        # Servicio raíz
│   ├── app.module.ts         # Módulo raíz
│   └── main.ts               # Punto de entrada
├── prisma/
│   ├── schema.prisma         # Esquema de base de datos
│   └── migrations/           # Historial de migraciones
├── test/                     # Pruebas E2E
├── .env.example              # Plantilla de variables de entorno
├── docker-compose.yml        # Configuración de Docker
└── package.json              # Dependencias y scripts
```

---

## Endpoints Principales

### Autenticación

- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Propietarios

- `GET /owners` - Obtener todos los propietarios
- `GET /owners/:id` - Obtener propietario por ID
- `POST /owners` - Crear nuevo propietario
- `PATCH /owners/:id` - Actualizar propietario
- `DELETE /owners/:id` - Eliminar propietario

### Mascotas

- `GET /pets` - Obtener todas las mascotas
- `GET /pets/:id` - Obtener mascota por ID
- `POST /pets` - Crear nueva mascota
- `PATCH /pets/:id` - Actualizar mascota
- `DELETE /pets/:id` - Eliminar mascota

### Documentación Swagger

Accede a la documentación interactiva en:

```
http://localhost:3000/api/docs
```

---

## Linting y Formato de Código

### Ejecutar ESLint

```bash
npm run lint
```

### Formatear código con Prettier

```bash
npm run format
```

---

## Compilación

Compilar el proyecto TypeScript a JavaScript:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.

---

## Solución de Problemas

### Error: "Cannot find module '@nestjs/...'"

**Solución:**

```bash
npm install
npm run build
```

### Error de conexión a base de datos

**Verifica:**

1. PostgreSQL está corriendo: `sudo systemctl status postgresql` (Linux/Mac)
2. La `DATABASE_URL` en `.env` es correcta
3. Las credenciales de PostgreSQL son válidas
4. El puerto 5435 (o el configurado) no está bloqueado

### Error en migraciones de Prisma

**Resuelve:**

```bash
npx prisma migrate deploy  # Aplicar migraciones pendientes
npx prisma db push        # Sincronizar esquema con BD
```

---

## Variables de Entorno para Pruebas

Para ejecutar pruebas, asegúrate que `.env` está configurado correctamente. Las pruebas usarán la configuración de `test/jest-e2e.json`.

---

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## Licencia

Este proyecto está bajo la licencia UNLICENSED.

---

## Autor

**Alvin Sánchez**

## Contacto

- 📧 Email: [tu-email@example.com]
- 🐙 GitHub: [@AlvinSanchezO](https://github.com/AlvinSanchezO)

---

## Recursos Útiles

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/)

---

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
