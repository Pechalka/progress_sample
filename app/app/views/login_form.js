var LoginForm = Backbone.View.extend({
	el:  $("#login-form"),
	events : {
		'click .btn-success' : 'login',
		'click .logout' : 'logout'
	},
	logout : function(){
		socket.emit('logout');
		return false;
	},
	login : function(){

		socket.emit('login', { login : 'test' })

		return false;
	}
});