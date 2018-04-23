function e(e) {
    var t = e, n = 0;
    setInterval(function() {
        n++, console.log("indexSelect", n), n %= 3, console.log(n), t.setData({
            indexSelect: n
        });
    }, 1e3);
}

Page(function(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}({
    data: {
        schoolarr: [],
        foot: [ "https://m.risecenter.com/img/rise_phone1.jpg", "https://m.risecenter.com/img/rise_looyu1.jpg", "https://m.risecenter.com/img/rise_schools1.jpg" ],
        head: [ "https://m.risecenter.com/img/rise_phone2.jpg", "https://m.risecenter.com/img/rise_looyu2.jpg", "https://m.risecenter.com/img/rise_schools2.jpg" ],
        indexSelect: 0
    },
    onLoad: function(t) {
        var n = this;
        e(n), wx.getLocation({
            success: function(e) {
                var t = "https://m.risecenter.com/xyapi.php?act=getLocation&lat=" + e.latitude + "&lng=" + e.longitude + "&distance=20000&reid=0&type=1&limit=20";
                wx.request({
                    url: t,
                    data: {},
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        e.data[0].cityName, e.data[0].typename, e.data[0].reid;
                        n.setData({
                            schoolarr: e.data
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
    clickcall: function(e) {
        var t = e.currentTarget.dataset.call;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    cellview: function(e) {
        switch (e.currentTarget.dataset.index) {
          case 0:
          case 1:
            wx.makePhoneCall({
                phoneNumber: "4006101100"
            });
        }
    }
}, "onPullDownRefresh", function() {
    setTimeout(function() {
        wx.stopPullDownRefresh();
    }, 2e3);
}));