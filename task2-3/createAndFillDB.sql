DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS user_group;

CREATE TABLE users (
	id text PRIMARY KEY,
	login text,
	password text,
	age int,
	is_deleted boolean
);

CREATE TABLE groups (
	id text PRIMARY KEY,
	name text,
	permissions text []
);

CREATE TABLE user_group (
  user_id text,
  group_id text,
  PRIMARY KEY (user_id, group_id),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT fk_group FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE CASCADE
);

INSERT INTO
	users(id, login, password, age, is_deleted)
VALUES
	(gen_random_uuid(), 'Dmytro', '1337', 23, false),
	(gen_random_uuid(), 'Pavlo', '1444', 24, false),
	(gen_random_uuid(), 'Oleh', '98765', 18, false),
	(gen_random_uuid(), 'Zekora', 'qwerty', 27, false),
	(gen_random_uuid(), 'Artem', 'qwerty123', 44, false),
	(gen_random_uuid(), 'Daniel', 'steelseries28', 20, true);
