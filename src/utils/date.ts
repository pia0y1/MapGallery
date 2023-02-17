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
  },
  /**
   *  自定义过滤器对日期进行格式化
   *  日期时间格式，大致可以分为以下四种情况：
   *  1. 年月日：yyyy-M-d
   *  2. 年月日（小于两位数时补0）：yyyy-MM-dd
   *  3. 年月日时分秒：yyyy-M-d H:m:s
   *  4. 年月日时分秒（小于两位时补0）：yyyy-MM-dd HH:mm:ss
  **/
  formatDate(value: string | number | Date, type: string) {
    if (value != "") {
      var dt = new Date(value);
      if (type == 'yyyy-M-d') {// yyyy-M-d
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let date = dt.getDate();
        return `${year}-${month}-${date}`;
      } else if (type == 'yyyy-M-d H:m:s') {// yyyy-M-d H:m:s
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let date = dt.getDate();
        let hour = dt.getHours();
        let minute = dt.getMinutes();
        let second = dt.getSeconds();
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
      } else if (type == 'yyyy-MM-dd') {// yyyy-MM-dd
        let year = dt.getFullYear();
        /**
          * Es2017引入来字符串补全长度的功能，如果某个字符串不够指定长度，会在头部或尾部补全
          * padStart()：用于头部补全，
          * padEnd()：用于尾部补全
          * padStart()和padEnd()共接收两个参数。Eg：padStart(2,0)
          * 参数1：用来指定字符串的最小长度
          * 参数2：用来补全的字符串
          * 备注：如果原字符串的长度等于或大于指定的最小长度，则返回原字符串
          */
        let month = (dt.getMonth() + 1).toString().padStart(2, "0");
        let date = dt.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${date}`;
      } else {// yyyy-MM-dd HH:mm:ss
        let year = dt.getFullYear();
        let month = (dt.getMonth() + 1).toString().padStart(2, "0");
        let date = dt.getDate().toString().padStart(2, "0");
        let hour = dt.getHours().toString().padStart(2, "0");
        let minute = dt.getMinutes().toString().padStart(2, "0");
        let second = dt.getSeconds().toString().padStart(2, "0");
        return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
      }
    } else {
      return "";
    }
  },
  //格式时间，显示格式为：年月日时分秒 星期
  formatDateWeek(date: Date) {
    // 格式化时间为 YYYY-MM-DD HH:MM:SS
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds(); // 判断是不是小于10 返回01 02 03
    function check(num: number) {
      if (num < 10) {
        // 如果数字小于10,前边拼接个0
        return "0" + num;
      } else {
        return num;
      }
    }
    let timeArry = "";
    let timeText = `${check(year)}年${check(month)}月${check(day)}日  ${check(hours)}: ${check(minutes)}: ${check(seconds)}`;
    let nowDay = date.getDay();
    let weeks = new Array(
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    );
    let week = weeks[nowDay];
    let state = ``;
    // 判断当前时间段 //
    if (hours >= 0 && hours <= 10) {
      state = `早上`;
    } else if (hours > 10 && hours <= 14) {
      state = `中午`;
    } else if (hours > 14 && hours <= 18) {
      state = `下午`;
    } else if (hours > 18 && hours <= 24) {
      state = `晚上`;
    }
    timeArry = timeText + " " + week + " " + state;
    return timeArry;
  }
}

export default dateFilter