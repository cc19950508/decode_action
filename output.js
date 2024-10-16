//Wed Oct 16 2024 14:45:40 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("益禾堂"),
  axios = require("axios"),
  axiosRetry = require("axios-retry").default,
  {
    sendNotify
  } = require("./sendNotify"),
  SyncRequest = require("sync-request");
let notifyStr = "";
var ua = "";
(async () => {
  axiosRetry(axios, {
    retries: 3
  });
  const _0x529bfc = checkVersion("yht.js", "e9acfdfaec384af5b75d7cf94f810bfe");
  let _0x5bbf33 = [];
  const _0x13fb19 = process.env.yht_invite_id;
  _0x13fb19 && (_0x5bbf33 = _0x13fb19.split(","));
  logAndNotify("益禾堂 助力码:【" + _0x5bbf33.join("、") + "】");
  _0x529bfc && _0x5bbf33.push(..._0x529bfc.split(","));
  const _0x5e0df5 = process.env.yht_ck,
    _0x1e368f = process.env.yht_showinviteId;
  if (!_0x5e0df5) {
    logAndNotify("请先设置环境变量 yht_ck");
    return;
  }
  const _0x5d38b7 = !!_0x1e368f;
  let _0x214149 = _0x5e0df5.replaceAll("&", "\n").split("\n");
  for (let _0x2767b0 = 0; _0x2767b0 < _0x214149.length; _0x2767b0++) {
    ua = generateUserAgent();
    const _0x572280 = _0x214149[_0x2767b0],
      _0x4d9a12 = await sendGetRequest("https://webapi.qmai.cn/web/catering/crm/personal-info", _0x572280);
    if (!_0x4d9a12.data.status) {
      logAndNotify("账号【" + (_0x2767b0 + 1) + "】 登录失败☹");
      continue;
    }
    logAndNotify("🧐" + _0x4d9a12.data.data.mobilePhone + "🧐");
    const _0x18068f = await sendPostRequest("https://webapi.qmai.cn/web/cmk-center/nurture/takePartInNurture", _0x572280, {
      activityId: "1025694534292430849",
      appid: "wx4080846d0cec2fd5"
    });
    _0x18068f.data.status ? (logAndNotify("账号【" + (_0x2767b0 + 1) + "】 开启种树成功"), logAndNotify("账号【" + (_0x2767b0 + 1) + "】 userId=【" + _0x18068f.data.data.userId + "】")) : logAndNotify("账号【" + (_0x2767b0 + 1) + "】 忽略此提示【" + _0x18068f.data.message + "】");
    const _0x21f165 = await sendPostRequest("https://webapi.qmai.cn/web/cmk-center/task/taskInfo", _0x572280, {
      activityId: "1025694534292430849",
      appid: "wx4080846d0cec2fd5"
    });
    logAndNotify("账号【" + (_0x2767b0 + 1) + "】 被助力次数:【" + _0x21f165.data.data.dailyInviteNum + "】");
    const _0x1e2e83 = await sendPostRequest("https://webapi.qmai.cn/web/cmk-center/nurture/stageInfo", _0x572280, {
      activityId: "1025694534292430849",
      appid: "wx4080846d0cec2fd5"
    });
    let _0x400ae0 = 0;
    if (_0x1e2e83.data.status) {
      const _0x32483c = _0x1e2e83.data.data;
      _0x32483c.level === 3 ? logAndNotify("账号【" + (_0x2767b0 + 1) + "】 当前是【" + _0x32483c.name + "】 可以领取奖励了") : (_0x400ae0 = _0x32483c.upgradeThreshold - _0x32483c.nutrientUsed, logAndNotify("账号【" + (_0x2767b0 + 1) + "】 当前是【" + _0x32483c.name + "】, 再施肥【" + _0x400ae0 + "】次 成为【" + _0x32483c.nextName + "】"));
    }
    const _0x2d9b8f = await sendPostRequest("https://webapi.qmai.cn/web/cmk-center/nurture/activityInfo", _0x572280, {
        activityId: "1025694534292430849",
        appid: "wx4080846d0cec2fd5"
      }),
      _0x98a7df = _0x2d9b8f.data.data.nurtureStageVo;
    logAndNotify("账号【" + (_0x2767b0 + 1) + "】 剩余肥料【" + _0x98a7df.nutrientRemaining + "】");
    _0x400ae0 < _0x98a7df.nutrientRemaining ? logAndNotify("账号【" + (_0x2767b0 + 1) + "】 本次只需要施肥【" + _0x400ae0 + "】次即可完成任务，请及时领取奖励！！！！！！！！！！！！！！！") : _0x400ae0 = _0x98a7df.nutrientRemaining;
    for (let _0x35edad = 0; _0x35edad < _0x400ae0; _0x35edad++) {
      const _0x2b5097 = await sendPostRequest("https://webapi.qmai.cn/web/cmk-center/nurture/add/nutrient", _0x572280, {
        activityId: "1025694534292430849",
        appid: "wx4080846d0cec2fd5"
      });
      _0x2b5097.data.status ? logAndNotify("账号【" + (_0x2767b0 + 1) + "】 施肥【" + (_0x35edad + 1) + "】次成功") : logAndNotify("账号【" + (_0x2767b0 + 1) + "】 施肥【" + (_0x35edad + 1) + "】次失败");
    }
    const _0x167bb4 = new Date().getDay();
    if (_0x167bb4 === 2) {
      const _0x32c469 = await sendPostRequest("https://webapi.qmai.cn/web/cmk-center/receive/takePartInReceive", _0x572280, {
        activityId: "1038508490954362881",
        timestamp: "",
        signature: "",
        qzGtd: "",
        gdtVid: "",
        data: "",
        version: 1,
        appid: "wx4080846d0cec2fd5"
      });
      _0x32c469.data.status ? logAndNotify("账号【" + (_0x2767b0 + 1) + "】 领卷成功") : logAndNotify("账号【" + (_0x2767b0 + 1) + "】 领卷失败，可以忽略: " + _0x32c469.data.message);
    }
    const _0x2d7782 = await sendPostRequest("https://webapi.qmai.cn/web/catering/crm/coupon/list", _0x572280, {
      pageNo: 1,
      pageSize: 1000,
      useStatus: 0,
      appid: "wx4080846d0cec2fd5"
    });
    if (_0x2d7782.data.status) {
      logAndNotify("账号【" + (_0x2767b0 + 1) + "】 优惠卷总数量: " + _0x2d7782.data.data.totalNum);
      for (const _0x3f4ee1 of _0x2d7782.data.data.data) {
        logAndNotify("账号【" + (_0x2767b0 + 1) + "】 优惠卷: " + _0x3f4ee1.title + " 有效期【" + _0x3f4ee1.expireDesc + "】");
      }
    } else {
      logAndNotify("账号【" + (_0x2767b0 + 1) + "】 获取优惠卷失败: " + _0x2d7782.data.message);
    }
    logAndNotify("账号【" + (_0x2767b0 + 1) + "】 开始助力其他人");
    for (const _0x1a8705 of _0x5bbf33) {
      const _0x418c30 = await sendPostRequest("https://webapi.qmai.cn/web/cmk-center/task/userHelp", _0x572280, {
        activityId: "1025694534292430849",
        appid: "wx4080846d0cec2fd5",
        inviteUserId: _0x1a8705
      });
      if (_0x418c30.data.status) {
        _0x5d38b7 ? logAndNotify("账号【" + (_0x2767b0 + 1) + "】 【" + _0x1a8705 + "】 助力成功") : logAndNotify("账号【" + (_0x2767b0 + 1) + "】 助力成功");
      } else {
        _0x5d38b7 ? logAndNotify("账号【" + (_0x2767b0 + 1) + "】 【" + _0x1a8705 + "】 助力失败: " + _0x418c30.data.message) : logAndNotify("账号【" + (_0x2767b0 + 1) + "】 助力失败: " + _0x418c30.data.message);
        if (_0x418c30.data.message === "今日助力次数已达上限") {
          break;
        }
      }
    }
  }
})().catch(_0x303b94 => {
  logAndNotify(_0x303b94);
}).finally(() => {
  pushLog("yht.js", notifyStr);
  sendNotify("益禾堂", notifyStr);
  $.done();
});
async function sendPostRequest(_0x8280a, _0xc5c41f, _0x177518) {
  try {
    await delay(500);
    const _0x27f363 = {
        "Qm-From": "wechat",
        "Qm-From-Type": "catering",
        Referer: "https://servicewechat.com/wx4080846d0cec2fd5/391/page-frame.html",
        "User-Agent": ua
      },
      _0x5d611b = {
        ..._0x27f363,
        ...{
          "Qm-User-Token": _0xc5c41f
        }
      },
      _0x1c6b23 = axios.create({
        headers: _0x5d611b,
        timeout: 60000
      });
    return _0x1c6b23.post(_0x8280a, _0x177518);
  } catch (_0x370391) {
    if (axios.isAxiosError(_0x370391)) {
      if (_0x370391.code === "ECONNABORTED" && _0x370391.message.includes("timeout")) {
        console.error("请求超时：", _0x370391.message);
      } else {
        console.error("其他错误：", _0x370391.message);
      }
    } else {
      console.error("未知错误：", _0x370391);
    }
    throw _0x370391;
  }
}
async function sendGetRequest(_0x51eee3, _0x3ae25a) {
  try {
    await delay(500);
    const _0x3119a7 = {
        "Qm-From": "wechat",
        "Qm-From-Type": "catering",
        Referer: "https://servicewechat.com/wx4080846d0cec2fd5/391/page-frame.html",
        "User-Agent": ua
      },
      _0x1075b2 = {
        ..._0x3119a7,
        ...{
          "Qm-User-Token": _0x3ae25a
        }
      },
      _0x2ccfa9 = axios.create({
        headers: _0x1075b2,
        timeout: 60000
      });
    return _0x2ccfa9.get(_0x51eee3);
  } catch (_0x577ee5) {
    if (axios.isAxiosError(_0x577ee5)) {
      if (_0x577ee5.code === "ECONNABORTED" && _0x577ee5.message.includes("timeout")) {
        console.error("请求超时：", _0x577ee5.message);
      } else {
        console.error("其他错误：", _0x577ee5.message);
      }
    } else {
      console.error("未知错误：", _0x577ee5);
    }
    throw _0x577ee5;
  }
}
function logAndNotify(_0x57aaf4) {
  $.log(_0x57aaf4);
  notifyStr += _0x57aaf4;
  notifyStr += "\n";
}
function delay(_0x2694e9) {
  return new Promise(_0x405505 => setTimeout(_0x405505, _0x2694e9));
}
function Env(_0x2df548, _0x66a0f2) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0xeea377 {
    constructor(_0x467687) {
      this.env = _0x467687;
    }
    send(_0x3f6ace, _0x10248e = "GET") {
      _0x3f6ace = "string" == typeof _0x3f6ace ? {
        url: _0x3f6ace
      } : _0x3f6ace;
      let _0x452a25 = this.get;
      "POST" === _0x10248e && (_0x452a25 = this.post);
      return new Promise((_0x5d8ae9, _0x37661b) => {
        _0x452a25.call(this, _0x3f6ace, (_0xb64601, _0x1c94e0, _0x107d6a) => {
          _0xb64601 ? _0x37661b(_0xb64601) : _0x5d8ae9(_0x1c94e0);
        });
      });
    }
    get(_0x21452c) {
      return this.send.call(this.env, _0x21452c);
    }
    post(_0x459c31) {
      return this.send.call(this.env, _0x459c31, "POST");
    }
  }
  return new class {
    constructor(_0xb54317, _0x153724) {
      this.name = _0xb54317;
      this.http = new _0xeea377(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x153724);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(_0x53d314, _0x4c5acb = null) {
      try {
        return JSON.parse(_0x53d314);
      } catch {
        return _0x4c5acb;
      }
    }
    toStr(_0x3e9f82, _0x41591c = null) {
      try {
        return JSON.stringify(_0x3e9f82);
      } catch {
        return _0x41591c;
      }
    }
    getjson(_0x1b8372, _0x46dcd3) {
      let _0x5d30fc = _0x46dcd3;
      const _0x4571a5 = this.getdata(_0x1b8372);
      if (_0x4571a5) {
        try {
          _0x5d30fc = JSON.parse(this.getdata(_0x1b8372));
        } catch {}
      }
      return _0x5d30fc;
    }
    setjson(_0x1bc279, _0x2d5994) {
      try {
        return this.setdata(JSON.stringify(_0x1bc279), _0x2d5994);
      } catch {
        return !1;
      }
    }
    getScript(_0x2c1e9f) {
      return new Promise(_0x156cad => {
        this.get({
          url: _0x2c1e9f
        }, (_0x57d8aa, _0x5755ba, _0x4dabc5) => _0x156cad(_0x4dabc5));
      });
    }
    runScript(_0x433da6, _0x1a451b) {
      return new Promise(_0x3b1d90 => {
        let _0xababbc = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0xababbc = _0xababbc ? _0xababbc.replace(/\n/g, "").trim() : _0xababbc;
        let _0x24c693 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x24c693 = _0x24c693 ? 1 * _0x24c693 : 20;
        _0x24c693 = _0x1a451b && _0x1a451b.timeout ? _0x1a451b.timeout : _0x24c693;
        const [_0x2ef06d, _0x11f0b5] = _0xababbc.split("@"),
          _0x2da48c = {
            url: "http://" + _0x11f0b5 + "/v1/scripting/evaluate",
            body: {
              script_text: _0x433da6,
              mock_type: "cron",
              timeout: _0x24c693
            },
            headers: {
              "X-Key": _0x2ef06d,
              Accept: "*/*"
            }
          };
        this.post(_0x2da48c, (_0x7a82bf, _0x17935c, _0x22ecac) => _0x3b1d90(_0x22ecac));
      }).catch(_0x2da90e => this.logErr(_0x2da90e));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x280df7 = this.path.resolve(this.dataFile),
          _0x5cf2eb = this.path.resolve(process.cwd(), this.dataFile),
          _0xcde6a5 = this.fs.existsSync(_0x280df7),
          _0x404879 = !_0xcde6a5 && this.fs.existsSync(_0x5cf2eb);
        if (!_0xcde6a5 && !_0x404879) {
          return {};
        }
        {
          const _0x4ede8c = _0xcde6a5 ? _0x280df7 : _0x5cf2eb;
          try {
            return JSON.parse(this.fs.readFileSync(_0x4ede8c));
          } catch (_0x423775) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x3b901c = this.path.resolve(this.dataFile),
          _0x53a018 = this.path.resolve(process.cwd(), this.dataFile),
          _0x5759a4 = this.fs.existsSync(_0x3b901c),
          _0x227bf4 = !_0x5759a4 && this.fs.existsSync(_0x53a018),
          _0x544c18 = JSON.stringify(this.data);
        _0x5759a4 ? this.fs.writeFileSync(_0x3b901c, _0x544c18) : _0x227bf4 ? this.fs.writeFileSync(_0x53a018, _0x544c18) : this.fs.writeFileSync(_0x3b901c, _0x544c18);
      }
    }
    lodash_get(_0x406021, _0x22450a, _0x2dc83c) {
      const _0x152e2b = _0x22450a.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x38b0f2 = _0x406021;
      for (const _0xe62214 of _0x152e2b) if (_0x38b0f2 = Object(_0x38b0f2)[_0xe62214], void 0 === _0x38b0f2) {
        return _0x2dc83c;
      }
      return _0x38b0f2;
    }
    lodash_set(_0x9fd100, _0x72799b, _0x1aff6a) {
      return Object(_0x9fd100) !== _0x9fd100 ? _0x9fd100 : (Array.isArray(_0x72799b) || (_0x72799b = _0x72799b.toString().match(/[^.[\]]+/g) || []), _0x72799b.slice(0, -1).reduce((_0x554161, _0xd7c2cb, _0x57ec4f) => Object(_0x554161[_0xd7c2cb]) === _0x554161[_0xd7c2cb] ? _0x554161[_0xd7c2cb] : _0x554161[_0xd7c2cb] = Math.abs(_0x72799b[_0x57ec4f + 1]) >> 0 == +_0x72799b[_0x57ec4f + 1] ? [] : {}, _0x9fd100)[_0x72799b[_0x72799b.length - 1]] = _0x1aff6a, _0x9fd100);
    }
    getdata(_0x1b13d5) {
      let _0x491429 = this.getval(_0x1b13d5);
      if (/^@/.test(_0x1b13d5)) {
        const [, _0x2e8c29, _0x1991bb] = /^@(.*?)\.(.*?)$/.exec(_0x1b13d5),
          _0x3a17f5 = _0x2e8c29 ? this.getval(_0x2e8c29) : "";
        if (_0x3a17f5) {
          try {
            const _0x14ab3a = JSON.parse(_0x3a17f5);
            _0x491429 = _0x14ab3a ? this.lodash_get(_0x14ab3a, _0x1991bb, "") : _0x491429;
          } catch (_0x9b5cef) {
            _0x491429 = "";
          }
        }
      }
      return _0x491429;
    }
    setdata(_0x131025, _0x34d8c5) {
      let _0x469c8d = !1;
      if (/^@/.test(_0x34d8c5)) {
        const [, _0x1bde5d, _0x257049] = /^@(.*?)\.(.*?)$/.exec(_0x34d8c5),
          _0x485271 = this.getval(_0x1bde5d),
          _0xf5899c = _0x1bde5d ? "null" === _0x485271 ? null : _0x485271 || "{}" : "{}";
        try {
          const _0x466ac9 = JSON.parse(_0xf5899c);
          this.lodash_set(_0x466ac9, _0x257049, _0x131025);
          _0x469c8d = this.setval(JSON.stringify(_0x466ac9), _0x1bde5d);
        } catch (_0x29ba5f) {
          const _0x4d9a37 = {};
          this.lodash_set(_0x4d9a37, _0x257049, _0x131025);
          _0x469c8d = this.setval(JSON.stringify(_0x4d9a37), _0x1bde5d);
        }
      } else {
        _0x469c8d = this.setval(_0x131025, _0x34d8c5);
      }
      return _0x469c8d;
    }
    getval(_0x177873) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x177873) : this.isQuanX() ? $prefs.valueForKey(_0x177873) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x177873]) : this.data && this.data[_0x177873] || null;
    }
    setval(_0x54eb36, _0x3b4cf3) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x54eb36, _0x3b4cf3) : this.isQuanX() ? $prefs.setValueForKey(_0x54eb36, _0x3b4cf3) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x3b4cf3] = _0x54eb36, this.writedata(), !0) : this.data && this.data[_0x3b4cf3] || null;
    }
    initGotEnv(_0x112599) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x112599 && (_0x112599.headers = _0x112599.headers ? _0x112599.headers : {}, void 0 === _0x112599.headers.Cookie && void 0 === _0x112599.cookieJar && (_0x112599.cookieJar = this.ckjar));
    }
    get(_0x37c954, _0x1f5872 = () => {}) {
      _0x37c954.headers && (delete _0x37c954.headers["Content-Type"], delete _0x37c954.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x37c954.headers = _0x37c954.headers || {}, Object.assign(_0x37c954.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x37c954, (_0x544eee, _0x38026b, _0x6a0c68) => {
        !_0x544eee && _0x38026b && (_0x38026b.body = _0x6a0c68, _0x38026b.statusCode = _0x38026b.status);
        _0x1f5872(_0x544eee, _0x38026b, _0x6a0c68);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x37c954.opts = _0x37c954.opts || {}, Object.assign(_0x37c954.opts, {
        hints: !1
      })), $task.fetch(_0x37c954).then(_0x3114a4 => {
        const {
          statusCode: _0x1e874b,
          statusCode: _0x235374,
          headers: _0xaf3607,
          body: _0x131b5a
        } = _0x3114a4;
        _0x1f5872(null, {
          status: _0x1e874b,
          statusCode: _0x235374,
          headers: _0xaf3607,
          body: _0x131b5a
        }, _0x131b5a);
      }, _0x8eee19 => _0x1f5872(_0x8eee19))) : this.isNode() && (this.initGotEnv(_0x37c954), this.got(_0x37c954).on("redirect", (_0x2061b9, _0x416d5a) => {
        try {
          if (_0x2061b9.headers["set-cookie"]) {
            const _0x257a06 = _0x2061b9.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x257a06 && this.ckjar.setCookieSync(_0x257a06, null);
            _0x416d5a.cookieJar = this.ckjar;
          }
        } catch (_0x575ad1) {
          this.logErr(_0x575ad1);
        }
      }).then(_0x4e0fc5 => {
        const {
          statusCode: _0x398a81,
          statusCode: _0x2f765f,
          headers: _0x28ec0e,
          body: _0x46c1e6
        } = _0x4e0fc5;
        _0x1f5872(null, {
          status: _0x398a81,
          statusCode: _0x2f765f,
          headers: _0x28ec0e,
          body: _0x46c1e6
        }, _0x46c1e6);
      }, _0xc1be12 => {
        const {
          message: _0x38cc65,
          response: _0x2a5fb9
        } = _0xc1be12;
        _0x1f5872(_0x38cc65, _0x2a5fb9, _0x2a5fb9 && _0x2a5fb9.body);
      }));
    }
    post(_0x7e691f, _0x5f6302 = () => {}) {
      if (_0x7e691f.body && _0x7e691f.headers && !_0x7e691f.headers["Content-Type"] && (_0x7e691f.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x7e691f.headers && delete _0x7e691f.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (_0x7e691f.headers = _0x7e691f.headers || {}, Object.assign(_0x7e691f.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(_0x7e691f, (_0x185d8f, _0x528434, _0x4bb8ce) => {
          !_0x185d8f && _0x528434 && (_0x528434.body = _0x4bb8ce, _0x528434.statusCode = _0x528434.status);
          _0x5f6302(_0x185d8f, _0x528434, _0x4bb8ce);
        });
      } else {
        if (this.isQuanX()) {
          _0x7e691f.method = "POST";
          this.isNeedRewrite && (_0x7e691f.opts = _0x7e691f.opts || {}, Object.assign(_0x7e691f.opts, {
            hints: !1
          }));
          $task.fetch(_0x7e691f).then(_0x96c537 => {
            const {
              statusCode: _0x4471e3,
              statusCode: _0x29d9c6,
              headers: _0x1ee6e0,
              body: _0x1f8f43
            } = _0x96c537;
            _0x5f6302(null, {
              status: _0x4471e3,
              statusCode: _0x29d9c6,
              headers: _0x1ee6e0,
              body: _0x1f8f43
            }, _0x1f8f43);
          }, _0x57c507 => _0x5f6302(_0x57c507));
        } else {
          if (this.isNode()) {
            this.initGotEnv(_0x7e691f);
            const {
              url: _0x1ebb8c,
              ..._0x5c77af
            } = _0x7e691f;
            this.got.post(_0x1ebb8c, _0x5c77af).then(_0x5c6a49 => {
              const {
                statusCode: _0x57b548,
                statusCode: _0x13eadc,
                headers: _0x287f8d,
                body: _0x5e960c
              } = _0x5c6a49;
              _0x5f6302(null, {
                status: _0x57b548,
                statusCode: _0x13eadc,
                headers: _0x287f8d,
                body: _0x5e960c
              }, _0x5e960c);
            }, _0x110334 => {
              const {
                message: _0x2f7596,
                response: _0x43500a
              } = _0x110334;
              _0x5f6302(_0x2f7596, _0x43500a, _0x43500a && _0x43500a.body);
            });
          }
        }
      }
    }
    time(_0xec4cf4, _0x5b18e7 = null) {
      const _0x18ad4f = _0x5b18e7 ? new Date(_0x5b18e7) : new Date();
      let _0x591f74 = {
        "M+": _0x18ad4f.getMonth() + 1,
        "d+": _0x18ad4f.getDate(),
        "H+": _0x18ad4f.getHours(),
        "m+": _0x18ad4f.getMinutes(),
        "s+": _0x18ad4f.getSeconds(),
        "q+": Math.floor((_0x18ad4f.getMonth() + 3) / 3),
        S: _0x18ad4f.getMilliseconds()
      };
      /(y+)/.test(_0xec4cf4) && (_0xec4cf4 = _0xec4cf4.replace(RegExp.$1, (_0x18ad4f.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x22b691 in _0x591f74) new RegExp("(" + _0x22b691 + ")").test(_0xec4cf4) && (_0xec4cf4 = _0xec4cf4.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x591f74[_0x22b691] : ("00" + _0x591f74[_0x22b691]).substr(("" + _0x591f74[_0x22b691]).length)));
      return _0xec4cf4;
    }
    msg(_0x17478f = _0x2df548, _0x4347e4 = "", _0x38757e = "", _0x5f41f7) {
      const _0x25b367 = _0x4f02c6 => {
        if (!_0x4f02c6) {
          return _0x4f02c6;
        }
        if ("string" == typeof _0x4f02c6) {
          return this.isLoon() ? _0x4f02c6 : this.isQuanX() ? {
            "open-url": _0x4f02c6
          } : this.isSurge() ? {
            url: _0x4f02c6
          } : void 0;
        }
        if ("object" == typeof _0x4f02c6) {
          if (this.isLoon()) {
            let _0x4b0d54 = _0x4f02c6.openUrl || _0x4f02c6.url || _0x4f02c6["open-url"],
              _0x1fd23f = _0x4f02c6.mediaUrl || _0x4f02c6["media-url"];
            return {
              openUrl: _0x4b0d54,
              mediaUrl: _0x1fd23f
            };
          }
          if (this.isQuanX()) {
            let _0x336c90 = _0x4f02c6["open-url"] || _0x4f02c6.url || _0x4f02c6.openUrl,
              _0x1139a0 = _0x4f02c6["media-url"] || _0x4f02c6.mediaUrl;
            return {
              "open-url": _0x336c90,
              "media-url": _0x1139a0
            };
          }
          if (this.isSurge()) {
            let _0x231701 = _0x4f02c6.url || _0x4f02c6.openUrl || _0x4f02c6["open-url"];
            return {
              url: _0x231701
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x17478f, _0x4347e4, _0x38757e, _0x25b367(_0x5f41f7)) : this.isQuanX() && $notify(_0x17478f, _0x4347e4, _0x38757e, _0x25b367(_0x5f41f7))), !this.isMuteLog) {
        let _0x5263c4 = ["", "==============📣系统通知📣=============="];
        _0x5263c4.push(_0x17478f);
        _0x4347e4 && _0x5263c4.push(_0x4347e4);
        _0x38757e && _0x5263c4.push(_0x38757e);
        console.log(_0x5263c4.join("\n"));
        this.logs = this.logs.concat(_0x5263c4);
      }
    }
    log(..._0xf63528) {
      _0xf63528.length > 0 && (this.logs = [...this.logs, ..._0xf63528]);
      console.log(_0xf63528.join(this.logSeparator));
    }
    logErr(_0x300a82, _0x1dacf1) {
      const _0x8930b6 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x8930b6 ? this.log("", "❗️" + this.name + ", 错误!", _0x300a82.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x300a82);
    }
    wait(_0x2ee1cb) {
      return new Promise(_0x12af3b => setTimeout(_0x12af3b, _0x2ee1cb));
    }
    done(_0x4c5763 = {}) {
      const _0x236ab9 = new Date().getTime(),
        _0x46c3af = (_0x236ab9 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x46c3af + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x4c5763);
    }
  }(_0x2df548, _0x66a0f2);
}
function checkVersion(_0x320c0c, _0x4438d6) {
  try {
    logAndNotify("文件md5：" + _0x4438d6);
    const _0x3ba33c = SyncRequest("GET", "https://checktoke.filegear-sg.me/api/update/check?fileName=" + _0x320c0c + "&fileMd5=" + _0x4438d6),
      _0x5daf9e = JSON.parse(_0x3ba33c.getBody("utf8"));
    if (_0x5daf9e.code === 301) {
      process.exit(0);
    } else {
      logAndNotify(_0x5daf9e.data);
    }
    if (_0x5daf9e.data2 && _0x5daf9e.data2.inviteData) {
      return _0x5daf9e.data2.inviteData;
    }
  } catch (_0x279d19) {
    logAndNotify("版本检查失败:", _0x279d19);
  }
}
function generateUserAgent() {
  return "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/" + Math.floor(Math.random() * 8 + 7) + "." + Math.floor(Math.random() * 10) + "." + (Math.floor(Math.random() * 10000) + 10000) + " NetType/WIFI Language/zh_CN";
}
function pushLog(_0x49f6cb, _0xf237f6) {
  try {
    const _0x2040d2 = "fileName=" + encodeURIComponent(_0x49f6cb) + "&log=" + encodeURIComponent(_0xf237f6);
    SyncRequest("POST", "https://checktoke.filegear-sg.me/api/update/pushLog", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: _0x2040d2
    });
  } catch (_0x1cf0d7) {}
}