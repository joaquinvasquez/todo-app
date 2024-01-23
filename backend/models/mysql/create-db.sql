DELETE IF EXISTS DATABASE todos_app;
CREATE DATABASE todos_app;
USE todos_app;

CREATE TABLE todos (
  todo_id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
  title VARCHAR(50) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0,
  `order` INT UNSIGNED NOT NULL,
  `user` BINARY(16) NOT NULL
);

CREATE TABLE users (
  user_id BINARY(16) PRIMARY KEY NOT NULL
);


-- INSERT INTO users (user_id) VALUES (UUID_TO_BIN(UUID()));

-- INSERT INTO todos VALUES (
--   UUID_TO_BIN(UUID()),
--   'otro todo2',
--   0,
--   2,
--   UUID_TO_BIN('9ae7969e-b94f-11ee-b35f-244bfec8f5ca')
-- );


INSERT INTO todos (title, `order`, `user`)
VALUES (
  'titulo', 
  (SELECT MAX(`order`) FROM todos WHERE BIN_TO_UUID(user) = '9bf28842-b94a-11ee-8e5e-244bfec8f5ca' LIMIT 1),
  UUID_TO_BIN('9ae7969e-b94f-11ee-b35f-244bfec8f5ca')
);


-- SELECT BIN_TO_UUID(todo_id) todo_id, title, completed, `order`, BIN_TO_UUID(`user`) `user` FROM todos;


-- UPDATE todos SET `order` = 1 WHERE todo_id = UUID_TO_BIN('9ae7969e-b94f-11ee-b35f-244bfec8f5ca');