import { randomUUID } from "node:crypto"
import { Database } from "./database.js"

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, response) => { }
  },
]