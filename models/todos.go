package models

import "time"

type TodoResponse struct {
	ID          int64       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	CategoryID  int64       `json:"category_id"`
	Severity    int64       `json:"severity"`
	Done        bool      `json:"done"`
	Archived    bool      `json:"archived"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
