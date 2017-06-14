window.onload = function() {
	var app = new Vue({
	  el: '#app',
	  data: {
	    list: []
	  },
	  mounted () {
	  	if (localStorage.bili_task) {
	  		this.list = JSON.parse(localStorage.bili_task)
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
	  	}
	  }
	})
}
