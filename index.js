const axios = require('axios')
const config = require('./config')

axios.defaults.baseURL = config.baseUrl
axios.defaults.headers['cookie'] = config.cookie

// 相应拦截处理
axios.interceptors.response.use((response) => {
  const { data } = response
  if (data.err_msg === 'success' && data.err_no === 0) {
    return data
  } else {
    return Promise.reject(data.err_msg)
  }
}, (error) => {
  return Promise.reject(error);
})

/**
 * 查看今天是否已经签到
 *
 * @return {Boolean} 是否签到过 
 */
const getCheckStatus = async () => {
  try {
    const getCheckStatusRes = await axios({
      url: config.api.getCheckStatus,
      method: 'get'
    })
    return getCheckStatusRes.data
  } catch (error) {
    throw `查询签到失败!【${error}】`
  }
}

/**
 * 查询当前矿石
 *
 */
const getCurrentPoint = async () => {
  try {
    const getCurrentPointRes = await axios({url: config.api.getCurrentPoint, method: 'get'})
    console.log(`当前总矿石: ${getCurrentPointRes.data}数`)
  } catch (error) {
    throw `查询矿石失败!${error.err_msg}`
  }

}
/**
 * 查询免费抽奖次数
 *
 * @return {Boolean} 是否有免费抽奖次数
 */
const getlotteryStatus = async () => {
  try {
    const getlotteryStatusRes = await axios({ url: config.api.getlotteryStatus, method: 'get' })
    return getlotteryStatusRes.data.free_count === 0
  } catch (error) {
    throw `查询免费抽奖失败！【${error}】`
  }
}

/**
 * 占喜气
 *
 */
const dipLucky = async () => {
  try {
    const getDipLuckyStatusRes = await axios({ url: config.api.getDipLuckyStatus, method: 'post' })
    console.log(getDipLuckyStatusRes, '-----getDipLuckyStatus')
    const dipLuckyRes = await axios({ url: config.api.dipLucky, method: 'post' })
    console.log(dipLuckyRes, '----dipLucky')
    // TODO:  无法区分当前是否有占喜气机会  
    console.log(`占喜气成功! 🎉 【当前幸运值：${dipLuckyRes.data.total_value}/6000】`)
  } catch (error) {
    throw `占喜气失败！ ${error}`
  }
}

/**
 * 抽奖
 *
 */
const draw = async () => {
  try {
    const freeCount = await getlotteryStatus()
    if (freeCount) {
      // 没有免费抽奖次数
      throw '今日免费抽奖以用完'
    }

    // 先占一下喜气
    await dipLucky()

    // 开始抽奖
    const drawRes = await axios({ url: config.api.draw, method: 'post' })
    console.log(`恭喜你抽到【${drawRes.data.lottery_name}】🎉`)

    if (drawRes.data.lottery_type === 1) {
      // 抽到矿石 查询总矿石
      await getCurrentPoint()
    }
  } catch (error) {
    console.log(`抽奖失败!=======> 【${error}】`)
  }
}

/**
 *查询签到天数
 *
 * @return {Object} continuousDay 连续签到天数 sumCount 总签到天数
 */
const getCheckInDays = async () => {
  try {
    const getCheckInDays = await axios({ url: config.api.getCheckInDays, method: 'get' })
    return { continuousDay: getCheckInDays.data.cont_count, sumCount: getCheckInDays.data.sum_count }
  } catch (error) {
    throw `查询签到天数失败!🙁【${getCheckInDays.err_msg}】`
  }
}


/**
 * 签到
 * 
 */
const checkIn = async () => {
  try {
    // 查询今天是否签到没
    const checkStatusRes = await getCheckStatus()

    if (!checkStatusRes) {
      // 签到
      const checkInRes = await axios({ url: config.api.checkIn, method: 'post' })
      console.log(`签到成功，当前总矿石${checkInRes.data.sum_point}`)

      // 查询签到天数
      const getCheckInDaysRes = await getCheckInDays()
      console.log(`连续抽奖${getCheckInDaysRes.continuousDay}天  总签到天数${getCheckInDaysRes.sum_count}`)

      // 签到成功 去抽奖
      await draw()
    } else {
      console.log('今日已经签到 ✅')
    }

  } catch (error) {
    console.log(`签到失败!=======> ${error}`)
  }
}

/**
 * TODO: 发送邮件 将日志通过邮件形式发送
 *
 */
const sendEmail = () => {

}
checkIn()