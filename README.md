# 说明

* 此项目是根据个人需要, 制作的可以将文件按数字顺序重命名的 web 程序


# 使用方法

1. `git clone` 此项目进行相关修改
1. 进入 `client-vue2` 目录
1. 执行 `yarn` 安装 `node依赖`
1. 执行 `yarn run build` 打包前端代码到 `server-egg2/app/public`
1. 进入 `server-egg2` 目录
1. 执行 `yarn` 安装 `node依赖`
1. 执行 `yarn run start` 启动, 此为后台服务


* 也可以修改 `server-egg2` 里面的 `cwd`, 然后用 pm2 作为后台服务运行


# 注意事项

* 只在 macos 上试验, 其它系统请自行修改
* `client-vue2` 只在开发阶段使用, 完成后打包到 `server-egg2/app/public` 里面了
