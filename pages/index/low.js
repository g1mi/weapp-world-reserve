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
        i++, i %= 3, t.setData({
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
        array: [ "3-5岁", "6-8岁", "9-12岁", "13-18岁" ],
        index: 0,
        age: [ {
            name: "0",
            value: "3-5岁",
            checked: "true"
        }, {
            name: "1",
            value: "6-8岁"
        }, {
            name: "2",
            value: "9-12岁"
        }, {
            name: "3",
            value: "13-18岁"
        } ],
        currentNavtab: 0,
        city: "",
        school: "",
        reid: "",
        nearby: [],
        foot: [ "https://m.risecenter.com/img/rise_phone1.jpg", "https://m.risecenter.com/img/rise_looyu1.jpg", "https://m.risecenter.com/img/rise_schools1.jpg" ],
        head: [ "https://m.risecenter.com/img/rise_phone2.jpg", "https://m.risecenter.com/img/rise_looyu2.jpg", "https://m.risecenter.com/img/rise_schools2.jpg" ],
        indexSelect: 0,
        imghidden: !1,
        play: !1,
        p: 0
    },
    onLoad: function(e) {
        var i = this;
        t(this), wx.getStorage({
            key: "imagewidth",
            success: function(e) {
                i.setData({
                    imagewidth: e.data
                });
            }
        }), wx.getSystemInfo({
            success: function(e) {
                var t = e.screenWidth - 40;
                i.setData({
                    imagewidth: t
                });
            }
        }), wx.getLocation({
            success: function(e) {
                var t = "https://m.risecenter.com/xyapi.php?act=getLocation&lat=" + e.latitude + "&lng=" + e.longitude + "&distance=20000&reid=0&type=1&limit=3";
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
                            reid: n,
                            nearby: e.data
                        });
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        wx.getStorage({
            key: "imagewidth",
            success: function(t) {
                e.setData({
                    imagewidth: t.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    cusImageLoad: function(e) {
        var t = a.imageUtil(e);
        wx.setStorage({
            key: "imagewidth",
            data: t.imageWidth
        }), this.setData({
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
            url: "city"
        });
    },
    clickschool: function(e) {
        wx.navigateTo({
            url: "school?reid=" + e.currentTarget.dataset.reid + "&id=1"
        });
    },
    formSubmit: function(e) {
        var t = this.data.age[e.detail.value.age].value, i = {
            xingming: e.detail.value.name,
            tel: e.detail.value.tel,
            age: t,
            cityname: e.detail.value.city,
            checked_school: e.detail.value.school,
            medium: "少儿英语培训机构排名(3-5)",
            title: "少儿英语培训机构排名(3-5)"
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
    clickview: function() {
        wx.navigateTo({
            url: "city"
        });
    },
    audition: function() {
        wx.navigateTo({
            url: "audition?eid=3"
        });
    },
    more: function() {
        wx.navigateTo({
            url: "more"
        });
    },
    cellview: function(e) {
        switch (e.currentTarget.dataset.index) {
          case 0:
          case 1:
            wx.makePhoneCall({
                phoneNumber: "4006101100"
            });
            break;

          case 2:
            wx.navigateTo({
                url: "more"
            });
        }
    },
    clickvideo: function(e) {
        1 == e.currentTarget.dataset.index ? this.setData({
            imghidden: !0,
            p: 1,
            play: !1
        }) : this.setData({
            imghidden: !1,
            play: !0,
            p: 2
        });
    },
    videoPlay: function(e) {
        console.log("playingID = -1"), this.videoContext && this.videoContext.pause(), this.videoContext = wx.createVideoContext(e.currentTarget.id);
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
}), e(i, "clickhome", function() {
    console.log("点击title"), wx.navigateBack({
        delta: 2
    });
}), e(i, "bindPickerChange", function(e) {
    this.setData({
        index: e.detail.value
    });
}), e(i, "ciclk", function() {
    console.log("点击了这张图片"), wx.navigateTo({
        url: "game"
    });
}), i));