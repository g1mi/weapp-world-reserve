function e(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

function t(e) {
    var t = e, i = 0;
    setInterval(function() {
        i++, i %= 2, t.setData({
            indexSelect: i
        });
    }, 1e3);
}

var i, a = require("../../utils/autoimage.js");

Page((i = {
    data: {
        imagewidth: 0,
        shool: [ "[东城] 崇文新世界校区", "[西城] 宣武门校区 ", "[丰台] 方庄蒲黄榆校区" ],
        location: [ "崇文门外大街新世界写字楼B座12A层", "宣武门外大街富豪写字楼4,5层", "蒲芳路GOGO新世代8号楼501" ],
        age: [ {
            name: "0",
            value: "9-12岁",
            checked: "true"
        }, {
            name: "1",
            value: "13-18岁"
        } ],
        currentNavtab: 0,
        city: "",
        school: "",
        reid: "",
        foot: [ "https://m.risecenter.com/img/rise_phone1.jpg", "https://m.risecenter.com/img/rise_shiting1.jpg" ],
        head: [ "https://m.risecenter.com/img/rise_phone2.jpg", "https://m.risecenter.com/img/rise_shiting2.jpg" ],
        indexSelect: 0,
        p: 0,
        toView: "",
        windowHeight: ""
    },
    onLoad: function(e) {
        t(this);
        var i = this;
        wx.getSystemInfo({
            success: function(e) {
                var t = e.screenWidth - 40;
                i.setData({
                    imagewidth: t,
                    windowHeight: e.screenHeight + "px"
                });
            }
        }), wx.getLocation({
            success: function(e) {
                var t = "https://m.risecenter.com/xyapi.php?act=getLocation&lat=" + e.latitude + "&lng=" + e.longitude + "&distance=20000&reid=0&type=1&limit=1";
                wx.request({
                    url: t,
                    data: {},
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        var t = e.data[0].cityName, a = e.data[0].typename, n = e.data[0].reid;
                        i.setData({
                            city: t,
                            school: a,
                            reid: n
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    cusImageLoad: function(e) {
        var t = a.imageUtil(e);
        this.setData({
            imagewidth: t.imageWidth,
            imageheight: t.imageHeight,
            slideHeight: t.imageHeight,
            slidetop: -t.imageHeight,
            slideWidth: t.imageWidth,
            iconWidth: t.imageHeight / 2
        });
    },
    radioChange: function(e) {
        var t = e.detail.value;
        this.setData({
            currentNavtab: t
        });
    },
    dialcall: function() {
        wx.makePhoneCall({
            phoneNumber: "400-610-1100"
        });
    },
    clickcity: function(e) {
        wx.navigateTo({
            url: "highcity"
        });
    },
    formSubmit: function(e) {
        var t = this.data.age[e.detail.value.age].value, i = {
            xingming: e.detail.value.name,
            tel: e.detail.value.tel,
            age: t,
            cityname: e.detail.value.city,
            checked_school: e.detail.value.school,
            medium: "幼儿英语100(13-18)",
            title: "幼儿英语100(13-18)"
        };
        wx.request({
            url: "https://m.risecenter.com/xyapi.php?act=add_diyform1",
            data: i,
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                "提交成功" == e.data.msg ? wx.navigateTo({
                    url: "succeed"
                }) : wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1,
                    success: function(e) {
                        e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(e) {
                console.log("请求失败", e);
            },
            complete: function(e) {}
        });
    },
    cellview: function(e) {
        switch (e.currentTarget.dataset.index) {
          case 0:
            wx.makePhoneCall({
                phoneNumber: "4006101100"
            });
            break;

          case 1:
            wx.navigateTo({
                url: "audition"
            });
        }
    },
    clickview: function(e) {
        var t = this, i = e.currentTarget.dataset.index;
        1 == i && t.setData({
            p: 1
        }), 2 == i && t.setData({
            p: 2
        });
    },
    videoPlay: function(e) {
        this.videoContext && (console.log(this.videoContext), this.videoContext.pause()), 
        this.videoContext = wx.createVideoContext(e.currentTarget.id);
    },
    videoEndPlay: function(e) {
        this.videoContext.seek(0);
    },
    videoErrorCallback: function(e) {
        console.log("视频错误信息:"), console.log(e.detail.errMsg);
    }
}, e(i, "onPullDownRefresh", function() {
    setTimeout(function() {
        wx.stopPullDownRefresh();
    }, 2e3);
}), e(i, "click", function() {
    this.setData({
        toView: "red"
    });
}), e(i, "clickhome", function() {
    console.log("点击title"), wx.navigateBack({
        delta: 2
    });
}), i));