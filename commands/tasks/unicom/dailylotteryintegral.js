
var dailylotteryintegral = {
  encryptmobile: async (axios, options) => {
    const useragent = `Mozilla/5.0 (Linux; Android 7.1.2; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36; unicom{version:android@8.0200,desmobile:${options.user}};devicetype{deviceBrand:samsung,deviceModel:SM-G977N};{yw_code:}    `
    let res = await axios.request({
      baseURL: 'https://m.client.10010.com/',
      headers: {
        "user-agent": useragent,
        "referer": `https://img.client.10010.com/jifenshangcheng/Directional?from=9110001000%E2%80%8B&yw_code=&desmobile=${options.user}&version=android%408.0100`,
        "origin": "https://img.client.10010.com"
      },
      url: `/dailylottery/static/textdl/userLogin?flag=1&floortype=tbanner&from=9110001000%E2%80%8B&oneid=undefined&twoid=undefined`,
      method: 'get'
    })
    let result = res.data
    let encryptmobile = result.substr(result.indexOf('encryptmobile=') + 14, 32)
    return encryptmobile
  },
  doTask: async (axios, options) => {
    const useragent = `Mozilla/5.0 (Linux; Android 7.1.2; SM-G977N Build/LMY48Z; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/75.0.3770.143 Mobile Safari/537.36; unicom{version:android@8.0200,desmobile:${options.user}};devicetype{deviceBrand:samsung,deviceModel:SM-G977N};{yw_code:}    `
    let encryptmobile = await dailylotteryintegral.encryptmobile(axios, options)

    let res = await axios.request({
      baseURL: 'https://m.client.10010.com/',
      headers: {
        "user-agent": useragent,
        "referer": "https://img.client.10010.com/",
        "origin": "https://img.client.10010.com"
      },
      url: `/dailylottery/static/integral/choujiang?usernumberofjsp=${encryptmobile}`,
      method: 'post'
    })
    let result = res.data
    if ('id' in result) {
      console.log('获得奖品', result.RspMsg)
    } else {
      console.log('抽奖失败', result.RspMsg)
    }

  }
}
module.exports = dailylotteryintegral