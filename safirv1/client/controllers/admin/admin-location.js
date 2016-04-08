Template.editLocation.events({
	'click #edit':function(){
		var id = this._id;
		var name = $('#name').val();
		var image = Session.get('IMAGELOCATION');
		var oldImge = $('#oldImage').val();
		var link = $('#link').val();
		var type = Session.get('TYPE');
		if(image)
			image=oldImage
		var obj = {
			name:name,
			image_id:image,
			link:link,
			type:type
		}
		Meteor.call('updateLocation',id,obj,function(err){
			if(err)
				console.log("Error edit location: "+err.reason);
			else{
				Router.go('/managelocation');
				Session.set('IMAGELOCATION',undefined);
				Session.set('TYPE',undefined);
			}
		});

	},
	'change #image':function(e){
		e.preventDefault();
	    var files = e.target.files;
	    for (var i = 0, ln = files.length; i < ln; i++) {
	      	images.insert(files[i], function (err, fileObj) {
		      	Session.set('IMAGELOCATION',fileObj._id);
	  		});
    	}
	},
	'change #type':function(e){
		e.preventDefault();
  		var type = $('#type').val();
  		Session.set("TYPE",type);
	}
});
Template.editLocation.helpers({
	getCurrentType:function(type){
		return locations.findOne({type:type}).type;
	}
});
Template.manageLocation.events({
	'click #remove':function(e){
		e.preventDefault();
		var id = this._id;
		if(confirm("Are you sure that you want to delete this?")){
			Meteor.call('deleteLocation', id);
		}
	}
});
Template.manageLocation.helpers({
	getLocation:function(){
		return locations.find();
	}
});
Template.addLocation.events({
	'click #btnAdd':function(){
		var name = $('#name').val();
		var image = Session.get('IMAGELOCATION');
		var link = $('#link').val();
		var type = Session.get('TYPE');
		var obj = {
			name:name,
			image_id:image,
			link:link,
			type:type
		}
		Meteor.call('addLocation',obj,function(err){
			if(err)
				console.log("Error location: "+err.reason);
			else{
				Router.go('/managelocation');
				Session.set('IMAGELOCATION',undefined);
				Session.set('TYPE',undefined);
			}
		});
	},
	'change #image':function(e){
		e.preventDefault();
	    var files = e.target.files;
	    for (var i = 0, ln = files.length; i < ln; i++) {
	      	images.insert(files[i], function (err, fileObj) {
		      	Session.set('IMAGELOCATION',fileObj._id);
	  		});
    	}
	},
	'change #type':function(e){
		e.preventDefault();
  		var type = $('#type').val();
  		Session.set("TYPE",type);
	}
});