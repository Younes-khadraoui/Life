package database

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"
	"sync"

	_ "github.com/mattn/go-sqlite3"
)

var (
	db   *sql.DB
	once sync.Once
)

// InitDB initializes the SQLite database in a persistent location
func InitDB() error {
	var err error
	once.Do(func() {
		// Get a cross-platform config directory
		configDir, err := os.UserConfigDir()
		if err != nil {
			log.Fatalf("❌ Could not get config directory: %v", err)
			return
		}

		// Create an app-specific directory
		appDir := filepath.Join(configDir, "LifeApp")
		if _, err := os.Stat(appDir); os.IsNotExist(err) {
			os.MkdirAll(appDir, 0755) // Ensure the directory exists
		}

		// Database path inside config directory
		dbPath := filepath.Join(appDir, "Life.db")

		log.Printf("📂 Database path: %s", dbPath)

		// Open SQLite connection
		db, err = sql.Open("sqlite3", dbPath)
		if err != nil {
			log.Fatalf("❌ Error opening database: %v", err)
			return
		}

		// Force database file creation
		_, err = db.Exec("PRAGMA journal_mode=WAL;")
		if err != nil {
			log.Fatalf("❌ Database connection failed: %v", err)
		}

		// Create necessary tables
		createTables := `
		CREATE TABLE IF NOT EXISTS Category (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE,
			description TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);

		CREATE TABLE IF NOT EXISTS Todos (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			title TEXT NOT NULL,
			description TEXT,
			category_id INTEGER,
			severity INTEGER NOT NULL CHECK(severity IN (0, 1, 2)),
			done BOOLEAN DEFAULT FALSE,
			archived BOOLEAN DEFAULT FALSE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE SET NULL
		);
		`

		_, err = db.Exec(createTables)
		if err != nil {
			log.Fatalf("❌ Error creating tables: %v", err)
		} else {
			log.Println("✅ Database initialized successfully!")
		}
	})

	return err
}

// GetDB returns the database instance
func GetDB() *sql.DB {
	if db == nil {
		log.Fatal("❌ Database connection is not initialized. Call InitDB first.")
	}
	log.Println("✅ Database connection is active.")
	return db
}

// CloseDB closes the database connection
func CloseDB() {
	if db != nil {
		if err := db.Close(); err != nil {
			log.Printf("❌ Error closing database: %v", err)
		}
	}
}
