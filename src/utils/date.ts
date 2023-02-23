import moment from "moment";
moment.locale("zh-cn"); // 设置语言或moment.lang("zh-cn");

const dateFilter = {
  // 自定义库进行时间格式封装
  getTimeWithoutSpace(value: string | Date, type?: string) {
    if (value.toString().length == 8) { // 长度为8位，形如20220701
      const vstr = value.toString()
      const year = vstr.slice(0, 4)
      const month = vstr.slice(4, 6)
      const date = vstr.slice(6, 8)
      return `${year}年${month}月${date}日`
    } else if (value.toString().length == 6) { // 长度为6位，形如20220701
      const vstr = value.toString()
      const Hour = vstr.slice(0, 2)
      const minute = vstr.slice(2, 4)
      const second = vstr.slice(4, 6)
      return `${Hour}时${minute}分${second}秒`
    }
    const v = new Date(value)
    // 小时大写HH表示为24小时制，hh为12小时制
    if (type == "YYYYMMDDHHmmss") return moment(v).format(type)
    else if (type == "YYYYMMDD") return moment(v).format(type)
    else if (type == "HHmmss") return moment(v).format(type)
    else if (type == "zh_CNYYYYMMDD") { // xxxx年xx月xx日
      const year = v.getFullYear().toString()
      const month = (v.getMonth() + 1).toString().padStart(2, "0")
      const date = v.getDate().toString().padStart(2, "0")
      return `${year}年${month}月${date}日`
    }
  }
}

export default dateFilter