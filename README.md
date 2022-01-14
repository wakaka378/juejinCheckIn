# juejinCheckInScript
掘金自动签到脚本

## Start Quickly

将 **[juejinCheckIn](https://github.com/gebilaofan/juejinCheckIn)**`Fork`到自己的仓库  然后将项目`clone`下来 



![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/085e321faca04d9db837a7f4b19b3705~tplv-k3u1fbpfcp-zoom-1.image)



然后进入到`Settings`设置里面  点击 `Secrets`中   更新`Repository secrets`中的数据

![image](https://user-images.githubusercontent.com/46524158/149270804-30b91204-01d8-40f8-9745-ac33621ec987.png)



**数据含义：**

- `COOKIE:` 掘金账号的cookie  
- `EMAIL:` 邮箱账号
- `PASS:` 邮箱对应的授权码
- `SERVICE:` 邮箱服务  默认为`163`邮箱  如果是qq邮箱  这一项填入`QQ`就可以  也可以查看`nodEmail`[邮箱支持服务](https://nodemailer.com/smtp/well-known/)来填写 （目前只测试过163和QQ邮箱）



填写完毕后 建议手动执行一下`Actions`  测试一下自己配置的数据是否有误  

![image](https://user-images.githubusercontent.com/46524158/149118948-69816247-5adb-4510-974d-1185999e3410.png)



接着就等待任务执行完毕 大约需要10s左右  执行完成后  数据配置正确的话 你的邮箱就会收到一条邮件  就像这样的  

![image](https://user-images.githubusercontent.com/46524158/149272531-3d48cbbf-017b-4ee1-8dcd-bcbbf214378d.png)


![image-20220113134303632](https://user-images.githubusercontent.com/46524158/149460089-b261603c-4e49-4a99-a07b-0a15a61b3108.png)


如果收到邮件并且显示**签到成功**或者**今日已经签到**  你已经成功运行项目     脚本设置了定时执行  每天**9点**会自动执行签到、抽奖等操作  并且发送邮件进行通知    自从用了自动签到后 妈妈再也不担心会忘记签到了  早日兑换Switch不是梦



如果没有收到邮件  亲 这边建议您排查一下邮箱账号或者是授权码配置是否正确

 



### cookie获取方式

cookie 有过期时间 大概是一个月  或者是退出登陆也会过期 
登陆进入到掘金，**F12**打开控制台，选择**network**后随便点击一个接口，找到请求头中的`cookie`，选中数据后右键**复制值**

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3d16490afb8465d93dcbf544497436d~tplv-k3u1fbpfcp-zoom-1.image)




### 授权码获取

这里以163邮箱为例  qq邮箱同理   登陆进入163邮箱  打开设置

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bccfbc6f48e74f9fa10f04d375df9044~tplv-k3u1fbpfcp-zoom-1.image)

将以下几个设置打开  打开`IMAP/SMTP  POP3/SMTP`服务时会弹窗发送短信 微信扫码后就可以发送短信（qq邮箱这一步开启需要手动进行验证发送短信）

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05b361b1ae8a48398aae7d64626e3534~tplv-k3u1fbpfcp-zoom-1.image)





我这里已经添加过了  就直接点击新增授权  也是一样会弹出二维码扫码发送短信



![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27da536385c044d6a185191e1ff76489~tplv-k3u1fbpfcp-zoom-1.image)

短信发送完毕后点击我已发送  然后就会得到你的授权码（**注意授权码只展示一次**）  将授权吗粘贴到`github ---> settings ---> secrets`中的`PASS`字段

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f2a43fde0c54462a0e7de66287b88a5~tplv-k3u1fbpfcp-zoom-1.image)


## Q&A

### 自动执行延迟

在开发测试的时 发现`jobs`没有按时执行 九点五分到公司打开`actions`时发现并没有执行`jobs`  刚开始还以为是`cron` 时间填写错误  修改时间后发现`github actions`定时任务会有延迟  延迟时间几分钟到十几分钟甚至一小时都有  但这个并不影响我们签到功能  只要是在今天签到都可以  


以我测试为例  将 `corn`时间设置为每天的`12:30`  但实际执行时间为 `12:51` 差不多延迟了`20分钟`

```
on:
  # 定时执行
  schedule:
    - cron: "30 4 * * *"
```


![jobs执行时间](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aacc559213ae4cb6bf9078929357c27f~tplv-k3u1fbpfcp-zoom-1.image)



查看相关文档后发现  在GitHub中关于Schedule的定义：

> Note: The schedule event can be delayed during periods of high loads of GitHub Actions workflow runs. High load times include the start of every hour. To decrease the chance of delay, schedule your workflow to run at a different time of the hour.
>
> 注意: 在高负载的 GitHub action 工作流运行期间，调度事件可能会被延迟。高负载时间包括每个小时的开始。为了减少延迟的机会，请安排您的工作流在一小时的不同时间运行。

也就是说  Schedule中的cron时间并不是真正执行的时候  而是工作流进入到GitHub进行计划排队时间 说简单点就是工作流进入到GitHub执行的队列时间  具体什么时候执行工作流 则需要看GitHub工作流的负载


这个问题在签到需求中并不是致命的问题  如果想要解决可以参考[Github Action的 Schedule 运行不准时的解决办法](https://zhuanlan.zhihu.com/p/379365305)这篇文章


### 为啥不用`document.cookie`? 


 控制台输入命令获取到的cookie并不完整

 这是控制台获取到的`cookie`，对比一下接口的`cookie`，相差很大
 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91221fa2088b453dadcbbd408872d045~tplv-k3u1fbpfcp-zoom-1.image)






## 声明📢

本项目仅适用于学习交流  并不具备其他用途  也没有经过掘金官方团队  若是被封号  与我无关（手动狗头保命）

有其他想法或功能 欢迎进行讨论 





