# Notes API Version 2

## Project Description

This is a simple REST API that demonstrates basic CRUD operations. The API allows users to manage notes and their categories.

## Available Routes

### Notes Routes

- `GET /v2/api/users` - Get all notes
- `GET /v2/api/users/:id` - Get a specific note by ID
- `POST /v2/api/users` - Create a new note
- `PUT /v2/api/users/:id` - Update a note
- `DELETE /v2/api/users/:id` - Delete a note
- `GET /v2/api/notes/categories/:categoryId` - Get notes by note category's ID

### Pagination Parameters 

The following query parameters can be used to control pagination:

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)

    *NOTE:* All parameters must be positve numbers

Example: `GET http://localhost:3000/v2/api/notes?page=1&limit=5`

## Installation for Development

1. Clone the repository
2. Run `npm install`
3. Start the server with `npm run dev`

## Major Technologies Used

- Node.js
- Express.js
- mongoose
- Zod
- MongoDB
- Reander(deployemt)
