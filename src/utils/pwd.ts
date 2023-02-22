import md5 from "md5"

const salt1: string = "map"
const salt2: string = "gallery"

const cryptPwd = {
  pwdEncryption(pwd: string) {
    return md5(salt1.concat(pwd.concat(salt2)))
  },
  checkPwd(pwd: string, hash: string) {
    return md5(salt1.concat(pwd.concat(salt2))) === hash
  }
}

export default cryptPwd