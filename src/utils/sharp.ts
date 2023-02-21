import sharp from "sharp"

const imageProcessing = {
  resize(path: string) {
    let outputPath = path.replace("sceneryImage", "thumbnail")
    sharp(path).resize(80, 80, {
      fit: "contain",
      background: { r: 128, g: 128, b: 128, alpha: 0.5 }
    }).toFile(outputPath)
  }
}

export default imageProcessing