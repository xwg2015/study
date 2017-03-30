## 准备工作
1.视口设置  
width = 640, user-scalable = no  (此时的设计稿的宽度就是640)

2.公共函数切换  
项目本身不大的话，可以采用原生的JS，提前写好一些公共函数  
比如：通过ID获取元素 获取视口宽高 添加和移除类名等等常用方法

3.页面切换  
由于是单页应用且项目简单，body相对定位。每一个页面就是一个section并且绝对定位，设置不同的z-index


## 页面布局
元素的尺寸都是按照640的设计稿 测量多少设置多少


## 进场动画
1.animation动画 animation-fill-mode:forwards (动画执行完回到最初状态)  
2.图片预加载处理  
3.transition动画消失事件：transitionEnd


## 轮播图
1.关于border-radius:50%; 很多手机并不支持，最好写成具体值。  
2.样式重置，用到什么标签重置什么标签。  
3.通过JS设置transform:tranlateX();实现轮播。  
4.文字缩进，可以使用text-indent属性，而不是一味的父容器padding-left。


## 待更新...
