<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="#">
    <img src="https://i.ibb.co/Lx77zgM/logo.jpg" alt="logo"  height="80">    
  </a>

  <h1 align="center">
	Smartcode Administrador de tickets
  </h1>

  <p align="center">
    Renderiza dinamicamente un administrador de usuarios y tickets (CRUD)
    <br />
	  🖊️    
    🐞
    <a href="https://github.com/Saikilito/smartcode-tickets/">Reporta un Bug</a>
    🙋‍♂
    <a href="https://github.com/Saikilito/smartcode-tickets/">Envia una carácteristica</a>
  </p>
</p>
    <p align="center">
    <img src="https://i.ibb.co/fGtx5ng/welcome.jpg"/>
    </p>

# El proyecto

El proyecto consiste de una aplicación que discrimina entre administradores y usuarios, ambos tipo de usuarios pueden pedir tickets pero solamente el administrador puede editar y borrar tickets o gestionar otros usuarios.

**Basado en los siguientes requerimientos:**

- Crear una app en React + Nodejs + MySql (o algun otro) donde puedas registrar y logearte **(sin recuperar contraseña)**, además deben haber dos tipos de usuarios: administrador y usuario.
- EL perfil de administador tendrá una tabla para administrar tickets (CRUD) y pueden ser asignados a usuarios.
- El perfil de usuarios solamente tiene una lista de tickets asignados y un boton para pedirlos (crear un boton para pedir lo tickets).
- La app debe discriminar y redirigir de acuerdo a su perfil.

- El proyecto tendra tres tablas:

1. usuarios: id, id_tipouser, nombre, mail, pass
2. ticket: id , id_user , ticket_pedido
3. tipo_usuario: id, nombre

# Características

- Usa ReactJS Framework
- Usa Nodejs basado en Typescript
- Usa TypeORM ORM para conectar a MySQL
- Usa Bootstrap 4
- Usa JWT Authorization (Para proteger las rutas del server y las sesiones de usuario)
- Conecta a la API usando `async/await`
- Diseño responsivo
- Programación basa en objetos
- Sintaxis ES6
- Notación Export/import ES6+

# Construido con

- Create React App (CRA)
- React-Router-Dom
- `yarn`
- `vscode` con las extensión de prettier
- Windows 10
- Amor y pasión por el código

# Live Demo

Pronto una version envivo.

<p align="center">
    <img src="https://i.ibb.co/L0hsPZ9/mobile-2.jpg"/>
    <img src="https://i.ibb.co/ZMr5r7C/window-2.jpg"/>
    <img src="https://i.ibb.co/yXrqmBS/c1.jpg"/>
</p>

## Prerequisitos

- `yarn` 1.21.1 +
- `node` 11.15 +
- `mysql +8.0`
- Un editor de texto como `VSCode`
- Un navegador como `Firefox` o `Chrome`

## Iniciarlo

Para iniciar esta app (DEV MODE) por favor siga cuidadosamente los siguiente pasos:

1 - Crea en tu MySQL una base de datos (smartcode puede ser un nombre de ejemplo)

```bash
create database smartcode;
use smartcode;
```

2 - git clone

```bash
git clone https://github.com/Saikilito/smartcode-tickets.git
cd smartcode-tickets
```

3- Dentro de la carpeta `server` escribe una archivo `.env` con la información necesaria para conectarse a la base de datos, usa el archivo `.env.example` para guiarte

```bash
cd smartcode-tickets/server
```

```bash
USERNAME_DB =
PASSWORD_DB =
DB_NAME =
JWT_SECRET =
```

PD: La variable JWT_SECRET recibe un `string` que desees colocar, este se usará como firma para garantizar los hash que protegen las rutas.

4- instala y corre el servidor (DEV MODE)

```bash
yarn
yarn dev
```

5- instalar y corre el cliente

```bash
cd smartcode-tickets/client
yarn && yarn start
```

Abre el servidor en [http://localhost:3000/](http://localhost:3000/) Para ver el cliente.
Usa [http://localhost:4000/](http://localhost:4000/) para interactuar con el server

PD: Usa email: "admin@smartcode.com" y password: "123456" para logearte como administrador
