# design-shop
## 前言 ##
项目为衣服定制微型商城，支持个性化定制、下单、微信支付等基本功能

> [预览戳这里](http://www.eseeto.com/)（请用chrome手机模式预览）

> 移动端预览地址

<img src="https://raw.githubusercontent.com/faymi/static-repository/master/images/1542639064.png" width="250" height="250"/>


## 技术栈 ##

前端：vue2 + axios + vuex + vue-router + webpack + fabric + vant
本项目基于vue官网的命令行工具 (CLI)搭建项目初始架构，主要用到fabric插件来进行定制页面的功能实现，部分页面是基于vant组件编写，利用axios和后端处理数据。
## 功能 ##

 - 登录、注册
 - 衣服定制（添加文字、添加图片等）
 - 下单
 - 微信支付

## 启动 ##

    # install dependencies
    npm install

	#启动前工作：将/static/fabric.js复制至/node_modules/fabric/dist/并覆盖原来的文件（因为static下的fabric.js是带有手势操作的）
	#fabric文档：https://github.com/kangax/fabric.js/

	# serve with hot reload at localhost:8080
	npm run dev

	# build for production with minification
	npm run build

	# build for production and view the bundle analyzer report
	npm run build --report


> 注：项目处于开发阶段，功能未完善！


  [1]: http://unique.vesstack.com