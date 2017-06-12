Page({
  data: {
    height: 0,
    dialogView: true,
    list: [
      {
        type: '英雄联盟',
        account: '467145532',
        password: 'asd520',
        provider: '张三',
        is_view: false,
        has_view: true
      },
      {
        type: '百度云',
        account: '18521015204',
        password: 'qwer1314',
        provider: '李四',
        is_view: false,
        has_view: true
      },
      {
        type: '迅雷',
        account: '553658059@qq.com',
        password: '5201314',
        provider: '王二',
        is_view: false,
        has_view: false
      },
      {
        type: '爱奇艺',
        account: '17621151028',
        password: 'xwg1028@',
        provider: '麻子',
        is_view: false,
        has_view: true
      },
      {
        type: '王者荣耀',
        account: '553658059',
        password: '123456',
        provider: '爸爸',
        is_view: false,
        has_view: false
      }
    ]
  },
  view: function (event) {
    if (!event.currentTarget.dataset.hasview) {
      this.setData({
        dialogView: false
      })
    } else {
      var index = event.currentTarget.dataset.index
      var param = {}
      var str = 'list[' + index + '].is_view'
      param[str] = true
      this.setData(param)
    }
  },
  cancel: function () {
    this.closeDialog()
  },
  confirm: function () {
    this.closeDialog()
  },
  closeDialog () {
    this.setData({
      dialogView: true
    })
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '来自爸爸的关爱',
      path: '/list/list',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})