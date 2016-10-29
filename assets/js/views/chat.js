$(function(){
	$("#send").click(function(){
		//enviar mensaje escrito
		var data = {};
		data.user = $("#name").val();
		data.message = $("#message").val();
		
		io.socket.get('/send_message', data,  function(data, response) {

		});

		$("#message").val("");
		$("#message").focus();
	});

	//matricular usuario al chat
	io.socket.get('/join_chat', function(data, response) {
	});

	//recibir mensaje
	io.socket.on('message', function(data) {
		var tr = $("<tr><td class='td'><strong>" + data.user + " : " + "</strong>" + data.message + "</td></tr>");
		$("#table-message").find("tbody").append(tr);
	});
});