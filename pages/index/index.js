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
        array: [ "3-4岁", "4-5岁", "5-6岁", "6-12岁"],
        index: 0,
        foot: [ "../../images/all/footer-phone-shine.jpg", "../../images/all/footer-consult-shine.jpg", "../../images/all/footer-free-shine.jpg" ],
        footone: "../../images/all/footer-phone-default.jpg",
        foottwo: "../../images/all/footer-consult-default.jpg",
        foottree: "../../images/all/footer-free-default.jpg",
        footbool: !0,
        city: "",
        school: "",
        reid: "",
        footr: 0,
        footh: 0,
        indexSelect: 0,
        reserved: false,
        access_token: ''
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
        var e = this;
        wx.getStorage({
            key: "imagewidth",
            success: function(t) {
                e.setData({
                    imagewidth: t.data
                });
            }
        })
        , null, t(this);

        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx97c1a792616eb190&secret=1eb63ce603a5fa171337dbea4fd46a28',
          success(res) {
            e.setData({
              access_token: res.data.access_token
            })
          }
        });
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
  if(this.data.reserved) {
    wx.showToast({
      title: '请勿重复提交！',
      icon: 'none'
    })
    setTimeout(() => {
      this.setData({
        reserved: false
      })
    }, 10000);
    return;
  }
    var t = this.data.array[e.detail.value.age];
    if(e.detail.value.name.length === 0) {
      wx.showModal({
        title: "提示",
        content: "请填写宝贝姓名",
        showCancel: !1,
        success: function(e) {
            e.confirm && console.log("用户点击确定");
        }
      });
      return;
    }
    if(e.detail.value.tel.length === 0) {
      wx.showModal({
        title: "提示",
        content: "请填写电话号码",
        showCancel: !1,
        success: function(e) {
            e.confirm && console.log("用户点击确定");
        }
      });
      return;
    }
    let info = {
      name: e.detail.value.name,
      age: this.data.array[e.detail.value.age],
      tel: e.detail.value.tel
    };
    let info_str = JSON.stringify(info);

    console.log(this.data.access_token);
    console.log(info);
    this.setData({
      reserved: true
    })
}), e(i, "phonecall", function(e) {
  wx.makePhoneCall({
    phoneNumber: "18691780041"
  });
}), e(i, "sharePage", function(e) {
  console.log('sdaskdjkasdjkasld')
  wx.showShareMenu({
    withShareTicket: true,
    success(e) {
      console.log('shared ok')
    },
    fail(e) {
      console.log('shared fail')
    }
  })
}), e(i, "auditionview", function() {
    wx.navigateTo({
        url: "audition"
    });
}), e(i, "onPullDownRefresh", function() {
      wx.stopPullDownRefresh();
}), e(i, "onReachBottom", function() {}), e(i, "onShareAppMessage", function(e) {
    return {
        title: "World环球国际少儿英语",
        path: "/pages/index/index",
        success: function(e) {
            wx.showToast({
              title: '转发成功！'
            })
        },
        fail: function(e) {
        }
    };
}), i));