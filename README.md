# electron-serialport
## 发现很早版本的 electron-serialport 作者不更新了，我也是刚接触遇见坑很多，今天更新下这个，希望对大家有帮助！
## 安装步骤
```
    npm install
    #安装完以后重新编译serialport包 根据当前系统编译 Mac 或 win ，Mac 需要写版本号请查看你的当前electron版本填写
    #编译 serialport包 ，请确保当前环境下有 Python2.7 。
    Mac:   ./node_modules/.bin/electron-rebuild -v 11.0.3
    win:   .\node_modules\.bin\electron-rebuild.cmd
    #编译完成后
    npm start
    #打包
    npm run package
```
![图片](https://github.com/skfiy/electron-serialport/blob/main/public/img/IMG1.jpg)