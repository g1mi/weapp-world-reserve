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

var i, o, n = require("../../utils/autoimage.js");

require("../../utils/wxTimer.js"), getApp();

Page((i = {
    data: {
        motto: "Hello World",
        userInfo: {},
        img: [ "../../images/index/rise_pic_01.png", "../../images/index/rise_pic_02.png", "../../images/index/rise_pic_03.png" ],
        slideHeight: 0,
        slideRight: 0,
        slideWidth: 0,
        imagewidth: 0,
        imageheight: 0,
        array: [ "3-5岁", "6-8岁", "9-12岁", "13-18岁" ],
        index: 0,
        foot: [ "https://m.risecenter.com/img/rise_phone1.jpg", "https://m.risecenter.com/img/rise_looyu1.jpg", "https://m.risecenter.com/img/rise_shiting1.jpg" ],
        head: [ "https://m.risecenter.com/img/rise_phone2.jpg", "https://m.risecenter.com/img/rise_looyu2.jpg", "https://m.risecenter.com/img/rise_shiting2.jpg" ],
        footone: "https://m.risecenter.com/img/rise_phone1.jpg",
        foottwo: "https://m.risecenter.com/img/rise_looyu1.jpg",
        foottree: "https://m.risecenter.com/img/rise_shiting1.jpg",
        footbool: !0,
        city: "",
        school: "",
        reid: "",
        footr: 0,
        footh: 0,
        indexSelect: 0
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    clock: function() {
        console.log(1);
    },
    onLoad: function() {
        wx.login({
            success: function(e) {
                e.code && wx.request({
                    url: "https://api.weixin.qq.com/sns/jscode2session",
                    data: {
                        appid: "wxcefa452fdfbee993",
                        secret: "205978937e0b9380fe8aaeee6bf7720e",
                        grant_type: "authorization_code",
                        js_code: e.code
                    },
                    method: "GET",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        console.info("登录成功返回的openId：" + e.data.openid), o = e.data.openid, null != e.data.openid & void 0 != e.data.openid ? wx.getUserInfo({
                            success: function(e) {
                                console.log("data的数据", e.userInfo.nickName);
                                var t = {
                                    openid: o,
                                    nickName: e.userInfo.nickName,
                                    avatarUrl: e.userInfo.avatarUrl,
                                    gender: e.userInfo.gender,
                                    province: e.userInfo.province,
                                    city: e.userInfo.province,
                                    country: e.userInfo.country,
                                    language: e.userInfo.language
                                };
                                wx.request({
                                    url: "https://data.risecenter.com/index.php?g=portal&m=index&a=getWechatuser",
                                    data: t,
                                    method: "POST",
                                    header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    success: function(e) {
                                        console.log("查看是否提交成功", e);
                                    }
                                });
                            },
                            fail: function(e) {
                                console.info("用户拒绝授权");
                            }
                        }) : console.info("获取用户openId失败");
                    },
                    fail: function(e) {
                        console.info("获取用户openId失败"), console.info(e);
                    }
                });
            }
        });
        var e = this;
        wx.getStorage({
            key: "imagewidth",
            success: function(t) {
                e.setData({
                    imagewidth: t.data
                });
            }
        }), wx.getLocation({
            success: function(t) {
                var i = t.latitude, o = t.longitude;
                wx.setStorage({
                    key: "lat",
                    data: i
                }), wx.setStorage({
                    key: "lng",
                    data: o
                });
                var n = "https://m.risecenter.com/xyapi.php?act=getLocation&lat=" + i + "&lng=" + o + "&distance=20000&reid=0&type=1&limit=1";
                wx.request({
                    url: n,
                    data: {},
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(t) {
                        var i = t.data[0].cityName, o = t.data[0].typename, n = t.data[0].reid;
                        e.setData({
                            city: i,
                            school: o,
                            reid: n
                        });
                    }
                });
            }
        }), t(this);
    },
    onShow: function() {
        wx.getStorage({
            key: "imagewidth",
            success: function(e) {
                that.setData({
                    imagewidth: e.imagewidth
                });
            }
        });
    },
    cusImageLoad: function(e) {
        var t = n.imageUtil(e);
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
    clickimg: function(e) {
        switch (e.currentTarget.dataset.i) {
          case 0:
            wx.navigateTo({
                url: "low"
            });
            break;

          case 1:
            wx.navigateTo({
                url: "medium"
            });
            break;

          case 2:
            wx.navigateTo({
                url: "high"
            });
        }
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        });
    }
}, e(i, "onShow", function() {}), e(i, "clickcity", function() {
    wx.navigateTo({
        url: "city"
    });
}), e(i, "clickschool", function(e) {
    wx.navigateTo({
        url: "school?reid=" + e.currentTarget.dataset.reid
    });
}), e(i, "formSubmit", function(e) {
    var t = this.data.array[e.detail.value.age];
    if (0 != e.detail.value.name.length) {
        var i = {
            xingming: e.detail.value.name,
            tel: e.detail.value.tel,
            age: t,
            cityname: e.detail.value.city,
            checked_school: e.detail.value.school,
            medium: "少儿英语培训机构排名",
            title: "少儿英语培训机构排名"
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
                        e.confirm && console.log("用户点击确定");
                    }
                });
            },
            fail: function(e) {
                console.log("请求失败", e);
            },
            complete: function(e) {}
        });
    } else wx.showModal({
        title: "提示",
        content: "请填写宝贝姓名",
        showCancel: !1,
        success: function(e) {
            e.confirm && console.log("用户点击确定");
        }
    });
}), e(i, "cellview", function(e) {
    switch (e.currentTarget.dataset.index) {
      case 0:
        wx.makePhoneCall({
            phoneNumber: "4006101100"
        }), console.log("123");
        break;

      case 1:
        wx.makePhoneCall({
            phoneNumber: "4006101100"
        });
        break;

      case 2:
        wx.navigateTo({
            url: "audition"
        });
    }
}), e(i, "auditionview", function() {
    wx.navigateTo({
        url: "audition"
    });
}), e(i, "onPullDownRefresh", function() {
    setTimeout(function() {
        wx.stopPullDownRefresh();
    }, 2e3);
}), e(i, "onReachBottom", function() {}), e(i, "onShareAppMessage", function(e) {
    return {
        title: "瑞思学科英语",
        path: "/pages/index/high?id=123",
        success: function(e) {
            console.log("转发成功");
        },
        fail: function(e) {
            console.log("转发失败");
        }
    };
}), i));