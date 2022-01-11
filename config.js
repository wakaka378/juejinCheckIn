// 配置文件
module.exports = {
  // 需要手动填写
  cookie: process.env.COOKIE,
  // 请求地址
  baseUrl: 'https://api.juejin.cn',
  // api地址
  api: {
    // 签到
    checkIn: '/growth_api/v1/check_in',
    // 查询签到
    getCheckStatus: '/growth_api/v1/get_today_status',
    // 查询签到天数
    getCheckInDays: '/growth_api/v1/get_counts',
    // 查询当前矿石
    getCurrentPoint: '/growth_api/v1/get_cur_point',
    // 查询抽奖
    getlotteryStatus: '/growth_api/v1/lottery_config/get',
    // 抽奖
    draw: '/growth_api/v1/lottery/draw',
    // 查询今天沾过喜气没
    getDipLuckyStatus: '/growth_api/v1/lottery_lucky/my_lucky',
    // 沾喜气
    dipLucky: '/growth_api/v1/lottery_lucky/dip_lucky'
  },
  // 邮箱配置
  emailConfig: {
    // 邮箱服务 163|qq
    service: '163',
    // 邮箱
    email: process.env.EMIAL,
    // 邮箱授权码
    pass: process.env.PASS,
  }
}