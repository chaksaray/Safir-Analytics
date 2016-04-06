Session.set('nbproducts','');
Session.set('querylimit',16);
Session.set('quickview','');
var processScroll = true;
$(window).scroll(function() {
	if (processScroll  && $(window).scrollTop() > $(document).height() - $(window).height() - 100) {
		processScroll = false;
		var oldLimit=Session.get('querylimit');
		oldLimit+=16;
		Session.set('querylimit',oldLimit);
		processScroll = true;
	}
});
Template.listproducts.helpers({
	    getListprice: function(oldId) {
        //console.log("oldID="+oldId);
        var attrprice = attribute.findOne({ "product": oldId });
        //console.log("OLDID="+oldId+'price='+attrprice.price);
        return attrprice;
    },
	 getAttribprice:function(oldId){
        //var attrprice = attribute.findOne({"product":oldId});
        //console.log('oldId='+oldId);
        Meteor.call('getAttrPrice',oldId,function(err,data){
            if(!err){
                var attr='.price'+data.product;
                $(attr).html('ریال '+data.price);
            }
        });
    },
	totalProducts: function(){
		return Session.get('allproducts');
	},
	nbproducts: function(){
		return Session.get('nbproducts');
	},
	isLiked: function(productId){
		if(Session.get('userId')){
			var ses=Session.get('userId');
			var data=  favorite.find({userId:ses});
			var object=[];
			var obj={};
			var found=false;
			data.forEach(function(entry) {
				var proid=entry.proId;
				if(proid==productId){
	            	//console.log(productId+'=>'+proid+ " favorite?");
	            	found=true;
	            }
	        });

			return found;
		}else{
			//console.log(productId+' isNotFavorite');
			return false;
		}

	},
	getBanner: function(){
		var result=categories.findOne({_id:Session.get('idBanner')}).bannercat;
		return result;
	},
	getSelectedProduct: function(){
		var id=Session.get('quickview');
		if(id=='')
			return null;
		var currentProduct=products.find({"_id":id});
		return currentProduct;
	},
	getShop: function(){
		return shops.find({});
	},
	getShopname: function( id ){
		var shop = shops.findOne({_id:id });
		if( shop ) return shop.name; 
	}
});
Template.listproducts.events({
	'click #quickbtn':function(e,tpl){
		$('.modal-backdrop').remove();
	},
	'click #favorite':function(e,tpl){
		e.preventDefault();
		var id=this._id;
		var css=$(e.currentTarget).attr("class");
		if(css=="fa fa-heart red pull-right"){
			Meteor.call('deleteFavorite',id);
			if(TAPi18n.getLanguage()=='fa'){
				Bert.alert('محصولات از برگزیدن حذف شده است','success','growl-bottom-right');
			}else{
				Bert.alert('Product has been Removed from Favorite','success','growl-bottom-right');
			}
			$('.close').click();

		}else{
			if(Session.get('userId')){
				var obj={
					proId:id,
					userId:Session.get('userId')
				}
				Meteor.call('insertFavorite',obj);
				if(TAPi18n.getLanguage()=='fa'){
					Bert.alert('محصول شده است اضافه به مورد علاقه','success','growl-bottom-right');
				}else{
					Bert.alert('Product has been Add to Favorite','success','growl-bottom-right');
				}
				$('.close').click();

			}else{
				var newId=Random.id();
				Session.setPersistent('userId',newId);

				var obj={
					proId:id,
					userId:Session.get('userId')
				}

				Meteor.call('insertFavorite',obj);
				if(TAPi18n.getLanguage()=='fa'){
					Bert.alert('محصول شده است اضافه به مورد علاقه','success','growl-bottom-right');
				}else{
					Bert.alert('Product has been Add to Favorite','success','growl-bottom-right');
				}
				$('.close').click();

			}
		}

	},
	'click .more': function(e,tpl){
		var limit=Number(Session.get('querylimit'));
		limit=limit+16;
		Session.set('querylimit',limit);
	},
	'mouseover .thumbnail': function(e,tpl){
		$(e.currentTarget).find('.caption').slideDown(250);

	},
	'mouseleave .thumbnail': function(e,tpl){
		$(e.currentTarget).find('.caption').slideUp(250);
	},
	'click #quickbtn': function(e,tpl){
		var productId=this._id;
		Session.set('quickview',productId);
	},
	'click #addtocart':function(e,tpl){
		e.preventDefault();
		var id_product=this._id;
		var qty=tpl.$("#qty").val();
		var shop=tpl.$("#shop").val();
		var attribute='none';

		if(shop==''){
			alert("Please select a shop!");
			return;
		}
		if(attribute=='No attribute')
			attribute='';

		if(Meteor.userId()){
			var userId = Meteor.userId();
			Session.setPersistent('userId',userId);
		}
		else{
			if( Session.get('userId') == ""){
				var newId=Random.id();
				Session.setPersistent('userId',newId);
			}
			var userId = Session.get('userId');
		}	

		var subtotal = 0;

		var sameproduct = cart.findOne({ id_product:id_product, userId:userId, shop:shop})
		if( sameproduct){
			var pro = products.findOne({_id:id_product})
			upqty = parseInt( sameproduct.quantity ) + parseInt(qty);
			if( pro ){
				subtotal = upqty * parseInt(pro.price);
			}
			cart.update(sameproduct._id, {$set: {quantity: upqty, subtotal:subtotal}});
		}else{
			var pro = products.findOne({_id:id_product})
			if( pro ){
				subtotal = parseInt(qty) * parseInt(pro.price);
			}
			var obj={
				id_product:id_product,
				userId:Session.get('userId'),
				quantity:qty,
				subtotal:subtotal,
				shop:shop,
				attribute:attribute,
				order_status:0
			};
			cart.insert(obj);
			if(TAPi18n.getLanguage()=='fa'){
				Bert.alert('!محصول با موفقیت به سبد خرید اضافه','success','growl-bottom-right');
			}else{
				Bert.alert('Product successfully append to cart!','success','growl-bottom-right');
			}
			$('.close').click();
			//alert('Product successfully append to cart!'+userId);
		}	 
	},
	"click #name":function(e){
		e.preventDefault();
		Session.set("GETName",'name');    		
	},
	"click #price":function(e){
		e.preventDefault();
		Session.set("GETName",'price');
	},
	"click #bestSelling":function(e){
		e.preventDefault();
		Session.set("GETName",'sell');
	}

});

Template.details.rendered=function(){
	$("[rel='tooltip']").tooltip(); 
};

