import fs from "fs"

/**
 * Deletes file from front-end folder.
 **/
export default async (req, res) => { // eslint-disable-line import/no-anonymous-default-export
   if (req.method === "POST") {
      const filePath = `uploads/${req.body}`
      if (fs.existsSync(filePath)) {
         await fs.unlinkSync(filePath)
         res.status(200).json("OK")
      } else {
         res.status(500).json("Something went wrong")
      }
   }
}