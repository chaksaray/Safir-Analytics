Meteor.methods({
	addLocation:function(obj){
		return locations.insert(obj);
	},
	updateLocation:function(id,obj){
		return locations.update({_id:id},{$set:obj});
	},
	deleteLocation:function(id){
		locations.remove(id);
	}
});