package main

import (
	"context"
	"database/sql"
	"fmt"
	"life/database"
	"life/database/sqlc"
	"life/models"
	"strconv"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Get all todos
func (a *App) GetTodos() ([]models.TodoResponse, error) {
	db := database.GetDB()
	queries := sqlc.New(db)
	ctx := context.Background()

	todos, err := queries.GetAllTodos(ctx)
	if err != nil {
		return nil, err
	}

	var response []models.TodoResponse
	for _, todo := range todos {
		response = append(response, models.TodoResponse{
			ID:          todo.ID,
			Title:       todo.Title,
			Description: todo.Description.String,
			CategoryID:  todo.CategoryID.Int64,
			Severity:    todo.Severity,
			Done:        todo.Done.Bool,
			Archived:    todo.Archived.Bool,
			CreatedAt:   todo.CreatedAt.Time,
			UpdatedAt:   todo.UpdatedAt.Time,
		})
	}

	return response, nil
}

// Create a new todo
func (a *App) CreateTodo(title string, description string, severity int) error {
	db := database.GetDB()
	queries := sqlc.New(db)
	ctx := context.Background()

	return queries.CreateTodo(ctx, sqlc.CreateTodoParams{
		Title:       title,
		Description: sql.NullString{String: description, Valid: description != ""},
		Severity:    int64(severity),
	})
}

// Delete a todo
func (a *App) DeleteTodo(todoId string) error {
	db := database.GetDB()
	queries := sqlc.New(db)
	ctx := context.Background()

	id, err := strconv.Atoi(todoId)
	if err != nil {
		return err
	}

	return queries.DeleteTodo(ctx, int64(id))
}
