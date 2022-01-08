// 配置文件
module.exports = {
  // 需要手动填写
  cookie: '_ga=GA1.2.704776625.1640487702; MONITOR_WEB_ID=c5d533be-fd08-4cbe-8095-a58c9cc4fad1; passport_csrf_token_default=0b65d43de96a7026639d1c12e5c7fd95; passport_csrf_token=0b65d43de96a7026639d1c12e5c7fd95; n_mh=DI-bDWSdI2DCP4p4nGOcOxE4dlMg2yJnXXb9pGxWTSA; _gid=GA1.2.553389825.1641259470; _tea_utm_cache_2018=undefined; passport_auth_status=de24c0346a3dd178872b44b367cf5612,79213aa0d2b135ecb26f7e4a6c5b5a19; passport_auth_status_ss=de24c0346a3dd178872b44b367cf5612,79213aa0d2b135ecb26f7e4a6c5b5a19; sid_guard=7111e31da85df7f6616c78cd0208fb4a|1641469323|5184000|Mon,+07-Mar-2022+11:42:03+GMT; uid_tt=0d5bac1981d238ff7052721a8e1acda9; uid_tt_ss=0d5bac1981d238ff7052721a8e1acda9; sid_tt=7111e31da85df7f6616c78cd0208fb4a; sessionid=7111e31da85df7f6616c78cd0208fb4a; sessionid_ss=7111e31da85df7f6616c78cd0208fb4a; sid_ucp_v1=1.0.0-KDRjZWUyM2RjZWI2MDFmMDFjYjJlM2M1ZDJkYjc3OWU2Y2Q0ZTg3NWYKFwi3s_DA_fWVBBCLq9uOBhiwFDgCQPEHGgJsZiIgNzExMWUzMWRhODVkZjdmNjYxNmM3OGNkMDIwOGZiNGE; ssid_ucp_v1=1.0.0-KDRjZWUyM2RjZWI2MDFmMDFjYjJlM2M1ZDJkYjc3OWU2Y2Q0ZTg3NWYKFwi3s_DA_fWVBBCLq9uOBhiwFDgCQPEHGgJsZiIgNzExMWUzMWRhODVkZjdmNjYxNmM3OGNkMDIwOGZiNGE; _tea_utm_cache_2608={"utm_source":"gold_browser_extension"}',
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
  }
}