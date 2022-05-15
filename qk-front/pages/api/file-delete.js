import fs from "fs"

/**
 * Deletes file from folder.
 * @desc Delete file from upload folder after successful upload to processing.
 * @param req Request.
 * @param res Response.
 * @returns Status 200 and OK.
 * @throws If file was not found or server related errors.
 **/
export default async (req, res) => {
   if (req.method === "POST") {
      const filePath = `uploads/${req.body}`
      if (fs.existsSync(filePath)) {
         fs.unlinkSync(filePath)
         res.status(200).send("OK")
      } else {
         res.status(500).send("Something went wrong")
      }
   }
}