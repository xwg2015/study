var All = {

    init: function(){
        this.render();
        this.bind();
    },

    render: function(){
        this.page = $(".page");
        this.iH = $(window).height();
        this.select = $("#J-select");
        this.typeList = $("#J-type-list");
        this.btnChoose = $(".btn-choose");
        this.bSelect = true;

        this.page.css("height", this.iH);  //单页 内滚动
    },

    bind: function(){
        var self = this;

        self.select.on("click", function(){
            if(self.bSelect){
                $(this).next().show();
                $(this).find("i").removeClass("triangle-single-down").addClass("triangle-single-up");
                self.bSelect = false;
            }else{
                $(this).next().hide();
                $(this).find("i").removeClass("triangle-single-up").addClass("triangle-single-down");
                self.bSelect = true;
            }
        });

        self.typeList.find("li").on("click", function(){
            self.select.find("span").html($(this).html());
            self.select.find("i").removeClass("triangle-single-up").addClass("triangle-single-down");
            self.typeList.hide();

            self.bSelect = !self.bSelect;
        });

        self.btnChoose.on("click", function(){
            if($(this).parents("li").data("checked") == "0"){
                $(this).parents("li").find(".icon-checked").show();
                $(this).parents("li").data("checked", "1");
            }else{
                $(this).parents("li").find(".icon-checked").hide();
                $(this).parents("li").data("checked", "0");
            }
        });
    }
};

All.init();

function scaleChange(obj, width, height, isParent){
    var objWidth = width;
    var scale = width / height;
    var width = 640; // 设计稿宽度
    var newWidth = $(window).width();

    obj.css({
        "width": newWidth * objWidth / width,
        "height": ( newWidth * objWidth / width ) / scale
    });

    if(isParent){
        obj.parents(isParent).css({
            "width": newWidth * objWidth / width
        });
    }
}
