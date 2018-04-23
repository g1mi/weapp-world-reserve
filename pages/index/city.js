Page({
    data: {
        cityarr: [],
        list: [],
        alpha: "",
        windowHeight: "",
        id: ""
    },
    onLoad: function(a) {
        var t = this;
        wx.request({
            url: "https://m.risecenter.com/xyapi.php?act=getCity",
            data: {},
            success: function(e) {
                t.setData({
                    cityarr: e.data,
                    id: a.eid,
                    list: [ {
                        alphabet: "Top",
                        datas: e.data.hotcity
                    }, {
                        alphabet: "A",
                        datas: e.data.A
                    }, {
                        alphabet: "B",
                        datas: e.data.B
                    }, {
                        alphabet: "C",
                        datas: e.data.C
                    }, {
                        alphabet: "D",
                        datas: e.data.D
                    }, {
                        alphabet: "E",
                        datas: e.data.E
                    }, {
                        alphabet: "F",
                        datas: e.data.F
                    }, {
                        alphabet: "G",
                        datas: e.data.G
                    }, {
                        alphabet: "H",
                        datas: e.data.H
                    }, {
                        alphabet: "I",
                        datas: e.data.I
                    }, {
                        alphabet: "J",
                        datas: e.data.J
                    }, {
                        alphabet: "K",
                        datas: e.data.K
                    }, {
                        alphabet: "L",
                        datas: e.data.L
                    }, {
                        alphabet: "M",
                        datas: e.data.M
                    }, {
                        alphabet: "N",
                        datas: e.data.N
                    }, {
                        alphabet: "O",
                        datas: e.data.O
                    }, {
                        alphabet: "P",
                        datas: e.data.P
                    }, {
                        alphabet: "Q",
                        datas: e.data.Q
                    }, {
                        alphabet: "R",
                        datas: e.data.R
                    }, {
                        alphabet: "S",
                        datas: e.data.S
                    }, {
                        alphabet: "T",
                        datas: e.data.T
                    }, {
                        alphabet: "U",
                        datas: e.data.U
                    }, {
                        alphabet: "V",
                        datas: e.data.V
                    }, {
                        alphabet: "W",
                        datas: e.data.W
                    }, {
                        alphabet: "X",
                        datas: e.data.X
                    }, {
                        alphabet: "Y",
                        datas: e.data.Y
                    }, {
                        alphabet: "Z",
                        datas: e.data.Z
                    } ]
                });
            }
        });
        try {
            var e = wx.getSystemInfoSync();
            this.pixelRatio = e.pixelRatio, this.apHeight = 16, this.offsetTop = 80, this.setData({
                windowHeight: e.windowHeight + "px"
            });
        } catch (a) {}
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    clickinput: function(a) {
        var t = this, e = "http://mrise.zhyunfe.com/xyapi.php?act=searchCity&search_key=" + a.detail.value;
        wx.request({
            url: e,
            data: {},
            success: function(a) {
                t.setData({
                    cityarr: a.data,
                    list: [ {
                        alphabet: "search",
                        datas: a.data
                    } ]
                });
            }
        });
    },
    handlerAlphaTap: function(a) {
        var t = a.target.dataset.ap;
        console.log("索引", {
            ap: t
        }), this.setData({
            alpha: t
        });
    },
    handlerMove: function(a) {
        var t = this.data.list, e = a.touches[0].clientY - this.offsetTop;
        if (e >= 0) {
            var d = Math.ceil((e - this.apHeight) / this.apHeight);
            if (0 <= d < t.length) {
                var s = t[d];
                s && this.setData({
                    alpha: s.alphabet
                });
            }
        }
    }
});