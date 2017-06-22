if (window.Notification) {
	var list = JSON.parse(localStorage.bili_task)
	var now = new Date().getTime()
	var testList = []
	var onlineList = []
	list.forEach(function(item, index, array) {
		var test_s = new Date(item.test_time + ' 00:00:01').getTime()
		var test_e = new Date(item.test_time + ' 23:59:59').getTime()

		var online_s = new Date(item.online_time + ' 00:00:01').getTime()
		var online_e = new Date(item.online_time + ' 23:59:59').getTime()

		if(now > test_s && now < test_e) {
			testList.push(item.task_name)
		}

		if(now > online_s && now < online_e) {
			onlineList.push(item.task_name)
		}
	})

	var content = ''
	var is_line = ''
	if(testList.length) {
		if(onlineList.length) {
			is_line = '\n'
		}
		content += '今天需要提测的项目有：' + testList.join("，") + is_line
	} 

	if(onlineList.length) {
		content += '今天需要上线的项目有：' + onlineList.join("，")
	}

	if(!testList.length && !onlineList.length) {
		content += '今天风平浪静 ╮(￣▽￣)╭'
	}

    var popNotice = function() {
        if (Notification.permission == "granted") {
            var notification = new Notification("哔哩哔哩 (゜-゜)つロ 干杯~", {
                body: content,
                icon: 'http://i0.hdslb.com/bfs/vc/c8ce2148372689e89710247bd014d6cb0b94999f.jpg@396w.jpg'
            })
        }    
    }
    
    if (Notification.permission == "granted") {
        popNotice()
    } else if (Notification.permission != "denied") {
        Notification.requestPermission(function (permission) {
          	popNotice()
        })
    }
} else {
    alert('浏览器不支持Notification')
}