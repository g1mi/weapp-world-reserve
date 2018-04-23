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
        eid: "",
        foot: [ "https://m.risecenter.com/img/rise_phone1.jpg", "https://m.risecenter.com/img/rise_looyu1.jpg", "http://m.risecenter.com/img/rise_index1.jpg" ],
        head: [ "https://m.risecenter.com/img/rise_phone2.jpg", "https://m.risecenter.com/img/rise_looyu2.jpg", "http://m.risecenter.com/img/rise_index2.jpg" ],
        indexSelect: 0,
        array: [ "3-5岁", "6-8岁", "9-12岁", "13-18岁" ],
        index: 0
    },
    onLoad: function(e) {
        var i = this;
        t(i), wx.getSystemInfo({
            success: function(t) {
                var a = t.screenWidth - 40;
                i.setData({
                    imagewidth: a,
                    eid: e.eid
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
            url: "city"
        });
    },
    clickschool: function(e) {
        var t = "";
        t = 3 == this.data.eid ? 3 : 1, wx.navigateTo({
            url: "school?reid=" + e.currentTarget.dataset.reid + "&id=" + t
        });
    },
    formSubmit: function(e) {
        var t = this.data.age[e.detail.value.age].value, i = {
            xingming: e.detail.value.name,
            tel: e.detail.value.tel,
            age: t,
            cityname: e.detail.value.city,
            checked_school: e.detail.value.school,
            medium: "Rise(预约试听课)",
            title: "Rise(预约试听课)"
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
          case 1:
            wx.makePhoneCall({
                phoneNumber: "4006101100"
            });
            break;

          case 2:
            wx.navigateBack({
                delta: 6
            });
        }
    }
}, e(i, "onPullDownRefresh", function() {
    setTimeout(function() {
        wx.stopPullDownRefresh();
    }, 2e3);
}), e(i, "bindPickerChange", function(e) {
    this.setData({
        index: e.detail.value
    });
}), i));