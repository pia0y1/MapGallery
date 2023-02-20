import express from "express"
import cors from "cors"
import multer from "multer"
import fs from "fs"
import imageProcessing from "../utils/sharp"

interface ImageType {
  t: string
  fn: string
  per: string
  sd: string
  st: string
  sdt: string
  sl: string
  sc: string
}
interface ImagesBatch {
  sd: string,
  imgs: Array<ImageType>
}

const app = express();
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.body.username
    const savePath = `public/image/sceneryImage/${username}/`
    cb(null, savePath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  let imagesList: Array<string> = []

  const username = req.body.username
  const buffer: Buffer = fs.readFileSync(`public/imageInfo/${username}.json`)
  const jsonData: Array<any> = JSON.parse(buffer.toString())

  const imgInfo: ImageType = JSON.parse(req.body.imgInfo)
  // 将图片路径传过去制作缩略图
  imageProcessing.resize(`./public/image/sceneryImage/${imgInfo.per}/${imgInfo.fn}`)
  // 先判断该图片是否存在，如果存在则不上传
  for (let i in jsonData) {
    for (let j in jsonData[i].imgs) {
      let img = jsonData[i].imgs[j]
      imagesList.push(img.fn)
    }
  }
  if (imagesList.some((fn: string) => imgInfo.fn === fn)) {
    res.send("该图片已存在")
  } else { // 如果不存在则寻找合适位置插入
    for (let i = 0; i < jsonData.length; i++) {
      // 如果这一天已经有其他照片，则在这天里面插入再排序
      if (Number(imgInfo.sd) === Number(jsonData[i].sd)) {
        jsonData[i].imgs.push(imgInfo)
        jsonData[i].imgs.sort((a: ImageType, b: ImageType) => Number(b.st) - Number(a.st))
        res.send("上传成功")
        break
        // 如果遍历到最早一天都没有照片，则新建该天照片，再排序
      } else if (i === jsonData.length - 1) {
        jsonData.push({ sd: imgInfo.sd, imgs: [imgInfo] })
        jsonData.sort((a, b) => Number(b.sd) - Number(a.sd))
        res.send("上传成功")
        break
      }
    }
  }
  fs.writeFileSync(`public/imageInfo/${username}.json`, JSON.stringify(jsonData))
})

app.post("/delete")

app.listen(3000, "192.168.31.250", () => {
  console.log("http://192.168.31.250:3000")
});