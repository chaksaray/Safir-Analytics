Session.set('quickview','');

Template.home.rendered=function(){
	//$('#ca-container').contentcarousel();
	//$('#ca-container1').contentcarousel();
	//$('#ca-container2').contentcarousel();
    item1 = 0,counter1 = 0, item2 = 0, counter2 = 0, item3 = 0, counter3 = 0;								
};
var item = 0;
Template.home.helpers({
	list1: function(){
		return list_product.find().fetch()[0];
	},
	list2: function(){

		return list_product.find().fetch()[1];
	},
	list3: function(){

		return list_product.find().fetch()[2];
	},
	getProduct: function(id){
		console.log("ID getProduct " + id);
		var result =  products.findOne({"_id":id});
		return result;
	},
	contents : function(){
		var type=contents_type.findOne({"type":"Webzine"});
		if(type!=null)
			return contents.find({"typeid":type._id});
	},
	getContentImg: function(id){
		var p=contents.findOne({_id:id});
		if(p.image instanceof Array)
			return p.image[0];
		else
			return p.image;
	},
	/*getSelectedProduct: function(){
        var id=Session.get('quickview');

        if(id=='')
            return null;

        var currentProduct=products.find({"_id":id});
        return currentProduct;
    }*/
});

Template.home.events({
	/*'click #quickbtn': function(e,tpl){
         e.preventDefault();
        var productId = $(e.currentTarget).attr('data-id');
        Session.set('quickview', productId);
    },*/
    /*'mouseover .thumbnail': function(e,tpl){
        $(e.currentTarget).find('.caption').slideDown(250);

    },
     'mouseleave .thumbnail': function(e,tpl){
        $(e.currentTarget).find('.caption').slideUp(250);
    },*/
     /*'click #quickbtn': function(e,tpl){
        var productId=this._id;
        Session.set('quickview',productId);
    },*/
    'click #addtocart':function(e,tpl){       
        e.preventDefault();
        var id_product=this._id;
        var qty=tpl.$("#qty").val();
        var attribute=Session.get('selected_attr');
        if(attribute=='No attribute')
            attribute='';   
        var userId = Session.get('userId');
        var subtotal = 0;

        var sameproduct = cart.find({ id_product:id_product, userId:userId,attribute:attribute}).fetch();
        
        if( sameproduct.length>0){
            sameproduct=sameproduct[0];
            var pro = products.findOne({_id:id_product});
            upqty = parseInt( sameproduct.quantity ) + parseInt(qty);
            if( pro ){
                subtotal = upqty * parseInt(pro.price);
            }
            console.log('update of the cart');
            var obj={quantity: upqty, subtotal:subtotal};
            Meteor.call('updateStatus',sameproduct._id,obj);
            Bert.alert('Insert Addtocart success','success','growl-bottom-right');
            $('.close').click();
            Router.go("/checkout");
        }else{
            var pro = products.findOne({_id:id_product});
            if( pro ){
                subtotal = parseInt(qty) * parseInt(pro.price);
            }
            else
                subtotal=0;
            var obj={
                id_product:id_product,
                userId:Session.get('userId'),
                quantity:qty,
                subtotal:subtotal,
                /*shop:shop,*/
                attribute:attribute,
                order_status:0
            };
            Meteor.call('addtocart',obj);
            Bert.alert('Insert Addtocart success','success','growl-bottom-right');
            $('.close').click();
            Router.go("/checkout");
        }
    }     
});

