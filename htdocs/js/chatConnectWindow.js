// WebChat2.0 Copyright (C) 2006-2007, Chris Chabot <chabotc@xs4all.nl>
// Licenced under the GPLv2. For more info see http://www.chabotc.com
var channel = getUrlVars()["channels"];
chatConnectWindow = Class.create();
Object.extend(Object.extend(chatConnectWindow.prototype, chatWindow.prototype), {
	initialize: function(id) {
		if(channel == null){
			channel = "#android";
		} else {
			if(channel.substring(0,1) != '#') channel = "#"+channel;
		}
		this.windowInitialize(id, arguments[1] || {});
		this.divNickname = this.id+'_nickname_input';
		this.localServers    = ['127.0.0.1'];
		$(this.divContent).update('<div class="list_content">'+
		                               'Enter your nickname:<br />'+
		                               '<div class="nickname_input" id="'+this.divNickname+'"><input type="text" name="input_nickname" id="input_nickname" /></div><br />'+
					       'Enter a channel:<br />'+
					       '<div class="channel_input" id="'+this.divChannel+'"><input type="text" name="input_channel" id="input_channel" value="'+channel+'"/></div><br />'+
					       'Current known issues located <a href="https://github.com/zifnab06/webchat/issues" target="_blank">here</a>.'+
		                               '<div class="button" id="connect_button"><div class="button_left"></div><div class="button_center"><div class="button_text">Connect</div></div><div class="button_right"></div></div>'+
		                               '</div>');
		this.setTitle('Connect');
		$('connect_button').observe('click', this.onConnect);
	},

	onConnect: function(event) {
		if (event != undefined && event && event.stopPropagation != undefined) {
			event.stopPropagation();
		}
		var server   = '';
		var channel = $F('input_channel');
		var nickname = $F('input_nickname');
		server = $A(chat.connectWindow.localServers).random();
		
		if (server && nickname != '' && nickname != undefined) {
			chat.connect(nickname, channel, server);
		}
	}
});
