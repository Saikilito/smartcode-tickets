-- 1. first create your database
CREATE DATABASE your_database_password;

-- 2. run server (example: npm start)
    -- the ORM will create the necessary tables and entities

-- 3. within mysql run the follow scripts
use your_database_password;
insert into tipo_usuario (nombre) values ("admin");
insert into tipo_usuario (nombre) values ("user");
