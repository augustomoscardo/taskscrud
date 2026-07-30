import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { Task } from "./models/task.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (request, response) => {
      let tasks = database.select("tasks")

      return response.writeHead(200).end(tasks)
    }
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (request, response) => {
      const data = request.body

      const newTask = new Task(
        randomUUID(),
        data.title,
        data.description,
        null,
        new Date(),
        null
      )

      database.insert("tasks", newTask)

      return response.writeHead(201).end()
    }
  },
  {
    method: "PUT",
    path: "/tasks/:id",
    handler: (request, response) => {
      const data = request.body
    }
  }
]