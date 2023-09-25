CREATE DATABASE PostgresGames;

CREATE TABLE GAMES(
    game_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    description VARCHAR(255),
    genre_id SERIAL,
    release_date VARCHAR(4),
    image_name TEXT
);

CREATE TABLE USERS(
    id SERIAL PRIMARY KEY,
    username varchar(25),
    email TEXT,
    password char(60)
);


INSERT INTO USERS(username, email, password) values($1, $2, $3)

Create table FILES(id serial primary key, type text, name text, data bytea);