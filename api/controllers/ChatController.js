/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	joinUser: function(req, res){
 		console.info("Se une un usuario nuevo al chat");
 		if (!req.isSocket) {return res.badRequest();}
 		sails.sockets.join(req, 'PionerasDev');
 	},

 	sendMessage: function(req, res){
 		var data = {};
 		data.user = req.param("user");
 		data.message = req.param("message");
		sails.sockets.broadcast('PionerasDev', 'message', data);
 	}

 };

