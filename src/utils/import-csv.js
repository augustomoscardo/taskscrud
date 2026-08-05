import { Readable, Transform } from "node:stream"
import fs from "node:fs"

import { parse } from "csv-parse"
import { generate } from "csv-generate"


// Create CSV file with 25 records
async function generateCsv() {
  const file = await fs.createWriteStream("tasks.csv")
  file.write("title, description\n")

  let count = 0

  const records = generate({
    columns: 2,
    length: 25,
  }).pipe(parse())
  

  for await (const record of records) {
    count++

    const title = `Nova tarefa ${count}`
    const description = `Descrição da tarefa ${count}`

    file.write(`${title}, ${description}\n`)
  }

  file.end()
}

async function importTasksFromCsv() {
  const fileStream = await fs.createReadStream("tasks.csv")
  const parser = fileStream.pipe(parse({
    from_line:2
  }))
  
  for await (const record of parser) {
    const [title, description] = record

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description })
    })
  }
  
}

await generateCsv()
  .then(() => {
    console.log("CSV generated successfully")
  })
  .catch((err) => {
    console.error(err)
  })



await importTasksFromCsv()
  .then(() => {
    console.log("Tasks imported successfully")
  })
  .catch((err) => {
  console.error(err)
})