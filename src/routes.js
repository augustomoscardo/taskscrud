import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { Task } from "./models/task.js"
import { buildRoutePaths } from "./utils/build-route-paths.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutePaths("/tasks"),
    handler: (request, response) => {
      const { search } = request.query
      console.log(search);
      

      let tasks = database.select("tasks", search ? {
        title: search,
        description: search
      } : null)

      return response.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: buildRoutePaths("/tasks"),
    handler: (request, response) => {
      const { title, description } = request.body

      if (!title || !description) {
        return response.writeHead(400).end(JSON.stringify({ message: "Title and description are required" }))
      }

      const task = new Task({
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: null
      })

      database.insert("tasks", task)

      return response.writeHead(201).end()
    }
  },
  {
    method: "PUT",
    path: buildRoutePaths("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params
      const { title, description } = request.body

      if (!title && !description) {
        return response.writeHead(400).end(JSON.stringify({ message: "Title and description are required" }))
      }
      
      const updatedTask = database.update("tasks", id, { title, description })

      if (updatedTask) {
        return response.writeHead(204).end(JSON.stringify(updatedTask))
      }

      return response.writeHead(404).end(JSON.stringify({ message: "Task not found" }))
    }
  },
  {
    method: "PATCH",
    path: buildRoutePaths("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params

      const completedTask = database.complete("tasks", id)

      if (completedTask) {
        return response.writeHead(204).end(JSON.stringify(completedTask)) 
      }

      return response.writeHead(404).end(JSON.stringify({ message: "Task not found" }))
    }
  },
  {
    method: "DELETE",
    path: buildRoutePaths("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params

      const deletedTask = database.delete("tasks", id)

      if (deletedTask) {
        return response.writeHead(204).end(JSON.stringify(deletedTask))
      }

      return response.writeHead(404).end(JSON.stringify({ message: "Task not found" }))
    }
  }
]