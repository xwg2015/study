# 基于sassCore定制自己的版本

### reset
```sass
@if $mobileSwitch {
    * {
        @include box-sizing(border-box);
        //xwg:移动端使用更方便布局
    }
}
```

```sass
font-family: $fontYaHei, sans-serif;
            //xwg:PC端标准字体
@if $mobileSwitch {
    font-family: $baseFontFamily;
    //xwg:移动端标准字体
}
```

```sass
@if $mobileSwitch {
    -webkit-tap-highlight-color: transparent;
    //xwg:移动端去除点击效果颜色
}
```

```sass
i {
    font-style: normal;
    //xwg:<i>标签更多被认可为icon的专属标签
}
```

```sass
img {
  border: 0;
  vertical-align: middle;
  //xwg:真正是为了去除图片在容器下方的间隙

  @if $lte7 {
    -ms-interpolation-mode: bicubic;
  }
}
```

```sass
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font: inherit;
  margin: 0;
  outline: none;
  //xwg:清除chrome中自带选中边框色，根据网站主题重新设定
}
```

### setting
setting里面大量的颜色定义都需要根据自己公司项目规范重新设置。

```sass
$mobileSwitch: false !default;
//xwg:移动端特有的部分样式
```

```sass
$baseLineHeight: 1.4286 !default;
$blogLineHeight: 1.5 !default;
//xwg:1.4286是根据20/14得来方便布局，博客类网站则使用1.5或1.6的行高
```

### xwg
个人常用方法集合。

例如：
1. 移动端1px处理
2. 单行文本和多行文本溢出显示省略号（...）

详细见_xwg.sass文件


### 待补充...
