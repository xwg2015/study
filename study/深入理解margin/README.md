# 深入理解margin笔记

## 一、margin与容器尺寸

### 元素尺寸：  
1.可视尺寸-clientWidth(标准)  
2.占据尺寸-outerWidth(JQ中有类似方法)

### margin与可视尺寸：  
1.适用于没有设定宽高的普通block元素(不包括浮动元素，定位元素，inline元素，table-cell元素)  
2.只适用于水平方向尺寸

#### 特性应用：
1.一侧定宽的自适应布局（缩小可视尺寸）
```html
<img width="150" style="float:left;" />
<p style="margin-left:170px;">图片左浮动...</p>
```
2.两端对齐布局

### margin与占据尺寸：  
1.block/inlin-block水平元素均适用  
2.与有没有设定宽高值无关  
3.适用于水平方向和垂直方向

#### 特性应用：
1.实现滚动容器上下留白（padding也可以实现类似效果，但是只有chrome浏览器可以留白，其他浏览器均不可）
```html
<div style="height:200px;">
    <img height="300" style="margin:50px 0;" />
</div>
```
2.等高布局

## 二、margin与百分比单位
### 百分比margin的计算规则
普通元素的百分比margin都是相对于 **容器的宽度** 计算的。

### 绝对定位元素的百分比margin的计算规则
绝对定位元素的百分比margin是相对于 **第一个定位祖先元素** （relative/absolute/fixed）的宽度计算的。

#### 特性应用：
1.宽高2：1自适应矩形
```css
.box { background-color: blue; overflow: hidden;}
.box>div { margin: 50%;}
```

## 三、margin重叠问题
### margin重叠通常特性
1.block水平元素（不包括float和absolute元素）  
2.不考虑writing-mode，只发生在垂直方向（margin-top/margin-bottom）

### margin重叠3种情境
#### 1.相邻的兄弟元素  
#### 2.父级和第一个或者最后一个子元素  
```html
<div class="father">
    <div class="son" style="margin-top:50px;">内容</div>
</div>
```
```html
<div class="father" style="margin-top:50px;">
    <div class="son">内容</div>
</div>
```
```html
<div class="father" style="margin-top:50px;">
    <div class="son" style="margin-top:50px;">内容</div>
</div>
```
三种写法效果一致！
##### 父子margin重叠的其他条件
a.父元素非块状格式上下文元素  
b.父元素没有border-top设置  
c.父元素没有padding-top值  
d.父元素和第一个子元素之间没有inline元素分隔  
e.父元素没有height, min-height, max-height限制（margin-bottom特有的一个条件）  

#### 3.空的block元素  
父级必须overflow:hidden 防止margin穿透 撑开元素  
```html
<div class="father">
    <div class="son" style="margin:1em 0;"></div>
</div>
```
##### 空block元素重叠的其他条件
1.元素没有border设置  
2.元素没有padding值  
3.里面没有inline元素  
4.没有height，或者min-height

### margin重叠取值原则
1.正正去大值  
2.正负值相加  
3.负负最负值（绝对值最大的负值）

### margin重叠意义
网页诞生之初...  
1.连续段落或列表之类，如果没有marigin重叠，首尾项间距会和其他兄弟标签1:2关系，排版不自然；  
2.web中任何地方嵌套或直接放入任何裸div，都不会影响原来的布局；   
3.遗落的空任意多个p元素，不要影响原来的阅读排版。

### margin重叠的实践
1.列表善用margin重叠  
我们常这样写：
```css
.list li { margin-top: 10px;}
```
或者
```css
.list li { margin-bottom: 10px;}
```
正确写法：
```css
.list li {
    margin-top: 10px;
    margin-bottom: 10px;
}
```
**代码更具有健壮性，最后一个元素移除或者位置调换，均不会破坏原来的布局。**

## 四、margin:auto
元素有时候就算没有设置宽或高，也会自动填充所在容器。此时，如果设置宽或高，自动填充特性就会被覆盖。  
原本应该填充的尺寸被宽或高强制变更，而margin:auto就是为填充这个变更的尺寸而设计的。  
如果一侧是定值，一侧是auto，auto为剩余空间大小，如果两侧均是auto，则平分剩余空间。  

#### 1.图片为何不居中?
```css
img {
    width: 200px;
    margin: 0 auto;
}
```
因为此时图片是inline水平，就算没有width，其也不会占据整个容器。  
图片，按钮，视频等属于替换元素，只要设置了display:block即使有宽度也是占据整个容器的。   
正确写法：
```css
img {
    display: block;
    width: 200px;
    margin: 0 auto;
}
```

#### 2.为什么明明容器定高，元素定高，margin:auto 0无法垂直居中?
元素不会自动填充，没有所谓的剩余空间，所以不会分配。  
实现方法：  
1.设置writing-mode:vertical-lr  
2.绝对定位元素的margin居中(IE8+)
```css
.father {
    position: relative;
    height: 200px;
}
.son {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 200px;
    height: 100px;
    margin: auto;
}
```

## 五、margin负值定位
1.margin负值下的两端对齐
```css
.box {
    width: 1200px;
    margin: auto;
    background-color: blue;
}
.ul {
    overflow: hidden;
    margin-right: -20px;
}
.li {
    float: left;
    width: 386.66px;
    height: 300px;
    margin-right: 20px;
    background-color: red;
}
```
```html
<div class="box">
    <div class="ul">
        <div class="li">item1</div>
        <div class="li">item2</div>
        <div class="li">item3</div>
    </div>
</div>
```

2.margin负值下等高布局（有副作用，不过兼容好IE6+）
```css
.box {
    overflow: hidden;
    resize: vertical;
}
.left, .right {
    float: left;
    margin-bottom: -600px;
    padding-bottom: 600px;
}
.left {
    background-color: blue;
}
.right {
    background-color: red;
}
```

3.margin负值下的两栏自使用布局
之前的实现：  
```html
<img width="150" style="float:right;" />
<p style="margin-right:170px;">图片右浮动...</p>
```
图片右浮动，文字自然环绕效果。给p元素增加margin-right，可视尺寸减小，实现自适应效果；如果你希望DOM的前后顺序符合最终元素展现的前后顺序，需要略微调整HTML嵌套结构，以及使用margin负值进行定位。  
不足：DOM顺序和最终视觉顺序不符。  

使用margin负值实现：
```html
<div style="float:left; width:100%;">
    <p style="margin-right:170px;">图片右浮...</p>
</div>
<img width="150" style="float:left; margin-left:-170px;" />
```  
这里略微调整HTML结构，构建一个宽度100%的浮动容器（如果无需兼容IE8-，可以使用CSS3 calc），左浮动，后面跟随的图片也是同方向的浮动，但是，margin-left负值自身的宽度大小，配合p元素margin-right留下额补间空白，实现自适应效果。  
优点：DOM顺序和最终视觉顺序相符。
