# weflow初体验
weflow是一款界面化前端工作流构建工具。

## 快速使用
1. [软件下载](https://github.com/weixin/WeFlow/releases)
2. 文件->新建项目
3. 新建文件存在于 WeFlow_workspace\f\your_project  
   初始文件目录结构  
   + src
     - css(含sassCore)
     - html
     - img
     - js
     - slice (图片素材，雪碧图合并，同名的@2x图片会被识别并进行合并)
4. 开发(监听文件变动，保存自动刷新浏览器)  
   开发文件目录结构
   + dev(只输出有内容的文件夹)
     - css(sass文件已编译好)
     - html
     - img
     - js
     - slice (此时图片还未合并)
5. 编译  
   编译后的文件目录结构
   + dist(压缩后的文件)
     - css
     - html
     - img
     - js
     - slice (整张雪碧图)
6. 还可以配置文件发布部署 和 ZIP打包（打包后会删除原来的dist文件）


## 自定义初始文件目录结构
官网新建项目后的初始文件css中含lessCore，如果你不用less或者使用sass，可以在WeFlow-1.3.1-win32-x64 \WeFlow-win32-x64\resources\app\templates目录下找到project压缩包，解压后定制自己的初始文件目录结构。
