import fs, { promises } from "fs"

import { parse } from "csv-parse"
import { IncomingForm } from "formidable"

export const config = { api: { bodyParser: false } }

export default async (req, res) => {
   if (req.method === "POST") {
      const data = await new Promise((resolve, reject) => {
         const form = new IncomingForm()
         form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
         })
      })

      try {
         const parsedData = []

         const file = data.files.uploadedFile
         const temporaryPath = file.filepath
         const filePrefix = Date.now()
         const pathToWriteFile = `uploads/${filePrefix}-${file.originalFilename}`
         const fileWrite = await promises.readFile(temporaryPath)
         await promises.writeFile(pathToWriteFile, fileWrite)
         
         fs.createReadStream(pathToWriteFile)
            .pipe(parse({ delimiter: ",", relax_column_count: true }))
            .on("data", res => {
               parsedData.push(res)
            })
            .on("end", () => {
               res.status(200).json({
                  file: parsedData[0],
                  prefix: filePrefix
               })
            })

      } catch (error) {
         res.status(500).json({ message: error.message })
      }
   }
}