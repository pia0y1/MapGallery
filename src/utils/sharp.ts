import sharp from "sharp"

const imageProcessing = {
  resize(path: string) {
    console.log(path)
    let outputPath = path.replace("sceneryImage","thumbnail")
    sharp(path).resize(80).toFile(outputPath)
  }
}

export default imageProcessing