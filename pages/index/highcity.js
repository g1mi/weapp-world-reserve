Page({
    data: {
        cityarr: [],
        city: "",
        list: []
    },
    onLoad: function(a) {
        var t = this;
        wx.request({
            url: "https://m.risecenter.com/xyapi.php?act=getCity",
            data: {},
            success: function(a) {
                t.setData({
                    cityarr: a.data,
                    list: [ {
                        alphabet: "Top",
                        datas: a.data.hotcity
                    }, {
                        alphabet: "A",
                        datas: a.data.A
                    }, {
                        alphabet: "B",
                        datas: a.data.B
                    }, {
                        alphabet: "C",
                        datas: a.data.C
                    }, {
                        alphabet: "D",
                        datas: a.data.D
                    }, {
                        alphabet: "E",
                        datas: a.data.E
                    }, {
                        alphabet: "F",
                        datas: a.data.F
                    }, {
                        alphabet: "G",
                        datas: a.data.G
                    }, {
                        alphabet: "H",
                        datas: a.data.H
                    }, {
                        alphabet: "I",
                        datas: a.data.I
                    }, {
                        alphabet: "J",
                        datas: a.data.J
                    }, {
                        alphabet: "K",
                        datas: a.data.K
                    }, {
                        alphabet: "L",
                        datas: a.data.L
                    }, {
                        alphabet: "M",
                        datas: a.data.M
                    }, {
                        alphabet: "N",
                        datas: a.data.N
                    }, {
                        alphabet: "O",
                        datas: a.data.O
                    }, {
                        alphabet: "P",
                        datas: a.data.P
                    }, {
                        alphabet: "Q",
                        datas: a.data.Q
                    }, {
                        alphabet: "R",
                        datas: a.data.R
                    }, {
                        alphabet: "S",
                        datas: a.data.S
                    }, {
                        alphabet: "T",
                        datas: a.data.T
                    }, {
                        alphabet: "U",
                        datas: a.data.U
                    }, {
                        alphabet: "V",
                        datas: a.data.V
                    }, {
                        alphabet: "W",
                        datas: a.data.W
                    }, {
                        alphabet: "X",
                        datas: a.data.X
                    }, {
                        alphabet: "Y",
                        datas: a.data.Y
                    }, {
                        alphabet: "Z",
                        datas: a.data.Z
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
    clickcity: function(a) {
        var t = getCurrentPages();
        t[t.length - 2].setData({
            city: a.currentTarget.dataset.name
        }), wx.navigateBack({
            delta: t.length - 2
        });
    },
    handlerAlphaTap: function(a) {
        var t = a.target.dataset.ap;
        this.setData({
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