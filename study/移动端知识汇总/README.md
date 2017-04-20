# 移动端知识点与常见bugs汇总(持续更新中)


## 一、PC端的屏幕尺寸和窗口尺寸
屏幕尺寸：screen.width screen.height  
窗口尺寸：window.innerWdith window.innerHeight  
但是需要注意：**当缩放窗口的时候，窗口尺寸也会随之缩放**  
解释：因为窗口尺寸(window.innerWidth)的定义是 **窗口里能展现的像素宽高**，页面放大了，页面里展现的css像素变少了，所以窗口尺寸变小了，相反缩小页面的时候，窗口尺寸变大了。

## 二、移动端的viewport
```html
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
```
移动端有两种viewport:  
1. visual viewport
2. layout viewport

手机是一个放大镜，它游走在页面上，手机上展示的宽高为visual-viewport,而整个页面的宽高是layout-viewport。  
然而每种浏览器的layout-viewport都不一样，**Safari iPhone为980px，Opera为850px，Android WebKit为800px，最后IE为974px**。  
为了解决两种viewport的差异，让手机上能完整的展示出整个页面，就有了viewport meta，也就是上述代码。

## 三、设备像素比
> window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。
公式表示就是：window.devicePixelRatio = 物理像素 / dips

以iphone4为例，其设备宽度为320（设备独立像素），chrome移动端调试工具中可以查看各种主流手机的设备独立像素，但分辨率为640（物理像素），所以iphone4的设备像素比为2，在行业中，**设备像素比大于等于2为Retina屏**。

## 四、设计稿尺寸规范
H5的设计稿一般设计为640x1136px即可。 既满足了显示需求，又能降低用户加载图片需要的带宽。可以用各种分辨率的移动智能手机查看我们设计的H5页面时，当然，也会出现如下的情况，内容显示不全，甚至一些重要内容和按钮都会被遮挡:   
第一：背景图片必须采用background-size:cover;来实现。  
第二：我们在进行H5页面内容规划布局设计的时候，不能把重要内容放在太偏下的位置或者偏上，否则前端布局时可能出现内容显示不全的情况。  

除去将浏览器全屏显示的情况，几乎所有情况均会有顶部的状态栏和导航栏。  
iPhone的设计标准，状态栏和导航栏的独立像素高度分别为40px和88px。  
由于Android系统可以更改状态栏和导航栏的高度，这里可以取默认值为48px和100px。   

**总结，一般情况下，以现有市场上流行的移动智能手机，单页翻转（非延伸向下的长页面）设计稿尺寸为640×1136，在高度为812处设置一条安全线（参考线），将重要的内容布局在这条安全线之上。**

## 五、移动端的一像素边框问题
按照标准640设计稿来讲，设计稿中的边框一般都是2像素，实际上是要在手机上展示1像素的边框，但是在Retina屏中，1像素使用2dp渲染，使得我们样式中书写的1px不能真正显示出1px边框。  
网上有很多解决方案，这里只给出最优缩放方案：  
```css
.box {
    width: 100px;
    height: 100px;
    position: relative;
}
.box:before {
    content: "";
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 200%; // 先放大再缩小
    height: 200%;
    border: 1px solid #000;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
}
```

## 六、移动端的点击效果
webkit有个私有属性：-webkit-tap-highlight-color  
当用户点击iOS的Safari浏览器中的链接或JavaScript的可点击的元素时，覆盖显示的高亮颜色。  
起效果的前提必须是a, input, textarea, select等标签。  
兼容性：IOS和大部分安卓均支持，安卓表现不一。**故样式重置时，将其设为透明色。**

但是当我们需要点击效果的标签不是其中一个时，比如数据展示页面，更适合用table布局时，这时点击每行(tr)，需要灰色的点击效果。之前通过JS中的touchstart, touchemove, touchend事件模拟，效果并不是很好，尤其是在app内，当app本身有可左右滑动的tab内容时，很容易导致元素上面的点击样式被遗留。  

最佳解决方案：  
通过 **:active** 伪类就能轻松实现，加上给document添加空的touchstart方法，兼容部分手机:active失效的情况。

## 七、sticky footer效果实现
当页面内容不足一屏时，产品往往希望footer贴在浏览器最底部，当页面内容超过一屏时，就紧跟内容。
在移动端实现这样的效果很简单，可以不用JS判断内容高度。
方案1：
```css
main {
  min-height: calc(100vh - header高度 - footer高度)
}
```
不足之处在于，calc这个属性会随鼠标移动不停计算的，耗性能

方案2：
```css
body {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
```
移动端最完美解决方案。


## 八、基于rem的flexible布局
淘宝的flexible库可以很好的适配多终端，具体介绍可查看这篇文章
[《使用Flexible实现手淘H5页面的终端适配》](http://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)

但是在后续的使用中发现：

1.图片icon，若要使用rem单位，background-size:contain;即可，如果直接使用rem单位会在部分安卓机上面出现icon截掉部门的情况。

2.边框，若使用rem，会在部分安卓里不显示边框出来，推荐直接使用px单位，flexible设置html的data-dpr属性就是很好的解决了移动端retina屏上的一像素边框问题。

...


## 九、移动端的flex兼容
这里首推sass的sasscore库，flex兼容写的很全面。
而autoprefixer，虽然能设置兼容范围，
```js
postcss: [
  require('autoprefixer')({
    browsers: ['> 5%']
  })
]
```
但是flex的兼容在移动端并不好使。
例如在ipad上面不支持，实际上兼容没写好，所有属性尽量加上-webkit-前缀。
```css
.flex-layout {
  display: -webkit-flex
  -webkit-align-items: center
  -webkit-flex-wrap: wrap
  -webkit-justify-content: space-between
  ...
}
```

## 十、移动端怪异bugs
1.ipad上使用背景渐变会有莫名的一根黑线
2.iphone5（320设备宽）上header上使用z-index会导致与下面的dom元素中间出现一根白线
...
