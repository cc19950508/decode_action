//Sat Sep 14 2024 18:11:31 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("星播客抽奖"),
  axios = require("axios");
let request = require("request");
request = request.defaults({
  "jar": true
});
const {
    log
  } = console,
  debug = 0;
let xbkhd = ($.isNode() ? process.env.xbkhd : $.getdata("xbkhd")) || "",
  xbkhdArr = [],
  data = "";
!(async () => {
  if (typeof $request !== "undefined") await GetRewrite();else {
    if (!(await Envs())) return;else {
      log("\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：" + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toLocaleString() + " \n=============================================\n");
      log("\n============ 微信小程序：柠檬玩机 ============");
      log("\n=================== 共找到 " + xbkhdArr.length + " 个账号 ===================");
      debug && log("【debug】 这是你的全部账号数组:\n " + xbkhdArr);
      for (let _0x33b1e7 = 0; _0x33b1e7 < xbkhdArr.length; _0x33b1e7++) {
        let _0x57e18d = _0x33b1e7 + 1;
        addNotifyStr("\n==== 开始【第 " + _0x57e18d + " 个账号】====\n", true);
        xbkhd = xbkhdArr[_0x33b1e7];
        xbktoken = xbkhd.split("&")[0];
        xbkphone = xbkhd.split("&")[1];
        await checknm();
        if (nmwj == "微信小程序：柠檬玩机") {
          log("==检测直播间抽奖==");
          await checkins(1);
          log("==检测直播间抽奖页面1==");
          await checkins(2);
          log("==预约抽奖==");
          await checkin(1);
          log("==预约抽奖页面1==");
          await checkin(2);
          log("==查询==");
          await getMyWinList();
        } else {
          if (nmwj !== "微信小程序：柠檬玩机") {
            log(nmwj);
            return;
          }
        }
      }
    }
  }
})().catch(_0x329c68 => log(_0x329c68)).finally(() => $.done());
async function checkin(_0x5a0af1) {
  return new Promise(_0x4b05b0 => {
    var _0x5c07d0 = {
      "method": "GET",
      "url": "https://xbk.189.cn/xbkapi/api/room/index/floor?provinceCode=01&pageType=1&page=" + _0x5a0af1 + "&khd=1",
      "headers": {
        "Host": "xbk.189.cn",
        "Connection": "keep-alive",
        "request-startTimes": "2023-03-07 15:29:58",
        "request-startTime": "1678174198406",
        "Authorization": xbktoken,
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF",
        "Referer": "https://xbk.189.cn/xbk/newHome?tab=1&l=ticketerror&version=9.3.3&errorticket=183ea7e425377de9f2a2f862557b32d45ff4211a48f70aa4ec4c3decc1d47ebfdbb54391b548e7cf0b817414b7a9f04634fad1e79f4a1e12cecc94b0037fe5c55556f282b7e25d1f967126db75d37b695062d31b46a56658ecaefec6b2fa30c6&loginType=1",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate"
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x5c07d0)));
    axios.request(_0x5c07d0).then(async function (_0x87d0f6) {
      try {
        data = _0x87d0f6.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x87d0f6.data)));
        if (data.code == 0) {
          list = data.data;
          for (i in list) {
            if (list[i].liveType == 1 && list[i].isReserve == 0) {
              log(list[i].nickname);
              liveId = list[i].liveId;
              period = list[i].period;
              await reserve(liveId, period);
              await $.wait(5000);
              await equityExchangeCaptcha();
              await lottery(liveId, period);
            }
          }
        }
      } catch (_0xa8e83e) {
        log("异常：" + JSON.stringify(_0x87d0f6.data) + "，原因：" + data.message);
      }
    }).catch(function (_0x51e03c) {
      console.error(_0x51e03c);
    }).then(_0xb1c7ce => {
      _0x4b05b0();
    });
  });
}
async function checkins(_0x3f53c3) {
  return new Promise(_0x21bcb1 => {
    var _0x498c07 = {
      "method": "GET",
      "url": "https://xbk.189.cn/xbkapi/api/room/index/floor?provinceCode=01&pageType=1&page=" + _0x3f53c3 + "&khd=1",
      "headers": {
        "Host": "xbk.189.cn",
        "Connection": "keep-alive",
        "request-startTimes": "2023-03-07 15:29:58",
        "request-startTime": "1678174198406",
        "Authorization": xbktoken,
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF",
        "Referer": "https://xbk.189.cn/xbk/newHome?tab=1&l=ticketerror&version=9.3.3&errorticket=183ea7e425377de9f2a2f862557b32d45ff4211a48f70aa4ec4c3decc1d47ebfdbb54391b548e7cf0b817414b7a9f04634fad1e79f4a1e12cecc94b0037fe5c55556f282b7e25d1f967126db75d37b695062d31b46a56658ecaefec6b2fa30c6&loginType=1",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate"
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x498c07)));
    axios.request(_0x498c07).then(async function (_0xe512eb) {
      try {
        data = _0xe512eb.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0xe512eb.data)));
        if (data.code == 0) {
          list = data.data;
          for (i in list) {
            if (list[i].goodsCount > 0) {
              nickname = list[i].nickname;
              liveId = list[i].liveId;
              period = list[i].period;
              await getLiveGoodsList(liveId);
              await $.wait(5000);
            }
          }
        }
      } catch (_0x4e98b1) {
        log("异常：" + JSON.stringify(_0xe512eb.data) + "，原因：" + data.message);
      }
    }).catch(function (_0x1b74d7) {
      console.error(_0x1b74d7);
    }).then(_0xcf0871 => {
      _0x21bcb1();
    });
  });
}
async function reserve(_0x29fe57, _0x54c9e0) {
  return new Promise(_0x4e6476 => {
    var _0x5b58ce = {
      "method": "POST",
      "url": "https://xbk.189.cn/xbkapi/api/room/index/reserve",
      "headers": {
        "Host": "xbk.189.cn",
        "Connection": "keep-alive",
        "request-startTimes": "2023-03-07 15:29:58",
        "request-startTime": "1678174198406",
        "Authorization": xbktoken,
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF",
        "Referer": "https://xbk.189.cn/xbk/newHome?tab=1&l=ticketerror&version=9.3.3&errorticket=183ea7e425377de9f2a2f862557b32d45ff4211a48f70aa4ec4c3decc1d47ebfdbb54391b548e7cf0b817414b7a9f04634fad1e79f4a1e12cecc94b0037fe5c55556f282b7e25d1f967126db75d37b695062d31b46a56658ecaefec6b2fa30c6&loginType=1",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate"
      },
      "data": {
        "liveId": _0x29fe57,
        "period": _0x54c9e0,
        "account": xbkphone,
        "khd": 1
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x5b58ce)));
    axios.request(_0x5b58ce).then(async function (_0x2fb075) {
      try {
        data = _0x2fb075.data;
        if (debug) {
          log("\n\n【debug】===============这是 返回data==============");
          log(JSON.stringify(_0x2fb075.data));
        }
        if (data.code == 0) log("预约抽奖：" + data.msg);else log("预约抽奖：" + data.msg);
      } catch (_0x19fe6f) {}
    }).catch(function (_0x59af65) {
      console.error(_0x59af65);
    }).then(_0x8d16f6 => {
      _0x4e6476();
    });
  });
}
async function checknm() {
  return new Promise(_0x354901 => {
    var _0x192adb = {
      "method": "GET",
      "url": "http://129.150.41.146/xbk1.json",
      "headers": {}
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x192adb)));
    axios.request(_0x192adb).then(async function (_0x5056bb) {
      try {
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x5056bb.data)));
        nmwj = _0x5056bb.data.nmwj;
      } catch (_0x4767ab) {
        log("异常：" + data + "，原因：" + data);
      }
    }).catch(function (_0x55e567) {
      console.error(_0x55e567);
    }).then(_0x39a606 => {
      _0x354901();
    });
  });
}
async function equityExchangeCaptcha() {
  return new Promise(_0x20362d => {
    var _0x152efe = {
      "method": "GET",
      "url": "http://wj2.f3322.net:8856",
      "headers": {}
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x152efe)));
    axios.request(_0x152efe).then(async function (_0x3e8fac) {
      try {
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x3e8fac.data)));
        pic = _0x3e8fac.data;
        if (pic !== "") await Captcha();else log("验证码获取失败");
      } catch (_0x2ecff9) {
        log("异常：" + data + "，原因：" + data);
      }
    }).catch(function (_0x5e97f5) {
      console.error(_0x5e97f5);
    }).then(_0x206d9f => {
      _0x20362d();
    });
  });
}
async function Captcha() {
  return new Promise(_0x50f20f => {
    var _0x5f41eb = {
      "method": "POST",
      "url": "http://wj2.f3322.net:6688/identify_GeneralCAPTCHA",
      "headers": {
        "accept": "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Host": "wj2.f3322.net:6688",
        "Origin": "http://wj2.f3322.net:6688",
        "Referer": "http://wj2.f3322.net:6688/docs"
      },
      "data": {
        "ImageBase64": pic
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x5f41eb)));
    axios.request(_0x5f41eb).then(async function (_0x1a7e6e) {
      try {
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x1a7e6e.data)));
        words = _0x1a7e6e.data.result;
        log("验证码：" + words);
      } catch (_0x119737) {
        log("异常：" + data + "，原因：" + data);
      }
    }).catch(function (_0x36d0c4) {
      console.error(_0x36d0c4);
    }).then(_0x375085 => {
      _0x50f20f();
    });
  });
}
async function lottery(_0x350d74, _0x2fc056) {
  return new Promise(_0x14f263 => {
    var _0x377144 = {
      "method": "POST",
      "url": "https://xbk.189.cn/xbkapi/active/v2/lottery/do",
      "headers": {
        "Host": "xbk.189.cn",
        "Connection": "keep-alive",
        "request-startTimes": "2023-03-07 15:29:58",
        "request-startTime": "1678174198406",
        "Authorization": xbktoken,
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF",
        "Referer": "https://xbk.189.cn/xbk/newHome?tab=1&l=ticketerror&version=9.3.3&errorticket=183ea7e425377de9f2a2f862557b32d45ff4211a48f70aa4ec4c3decc1d47ebfdbb54391b548e7cf0b817414b7a9f04634fad1e79f4a1e12cecc94b0037fe5c55556f282b7e25d1f967126db75d37b695062d31b46a56658ecaefec6b2fa30c6&loginType=1",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate"
      },
      "data": {
        "active_code": "20210430YmBxyGy78LRnLCVDf3",
        "captcha": words,
        "guid": "161cee0d-b70d-4246-b0f2-a7fd2ab35342",
        "liveId": _0x350d74,
        "period": _0x2fc056
      }
    };
    debug && log("\n【debug】=============== 这是  请求 url ===============");
    axios.request(_0x377144).then(async function (_0x3eed9c) {
      try {
        data = _0x3eed9c.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x3eed9c.data)));
        data.code == 9999 && log("抽奖：" + data.data.prize_id);
        data.code == 9005 && log("抽奖：" + data.msg);
        data.code == 0 && log("抽奖：" + data.msg);
        data.code == -2002 && log("抽奖：" + data.msg);
      } catch (_0x1676b5) {
        log("异常：" + JSON.stringify(_0x3eed9c.data) + "，原因：" + data.message);
      }
    }).catch(function (_0x3b816d) {
      console.error(_0x3b816d);
    }).then(_0x443734 => {
      _0x14f263();
    });
  });
}
async function getLiveGoodsList(_0x402c5c) {
  return new Promise(_0x7ab677 => {
    var _0xced853 = {
      "method": "GET",
      "url": "https://xbk.189.cn/xbkapi/lteration/room/getLiveGoodsList?liveId=" + _0x402c5c + "&list_type=ordinary&page=1",
      "headers": {
        "Host": "xbk.189.cn",
        "Connection": "keep-alive",
        "request-startTimes": "2023-03-07 15:29:58",
        "request-startTime": "1678174198406",
        "Authorization": xbktoken,
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF",
        "Referer": "https://xbk.189.cn/xbk/newHome?tab=1&l=ticketerror&version=9.3.3&errorticket=183ea7e425377de9f2a2f862557b32d45ff4211a48f70aa4ec4c3decc1d47ebfdbb54391b548e7cf0b817414b7a9f04634fad1e79f4a1e12cecc94b0037fe5c55556f282b7e25d1f967126db75d37b695062d31b46a56658ecaefec6b2fa30c6&loginType=1",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate"
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0xced853)));
    axios.request(_0xced853).then(async function (_0x32bf8e) {
      try {
        data = _0x32bf8e.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x32bf8e.data)));
        if (data.code == 0) {
          goodlist = data.data.list;
          for (i in goodlist) {
            if (goodlist[i].title == "幸运大转盘") {
              log(nickname);
              await equityExchangeCaptcha();
              active_code = goodlist[i].activeCode;
              log(active_code);
              await lotterys(liveId, period, active_code);
            }
            if (goodlist[i].title == "直播转盘") {
              log(nickname);
              await equityExchangeCaptcha();
              active_code = goodlist[i].activeCode;
              log(active_code);
              await lotterys(liveId, period, active_code);
            }
          }
        }
      } catch (_0x50c0b1) {
        log("异常：" + JSON.stringify(_0x32bf8e.data) + "，原因：" + data.message);
      }
    }).catch(function (_0x4d28ab) {
      console.error(_0x4d28ab);
    }).then(_0x480a46 => {
      _0x7ab677();
    });
  });
}
async function lotterys(_0x36dbb2, _0x4db69a, _0x130d1c) {
  return new Promise(_0xec6905 => {
    var _0x2ac6db = {
      "method": "POST",
      "url": "https://xbk.189.cn/xbkapi/active/v2/lottery/do",
      "headers": {
        "Host": "xbk.189.cn",
        "Connection": "keep-alive",
        "request-startTimes": "2023-03-07 15:29:58",
        "request-startTime": "1678174198406",
        "Authorization": xbktoken,
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF",
        "Referer": "https://xbk.189.cn/xbk/newHome?tab=1&l=ticketerror&version=9.3.3&errorticket=183ea7e425377de9f2a2f862557b32d45ff4211a48f70aa4ec4c3decc1d47ebfdbb54391b548e7cf0b817414b7a9f04634fad1e79f4a1e12cecc94b0037fe5c55556f282b7e25d1f967126db75d37b695062d31b46a56658ecaefec6b2fa30c6&loginType=1",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate"
      },
      "data": {
        "active_code": _0x130d1c,
        "captcha": words,
        "guid": "161cee0d-b70d-4246-b0f2-a7fd2ab35342",
        "liveId": _0x36dbb2,
        "period": _0x4db69a
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x2ac6db)));
    axios.request(_0x2ac6db).then(async function (_0x2ca984) {
      try {
        data = _0x2ca984.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x2ca984.data)));
        data.code == 9999 && log("抽奖：" + data.data.prize_id);
        data.code == 9005 && log("抽奖：" + data.msg);
        data.code == 0 && log("抽奖：" + data.msg);
        data.code == -2002 && log("抽奖：" + data.msg);
      } catch (_0x2e4b7b) {
        log("异常：" + JSON.stringify(_0x2ca984.data) + "，原因：" + data.message);
      }
    }).catch(function (_0x20da7b) {
      console.error(_0x20da7b);
    }).then(_0x18a783 => {
      _0xec6905();
    });
  });
}
async function getMyWinList() {
  return new Promise(_0xc96ce5 => {
    var _0x344c88 = {
      "method": "GET",
      "url": "https://xbk.189.cn/xbkapi/active/v2/lottery/getMyWinList?page=1&give_status=1&activeCode=",
      "headers": {
        "Host": "xbk.189.cn",
        "Connection": "keep-alive",
        "request-startTimes": "2023-03-07 15:29:58",
        "request-startTime": "1678174198406",
        "Authorization": xbktoken,
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF",
        "Referer": "https://xbk.189.cn/xbk/newHome?tab=1&l=ticketerror&version=9.3.3&errorticket=183ea7e425377de9f2a2f862557b32d45ff4211a48f70aa4ec4c3decc1d47ebfdbb54391b548e7cf0b817414b7a9f04634fad1e79f4a1e12cecc94b0037fe5c55556f282b7e25d1f967126db75d37b695062d31b46a56658ecaefec6b2fa30c6&loginType=1",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate"
      }
    };
    debug && (log("\n【debug】=============== 这是  请求 url ==============="), log(JSON.stringify(_0x344c88)));
    axios.request(_0x344c88).then(async function (_0x264ec6) {
      try {
        data = _0x264ec6.data;
        debug && (log("\n\n【debug】===============这是 返回data=============="), log(JSON.stringify(_0x264ec6.data)));
        if (data.code == 0) log("查询：" + JSON.stringify(_0x264ec6.data));else log("查询：" + data.msg);
      } catch (_0x3bd9f2) {
        log("异常：" + data + "，原因：" + data.message);
      }
    }).catch(function (_0x2bad6f) {
      console.error(_0x2bad6f);
    }).then(_0x4c3ccf => {
      _0xc96ce5();
    });
  });
}