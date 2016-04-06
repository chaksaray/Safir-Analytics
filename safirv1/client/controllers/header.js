Template.header.helpers({	
	myCart: function(){
		var totalItem=0;
		var userId=Session.get('userId');
		mycart = cart.find({userId:userId});
		mycart.forEach(function(value){
			totalItem+=parseInt(value.quantity);
		});
		return totalItem;
	}
});