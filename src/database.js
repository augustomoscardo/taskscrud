import fs from "node:fs/promises"

const databasePath = new URL("../db.json", import.meta.url)

export class Database {
  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then(data => this.#database = JSON.parse(data))
      .catch(() => this.#persist())
  }

  #database = {}

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })  
    }

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()

    return data
  }

  update(table, id, data) { 
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    const { title, description } = data

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        title: title ?? this.#database[table][rowIndex].title,
        description: description ?? this.#database[table][rowIndex].description,
        updatedAt: new Date()
      }

      this.#persist()

      return true
    }

    return false
  }

  complete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        completedAt: new Date(),
      }
      
      this.#persist()

      return true
    }

    return false
  }

  delete(table, id) { 
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      this.#persist()

      return true
    }

    return false
  }
}