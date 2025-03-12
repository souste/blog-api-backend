const pool = require("./pool");

const seedDB = async () => {
  try {
    console.log("Seeding Database");

    await pool.query("DELETE FROM users");

    await pool.query(`
            INSERT INTO users (first_name, last_name, username, email, password, role, created_at)
            VALUES
            ('Stephen', 'Souness', 'souste', 'tiny2011', 'ssouness@outlook.com', 'woof123', 'user', NOW()); `);

    console.log("Database Successfully Seeded");
  } catch (err) {
    console.error("Error Seeding Database", err);
  } finally {
    await pool.end();
    console.log("Database connection closed");
  }
};

seedDB();
