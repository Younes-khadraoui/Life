package main

import (
	"bytes"
	"embed"
	"io"
	"io/fs"
	"life/database"
	"log"
	"net/http"
	"strings"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

// spaFileServer returns an HTTP handler that serves files from the provided embed.FS.
// If the file doesn't exist, it serves the fallback file (typically "index.html").
func spaFileServer(assets embed.FS, fallback string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestedPath := strings.TrimPrefix(r.URL.Path, "/")
		log.Printf("Requested: %s", requestedPath)

		// Try to stat the requested file.
		_, err := fs.Stat(assets, requestedPath)
		if err != nil {
			log.Printf("File not found, falling back to %s", fallback)
			requestedPath = fallback
		}

		f, err := assets.Open(requestedPath)
		if err != nil {
			http.Error(w, "Not Found", http.StatusNotFound)
			return
		}
		defer f.Close()

		info, err := f.Stat()
		if err != nil {
			http.Error(w, "Not Found", http.StatusNotFound)
			return
		}

		// Check if the file implements io.ReadSeeker.
		if rs, ok := f.(io.ReadSeeker); ok {
			http.ServeContent(w, r, requestedPath, info.ModTime(), rs)
		} else {
			// Otherwise, read the file into memory and serve using a bytes.Reader.
			data, err := io.ReadAll(f)
			if err != nil {
				http.Error(w, "Not Found", http.StatusNotFound)
				return
			}
			http.ServeContent(w, r, requestedPath, info.ModTime(), bytes.NewReader(data))
		}
	})
}

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	err := database.InitDB()
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer database.CloseDB()

	// Create application with options
	// Create an instance of the app structure
	app := NewApp()

	err = wails.Run(&options.App{
		Title:  "test",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets:  assets,
			Handler: spaFileServer(assets, "index.html"),
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
