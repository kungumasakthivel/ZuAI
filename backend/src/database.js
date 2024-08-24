const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/sqlite.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT NOT NULL
    )
  `);
});

module.exports = db;
