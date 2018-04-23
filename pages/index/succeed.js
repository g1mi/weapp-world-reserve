var i = require("../../utils/autoimage.js");

Page({
    data: {
        slideHeight: 0,
        slideRight: 0,
        slideWidth: 0,
        imagewidth: 0,
        imageheight: 0
    },
    onLoad: function(i) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    cusImageLoad: function(e) {
        var t = this, a = i.imageUtil(e);
        this.setData({
            imagewidth: a.imageWidth,
            imageheight: a.imageHeight,
            slideHeight: a.imageHeight,
            slidetop: -a.imageHeight,
            slideWidth: a.imageWidth,
            iconWidth: a.imageHeight / 2
        }), wx.getSystemInfo({
            success: function(i) {
                t.setData({
                    imageheight: i.screenHeight
                });
            }
        }), console.log("自适应图片的高度", this.data.imageheight);
    }
});