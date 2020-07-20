CREATE TABLE users(id int PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(100), lastName VARCHAR(100));
INSERT INTO users (firstName, lastName) VALUES("Russ", "Kim");
INSERT INTO users (firstName, lastName) VALUES("Bob", "Builder");
INSERT INTO users (firstName, lastName) VALUES("Dwayne", "Johnson");
SELECT * FROM users;