import http from "node:http"
import { routes } from "./routes.js"


const app = http.createServer((request, response) => {
  const { method, url } = request

  return response.writeHead(404).end("Not found")
})

app.listen(3333, () => console.log("Server is running on port 3333"))