var app = new Vue({
  el: '#app',
  data: {
    list: []
  },
  mounted () {
  	if (localStorage.bili_task) {
  		this.list = JSON.parse(localStorage.bili_task)
  //        popup向content发送信息
  // 		var self = this
  // 		chrome.tabs.query(
		// 	{
		// 		active: true, 
		// 		currentWindow: true
		// 	}, 
		// 	function(tabs) {  
		//   		chrome.tabs.sendMessage(
		//   			tabs[0].id, 
		//   			self.list,
		//   			function(response) {
		//     			console.log(response.farewell)
		//   			}
		//   		)
		// 	}
		// )
  	} else {
  		localStorage.bili_task = '[]'
  	}
  },
  methods: {
  	handleAdd: function() {
  		var json = {
  			task_name: '',
  			is_experience: false,
  			test_time: '',
  			online_time: ''
  		}
  		this.list.unshift(json)
  	},
  	handleUpdate: function () {
  		localStorage.bili_task = JSON.stringify(this.list)
  	},
  	handleDelete: function(index, list) {
  		this.list.splice(index, 1)
  		localStorage.bili_task = JSON.stringify(this.list)
  	},
  	handleStatus: function(index, list){
  		var now = new Date().getTime()

  		var test_s = new Date(list[index].test_time + ' 00:00:01').getTime()
  		var test_e = new Date(list[index].test_time + ' 23:59:59').getTime()

  		var online_s = new Date(list[index].online_time + ' 00:00:01').getTime()
  		var online_e = new Date(list[index].online_time + ' 23:59:59').getTime()

  		if(now > test_s && now < test_e) {
			return '今日提测'
		} else if(now > test_e & now < online_s) {
			return '测试中...'
		} else if(now > online_s && now < online_e) {
			return '今日上线'
		} else if(now > online_e) {
			return '已上线'
		} else {
			return ''
		}
  	}
  }
})