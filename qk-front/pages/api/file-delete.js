import fs from "fs"

export default async (req, res) => {
   if (req.method === "POST") {
      const filePath = `uploads/${req.body}`
      fs.unlinkSync(filePath)
      res.status(200)
   }
}