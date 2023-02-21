import express from "express"
import cors from "cors"
import multer from "multer"
import fs from "fs"
import path from "path"
import { json } from "body-parser"
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
app.use(json())

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
  // 判断相册是否为空，如果为空直接上传
  if (jsonData.length === 0) {
    jsonData.push({ sd: imgInfo.sd, imgs: [imgInfo] })
    res.send("上传成功")
  } else {
    for (let i in jsonData) {
      for (let j in jsonData[i].imgs) {
        let img = jsonData[i].imgs[j]
        imagesList.push(img.fn)
      }
    }
    // 判断该图片是否存在，如果存在则不上传
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
  }
  fs.writeFileSync(`public/imageInfo/${username}.json`, JSON.stringify(jsonData))
})

/**
 * 要删除的东西有：
 * 1. 原始图片
 * 2. 缩略图
 * 3. json文件对应的图片
 */
app.post("/delete", (req, res) => {
  const username: string = req.body.username
  const listData: Array<string> = req.body.checkedImagesList

  const buffer: Buffer = fs.readFileSync(`public/imageInfo/${username}.json`)
  const jsonData: Array<any> = JSON.parse(buffer.toString())

  asyncDelete()

  async function asyncDelete() {
    await new Promise<void>((resolve, reject) => {
      // 删除原始照片
      const sceneryImageDir = `public/image/sceneryImage/${username}`
      const originImagesPath = listData.map((imagePath: string) => `${sceneryImageDir}/${imagePath}`)
      for (const file of originImagesPath) {
        fs.unlink(file, err => {
          if (err) throw err
        })
      }
      resolve()
    })
    await new Promise<void>((resolve, reject) => {
      // 删除缩略图
      const thumbnailDir = `public/image/thumbnail/${username}`
      const thumbnailPath = listData.map((imagePath: string) => `${thumbnailDir}/${imagePath}`)
      for (const file of thumbnailPath) {
        fs.unlink(file, err => {
          if (err) throw err
        })
      }
      resolve()
    })
    await new Promise<void>((resolve, reject) => {
      // 删除本地json文件
      for (let i = 0; i < jsonData.length; i++) {
        for (let j = 0; j < jsonData[i].imgs.length; j++) {
          let img = jsonData[i].imgs[j]
          for (let k = 0; k < listData.length; k++) {
            if (img.fn === listData[k]) {
              jsonData[i].imgs.splice(j, 1)
              listData.splice(k, 1)
              --j
            }
          }
        }
        if (jsonData[i].imgs.length === 0) {
          jsonData.splice(i, 1)
          --i
        }
      }
      resolve()
    })
    await new Promise<void>((resolve, reject) => {
      fs.writeFileSync(`public/imageInfo/${username}.json`, JSON.stringify(jsonData))
      res.send("删除成功")
      resolve()
    })
  }
})

app.listen(3000, "192.168.31.250", () => {
  console.log("http://192.168.31.250:3000")
});