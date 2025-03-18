const pool = require("./pool");

const seedDB = async () => {
  try {
    console.log("Seeding Database");

    await pool.query("DELETE FROM comments");
    await pool.query("DELETE FROM posts");
    await pool.query("DELETE FROM users");

    await pool.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
    await pool.query("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
    await pool.query("ALTER SEQUENCE comments_id_seq RESTART WITH 1");

    await pool.query(`
        INSERT INTO users (first_name, last_name, username, email, password, role, created_at)
        VALUES
        ('Henry', 'of Skalitz', 'henska', 'henrys@outlook.com', 'woof123', 'user', NOW()),
        ('Hans', 'Capon', 'hancap', 'hcapon@outlook.com', 'woof123', 'user', NOW()),
        ('Katherine', 'Main Gal', 'katherine', 'katherine@outlook.com', 'woof123', 'user', NOW()),
        ('Markvart', 'von Aulitz', 'markvart', 'markvart@outlook.com', 'woof123', 'user', NOW()),
        ('Mutt', 'of Henry', 'mutt', 'mutt@outlook.com', 'woof123', 'user', NOW()),
        ('Father', 'Godwin', 'godwin', 'godwin@outlook.com', 'woof123', 'user', NOW()),
        ('Radzig', 'Kobyla', 'radzigk', 'radzig@outlook.com', 'woof123', 'admin', NOW()),
        ('Divish', 'of Talmberg', 'divish', 'divish@outlook.com', 'woof123', 'admin', NOW()),
        ('Erik', 'of Istvan', 'erikist', 'erik@outlook.com', 'woof123', 'user', NOW()),
        ('Otto', 'von Bergow', 'ottber', 'otto@outlook.com', 'woof123', 'user', NOW()),
        ('Istvan', 'Toth', 'isttoh', 'toth@outlook.com', 'woof123', 'admin', NOW()),
        ('Johanka', 'of Sasau', 'johanka', 'johanka@outlook.com', 'woof123', 'user', NOW()),
        ('Theresa', 'of Skalitz', 'theresa', 'theresa@outlook.com', 'woof123', 'user', NOW()),
        ('Anonymous', 'User', 'anonymous', 'anon@outlook.com', 'anon123', 'user', NOW())
      `);

    await pool.query(`
        INSERT INTO posts (title, content, timestamp, updated_at, published, user_id)
        VALUES 
      ('The Battle of Skalitz', 'A firsthand account of the horrors of war.', NOW(), NOW(), TRUE, 1),
      ('Hunting with Sir Hans', 'A hunting trip that didnt go as planned.', NOW(), NOW(), TRUE, 2),
      ('Confessions of a Drunk Priest', 'A sermon no one expected.', NOW(), NOW(), TRUE, 6),
      ('Secrets of the Sasau Monastery', 'The monks are hiding something...', NOW(), NOW(), FALSE, 12),
      ('A Duel with Erik', 'A fight for honor and revenge.', NOW(), NOW(), TRUE, 9),
      ('The Siege of Talmberg', 'Tales from the front lines.', NOW(), NOW(), TRUE, 8),
      ('Bandit Hunting', 'Tracking down a ruthless gang.', NOW(), NOW(), TRUE, 3),
      ('The Art of Sword Fighting', 'Lessons from Sir Radzig.', NOW(), NOW(), TRUE, 7),
      ('The Fall of Markvart von Aulitz', 'Retribution for Skalitz.', NOW(), NOW(), TRUE, 4),
      ('Henrys Best Friend', 'Why every warrior needs a dog.', NOW(), NOW(), TRUE, 5)
        `);

    await pool.query(`
        INSERT INTO comments (content, timestamp, updated_at, user_id, post_id)
        VALUES
      ('This battle was a nightmare. I barely made it out alive.', NOW(), NOW(), 1, 1),
      ('This battle was a nightmare2. I barely made it out alive2.', NOW(), NOW(), 1, 1),
      ('This battle was a nightmare3. I barely made it out alive3.', NOW(), NOW(), 1, 1),
      ('Henry, you owe me another hunting trip!', NOW(), NOW(), 2, 2),
      ('I never expected that from Father Godwin... what a sermon!', NOW(), NOW(), 6, 3),
      ('The monastery is full of secrets... you should investigate.', NOW(), NOW(), 12, 4),
      ('I challenged Erik to a duel. Best fight of my life.', NOW(), NOW(), 9, 5),
      ('Talmberg was a fortress, but it fell. We must rebuild.', NOW(), NOW(), 8, 6),
      ('Those bandits were tough, but we handled them.', NOW(), NOW(), 3, 7),
      ('Sir Radzigs training changed my life.', NOW(), NOW(), 7, 8),
      ('Markvart got what he deserved.', NOW(), NOW(), 4, 9),
      ('A mans best friend, indeed. Mutt is the true hero.', NOW(), NOW(), 5, 10)
          `);

    console.log("Database Successfully Seeded");
  } catch (err) {
    console.error("Error Seeding Database", err);
  } finally {
    await pool.end();
    console.log("Database connection closed");
  }
};

seedDB();
