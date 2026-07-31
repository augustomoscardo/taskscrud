import http from "node:http"
import { routes } from "./routes.js"
import { json } from "./middlewares/json.js"


const app = http.createServer((request, response) => {
  const { method, url } = request

  await json(request, response)

  const route = routes.find(route => route.method === method && route.path === url)

  if (route) {
    return route.handler(request, response)
  }

  return response.writeHead(404).end("Not found")
})

app.listen(3333, () => console.log("Server is running on port 3333"))