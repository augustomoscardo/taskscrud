import { Readable, Transform } from "node:stream"
import fs from "node:fs/promises"

import { parse } from "csv-parse"
import { generate } from "csv-generate"

const csvCotent = (async () => {
  // Initialise the parser by generating random records
  const parser = generate({
    columns: 2,
    length: 25,
    seed: 5
  }).pipe(parse());

  // Initialise count
  let count = 0;
  // Report start
  const csvHeader = "title, description"
  // process.stdout.write(`${csvHeader}\n`);

  let csv = ["title, description"]

  // Iterate through each records
  for await (const record of parser) {
    count++
    
    let [title, description] = record
    title = `Nova tarefa ${count}`
    description = `Descrição da tarefa ${count}`

    csv = [...csv, `${title}, ${description}`]
    
    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }
  // Report end
  // process.stdout.write("...done\n");
})();
