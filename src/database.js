import fs from "node:fs/promises"

const databasePath = new URL("../db.json", import.meta.url)

export class Database {
  constructor() {
    fs.readFile(databasePath, "utf8")
      .then(data => this.#database = JSON.parse(data))
      .catch(() => this.#persist())
  }

  #database = []

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {

  }

  insert(table) { }

  update(table) { }

  delete(table) { }
}