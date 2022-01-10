# jjCheckInScript
掘金自动签到脚本

## Start quickly
将项目`Fork`到自己的仓库  然后将项目`clone`下来 
![image](https://user-images.githubusercontent.com/46524158/148786158-33a763ad-11d6-4ce6-9cde-4bd8c9e77992.png)

用编辑器打开项目后  需要将带有**手动填写**的几项数据修改为自己的 其他不要动 
```js
// 配置文件
module.exports = {
  // 需要手动填写
  cookie: '',
  // 请求地址
  baseUrl: 'https://api.juejin.cn',
  // api地址
  api: {
   ...
  },
  // 邮箱配置
  emailConfig: {
    // 邮箱服务 163|qq
    service: '163',
    // 邮箱 手动填写
    email: '',
    // 邮箱授权码  手动填写
    pass: '',
  }
}

```

### cookie获取方式
> cookie 有过期时间 大概是一个月  或者是退出登陆也会过期 
登陆进入到掘金，**F12**打开控制台，选择**network**后随便点击一个接口，找到请求头中的`cookie`，选中数据后右键**复制值**

![image](https://user-images.githubusercontent.com/46524158/148544112-d965ec3a-2b07-4b2d-a2f4-db42e56bacb7.png)

> 为啥不用`document.cookie`? 


 控制台输入命令获取到的cookie并不完整
 
 这是控制台获取到的`cookie`，对比一下接口的`cookie`，相差很大
 ![image](https://user-images.githubusercontent.com/46524158/148544544-f1c29caf-389c-43b0-bd80-45c64b107a73.png)


### 邮箱设置
这里以163邮箱为例  qq邮箱同理  如果是163邮箱  直接将`service`字段设置为163（qq邮箱就写qq） 然后填入你自己的邮箱 邮件发送成功  登陆邮箱会看到你给自己发了一条邮件  就像这样

![image](https://user-images.githubusercontent.com/46524158/148787057-f71ec4d9-6373-468b-868d-d636b5a8069b.png)

**授权码获取⚠️：**
登陆进入163邮箱  打开设置

![image](https://user-images.githubusercontent.com/46524158/148787385-8829e382-17ec-492b-b30e-924c7610d59c.png)

将以下几个设置打开

![image](https://user-images.githubusercontent.com/46524158/148787691-89b5e8a0-d28b-43ea-ab0a-d7689feb2eba.png)

然后添加授权码  如果有就新增  这里需要用手机发送一条短信  直接微信扫码就可以

![image](https://user-images.githubusercontent.com/46524158/148787887-b32426f6-2830-40ca-b245-868fa4ead1e5.png)

短信发送完毕后点击我已发送  然后就会得到你的授权码（注意授权码只展示一次）  将授权吗粘贴到配置文件中的 `pass`字段

![image](https://user-images.githubusercontent.com/46524158/148788024-52f3d77f-0df4-4d1f-ad0f-a1f2b882710f.png)


将所有的参数填入无误后  可以用命令`node index.js`本地运行  可以收到邮件并且邮件里有日志消息就表示程序可以正常运行了  确认无误后将修改后的项目`push`  

项目已经设置了自动执行  每天9点会自动执行签到  并且发送邮件进行通知

自从用了自动签到后  妈妈再也不用担心我忘记签到了   兑换Switch不是梦

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
- [x] 邮件通知
  - [ ] cookie过期邮件通知
- [x] 签到
- [x] 占喜气
- [x] 抽奖
- [ ] 设定想要兑换的周边 自动计算还需要签到多少天

## 声明
本项目仅适用于学习交流  并不具备其他用途  也没有经过掘金官方团队  若是被封号  与我无关（手动狗头保命）

有其他想法或功能 欢迎进行讨论 
