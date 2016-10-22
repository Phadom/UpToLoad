(function() {
    /**************************
    下拉刷新
    ***************************/
    var ul = $("#ul"),
        obj = {
            url: "/user/moreDetail?pagesize=10&page=1",
            _page: 0,
            id: "template",
            End: false
        },
        isReady = true,
        loading = $("#loading"),
        more = $("#more"),
        none = "none";


    /**********************************
    判断是否进入屏幕
    ***********************************/
    function isEnter($ele) {
        if (!$ele || $ele.length == 0) return false;
        var winTop = $(window).scrollTop(),
            domeHeight = $ele.offset().top + $ele.height() / 2,
            winHeight = $(window).height();
        return (winHeight + winTop > domeHeight);
    };
        
    

    /************************************
    滑动判断
    *************************************/
    function isScroll() {
        $(window).on('scroll', function() {
            if (!ul || ul.children().length == 0) return false;
            var $last = ul.find("li").last();
            if (!isEnter($last)) return false;
            if (!isReady) return false;
            //isReady = false;
            //Ajax(obj);
        /* 静态测试 start*/
        var json = {};
        json.data = {};
        json.data.info = [{
            content: "hello world",
            read:"read"
        }, {
            content: "hello world",
            read:"read"
        }, {
            content: "hello world",
            read:"read"
        }, {
            content: "hello world",
            read:"read"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }, {
            content: "hello world"
        }];
            $(Mustache.to_html($('#' + obj.id).html(), json.data)).appendTo(ul);
        /* 静态结束 end*/
        });
    }
    isScroll();

    //Ajax(obj);
    /*******************************
    ajax请求
    ********************************/
    function Ajax(obj) {
        if (obj.End == true) {
            isReady = false;
            return false;
        }
        more.addClass(none);
        loading.show();
        $.ajax({
            url: obj.url,
            type: "post",
            data: {
                page: ++obj._page
            },
            success: function(json) {
                ele.removeClass(none);
                loading.hide();
                if (!json.res) {
                    return false;
                }
                if (json.data.pages == 0) {
                    ele.addClass(none);
                    more.addClass(none);
                    return false;
                }
                if (json.data.pages >= obj._page) {
                	/* 如果后台给的数据接口不一样,在这里过滤 */
                    /*for (var i = 0; i < json.data.items.length; i++) {
                        var item = json.data.items[i];
                        filterItems(item);
                    }*/
                    $(Mustache.to_html($('#' + obj.id).html(), json.data)).appendTo(ul);
                    more.addClass(none);
                }
                if (json.data.pages == obj._page) {
                    more.removeClass(none);
                    obj.End = true;
                }
                isReady = true;
            },
            error: function() {
                //console.log("请求失败!");
            }
        })
    };
    /*************************
	过滤数据
    *************************/
    function filterItems(items) {
        if (items.state == 0) { //0是增加,红色字体
            items["fontColor"] = "red"
        } else {
            items["fontColor"] = "green"
        }
    }



})();
