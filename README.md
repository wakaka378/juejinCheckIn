# jjCheckInScript
掘金自动签到脚本

## Start quickly
将项目Fork到自己的仓库，然后在`config.js`中填入掘金`cookie`，每天九点会自动触发`action`执行签到

自从用了自动签到后  妈妈再也不用担心我忘记签到了   兑换Switch不是梦

### cookie获取方式
登陆进入到掘金，**F12**打开控制台，选择**network**后随便点击一个接口，找到请求头中的`cookie`，选中数据后右键**复制值**

![image](https://user-images.githubusercontent.com/46524158/148544112-d965ec3a-2b07-4b2d-a2f4-db42e56bacb7.png)

> 为啥不用`document.cookie`? 


 控制台输入命令获取到的cookie并不完整
 
 这是控制台获取到的`cookie`，对比一下接口的`cookie`，相差很大
 ![image](https://user-images.githubusercontent.com/46524158/148544544-f1c29caf-389c-43b0-bd80-45c64b107a73.png)

### 自动执行延迟
在开发测试的时 发现jobs没有按时执行 九点五分到公司打开actions时发现并没有执行jobs  刚开始还以为是cron 时间填写错误  修改时间后发现github actions定时任务会有延迟  延迟时间几分钟到十几分钟甚至一小时都有  但这个并不影响我们签到功能  只要是在今天签到都可以  


以我测试为例  将 corn时间设置为每天的12:30  但实际执行时间为 12:51 差不多延迟了20分钟
```
on:
  # 定时执行
  schedule:
    - cron: "30 4 * * *"
```


![jobs执行时间](https://user-images.githubusercontent.com/46524158/148627089-6186fefc-1943-43ad-8d5c-75d78a211a54.png)



查看相关文档后发现  在GitHub中关于Schedule的定义：
> Note: The schedule event can be delayed during periods of high loads of GitHub Actions workflow runs. High load times include the start of every hour. To decrease the chance of delay, schedule your workflow to run at a different time of the hour.
> 
> 注意: 在高负载的 GitHub action 工作流运行期间，调度事件可能会被延迟。高负载时间包括每个小时的开始。为了减少延迟的机会，请安排您的工作流在一小时的不同时间运行。

也就是说  Schedule中的cron时间并不是真正执行的时候  而是工作流进入到GitHub进行计划排队时间 说简单点就是工作流进入到GitHub执行的队列时间  具体什么时候执行工作流 则需要看GitHub工作流的负载


这个问题在签到需求中并不是致命的问题  如果想要解决可以参考[Github Action的 Schedule 运行不准时的解决办法](https://zhuanlan.zhihu.com/p/379365305)这篇文章


## 具备能力
- [x] `action` 每天9点定时执行
- [ ] 邮件通知
  - [ ] cookie过期邮件通知
- [x] 签到
- [x] 占喜气
- [x] 抽奖
- [ ] 设定想要兑换的周边 自动计算还需要签到多少天

## 声明
本项目仅适用于学习交流  并不具备其他用途  也没有经过掘金官方团队  若是被封号  与我无关（手动狗头保命）

有其他想法或功能 欢迎进行讨论 
