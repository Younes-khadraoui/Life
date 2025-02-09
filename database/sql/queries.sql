-- name: GetAllTodos :many
SELECT * from Todos;

-- name: CreateTodo :exec
INSERT INTO Todos (title, description, category_id, severity, done, archived, created_at, updated_at) 
VALUES (?, ?, ?, ?, COALESCE(?, FALSE), COALESCE(?, FALSE), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- name: DeleteTodo :exec
DELETE FROM Todos WHERE id=?