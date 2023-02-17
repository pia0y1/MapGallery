import * as fs from "fs"

const myFS = {
  readImgInfoJson: (username: string) => {
    const filePath = "C:/Users/YJX/Desktop/Vue/sceneryshare/public/imageInfo/" + username + ".json"
    // return filePath
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) return err
      else return data
    })
  }
}

export default myFS