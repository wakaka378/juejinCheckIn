// 配置文件
module.exports = {
  // 请求地址
  baseUrl: 'https://api.juejin.cn',
  // api地址
  api: {
    // 签到
    checkIn: 'https://api.juejin.cn/growth_api/v1/check_in',
    // 查询签到
    getCheckStatus: 'https://api.juejin.cn/growth_api/v1/get_today_status',
    // 查询签到天数
    getCheckInDays: 'https://api.juejin.cn/growth_api/v1/get_counts',
    // 查询当前矿石
    getCurrentPoint: 'https://api.juejin.cn/growth_api/v1/get_cur_point',
    // 查询抽奖
    getlotteryStatus: 'https://api.juejin.cn/growth_api/v1/lottery_config/get',
    // 抽奖
    draw: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
    // 获取沾喜气列表用户
    getLuckyUserList: 'https://api.juejin.cn/growth_api/v1/lottery_history/global_big',
    // 沾喜气
    dipLucky: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky'
  },
}
