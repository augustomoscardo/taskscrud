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

      let tasks = database.select("tasks", search ? {} : null)

      return response.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: buildRoutePaths("/tasks"),
    handler: (request, response) => {
      const data = request.body

      const task = new Task({
        id: randomUUID(),
        title: data.title,
        description: data.description,
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
      const data = request.body
    }
  }
]