// chrome.runtime.onMessage.addListener(  
// 	function(request, sender, sendResponse) {
// 		var now = new Date().getTime()
// 		var testList = []
// 		var onlineList = []
// 		request.forEach(function(item, index, array) {
//   			var test_s = new Date(item.test_time + ' 00:00:01').getTime()
//   			var test_e = new Date(item.test_time + ' 23:59:59').getTime()

//   			var online_s = new Date(item.online_time + ' 00:00:01').getTime()
//   			var online_e = new Date(item.online_time + ' 23:59:59').getTime()

//   			if(now > test_s && now < test_e) {
//   				testList.push(item.task_name)
//   			}

//   			if(now > online_s && now < online_e) {
//   				onlineList.push(item.task_name)
//   			}
//   		})

//   		if(testList.length) {
//   			console.log('今天需要提测的项目有：' + testList.join(","))
//   		} 

//   		if(onlineList.length) {
//   			console.log('今天需要上线的项目有：' + onlineList.join(","))
//   		}

//   		if(!testList.length && !onlineList.length) {
//   			console.log('今天风平浪静 ╮(￣▽￣)╭')
//   		}
// 	}
// )
