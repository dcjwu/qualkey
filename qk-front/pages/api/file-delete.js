import fs from "fs"

export default async (req, res) => {
   if (req.method === "POST") {
      const filePath = `uploads/${req.body}`
      if (fs.existsSync(filePath)) {
         fs.unlinkSync(filePath)
         res.status(200).send("OK")
      } else {
         res.status(500).statusText("Something went wrong")
      }
   }
}