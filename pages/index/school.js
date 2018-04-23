Page({
    data: {
        schoolarr: [],
        cityname: "",
        lat: "",
        lon: "",
        id: "",
        eid: ""
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("lat"), a = wx.getStorageSync("lng"), n = this;
        if (0 != t.reid.length) {
            this.setData({
                cityname: t.cityname,
                id: t.reid,
                eid: t.id
            }), wx.getLocation({
                success: function(t) {
                    n.setData({
                        lat: t.latitude
                    });
                }
            });
            var o = "https://m.risecenter.com/xyapi.php?act=getSchool&reid=" + t.reid + "&lat=" + e + "&lng=" + a;
            wx.request({
                url: o,
                success: function(t) {
                    n.setData({
                        schoolarr: t.data
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请先选择城市",
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.navigateBack({
                    delta: 2
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
    clickschool: function(t) {
        var e = this.data.cityname, a = t.currentTarget.dataset.school, n = getCurrentPages(), o = this.data.id, c = "", i = "";
        3 == n.length ? (c = 1, i = 3) : 4 == n.length ? (c = 2, i = 3) : 5 == n.length ? (c = 3, 
        i = 3) : (c = 2, i = 2), 3 == n.length && 1 == this.data.eid && (c = 2, i = 2), 
        4 == n.length && 6 == this.data.eid && (c = 3, i = 2), n[n.length - i].setData({
            city: e,
            school: a,
            reid: o
        }), wx.navigateBack({
            delta: n.length - c
        });
    },
    clickcall: function(t) {
        var e = t.currentTarget.dataset.call;
        wx.makePhoneCall({
            phoneNumber: e
        });
    }
});