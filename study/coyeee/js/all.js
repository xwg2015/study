var iH = $(window).height();
var oBody = $(".layout-body");
var oHeader = $(".layout-header");
var oMain = $(".layout-main");
var oFooter = $(".layout-footer");
var mainH = 0;

// 固定顶部和底部
if(oFooter.html()){
    mainH = iH - oHeader.height() - oFooter.height();
}else{
    mainH = iH - oHeader.height();
}
oBody.css({
    "height": iH,
    "position": "relative"
});
oMain.css({
    "height": mainH,
    "overflow": "auto"
});

// tab切换
function tab(tab, contentStr){
    tab.find("a").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active");

        tab.siblings(contentStr).eq($(this).index()).show().siblings(contentStr).hide();
    });
}

// 模拟单选框
function handleRadio(wrap, itemStr){
    wrap.find("."+itemStr).on("click", function(){
        wrap.find("."+itemStr).removeClass("active");
        $(this).addClass("active");
    });
}
