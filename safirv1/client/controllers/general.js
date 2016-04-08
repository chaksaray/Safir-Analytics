// No need to command this function (getImgForProduct & getImg), please.
Template.registerHelper('getImgForProduct', function (id_product) {
    //console.log('calling img for '+id_product);
    return getImgForProduct(id_product);

});
getImgForProduct = function(id_product){
    var p=products.findOne({_id:id_product});
    if(p.image instanceof Array)
        var id= p.image[0];
    else
        var id= p.image;

    if(id=='' || typeof id == "undefined")
        return '/img/unknown.png';

    else if(id.indexOf("uploads")>-1){
        id=id.replace(/ /g, "%20");
        path = id.replace('/uploads/images/','');
        return 'http://164.138.19.140/images/'+path;

    }
    else if(id.indexOf("http://")>-1){ 
        console.log("hi img 2");
        return id;

    }else{
        var img = images.findOne({_id:id});
        if(img){
            var id= img.copies.images.key;
            //path=id.replace('images','');
            return 'http://164.138.19.140/'+id;
            //return '/uploads/'+id;
        }else{
            return;
        } 
    }
}
//For user upload
Template.registerHelper('getImg', function (id) {
    console.log("IMG "+id);
    return getImg( id );

});
getImg = function ( id ) {
   if(id=='' || typeof id == "undefined")
        return '/img/unknown.png';

    else if(id.indexOf("uploads/images")>-1){
        id=id.replace(/ /g, "%20");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        //path = id.replace('/uploads/images/','');
        //return 'http://d1ak0tqynavn2m.cloudfront.net/'+path;
         return id;
    }
    else if(id.indexOf("http://")>-1){
        return id;

    }else{
        var img = images.findOne({_id:id});
        if(img){
            var id= img.copies.images.key;
            path = id.replace('images/','');
            //path=id.replace('UserUploads/','');
            //return 'http://d2l5w8pvs4gpu2.cloudfront.net/'+path;
             return '/uploads/'+path;//return '/uploads/'+id;

        }else{
            return;
        } 
    }
}
// end

Template.registerHelper('trimString', function(passedString) {
    var theString = passedString.substring(0,110);
    return new Handlebars.SafeString(theString)
});

Template.registerHelper('getDate', function (curdate) {
    console.log('date'+curdate);
    var d = new Date(curdate);
    var months=Number(d.getMonth())+1;
    var str=d.getDate()+"/"+months+"/"+d.getFullYear();
    return str;
}); 

Template.registerHelper('recap', function (text) {
    return text.split(" ").splice(0,3).join(" ");
}); 

Template.registerHelper('getTotal', function (text) {
    return Session.get("total");
}); 

Template.registerHelper('getProductInfo', function (item_id) {
    var cartItem=cart.findOne({"_id":item_id});
    var pro=products.findOne({"_id":cartItem.id_product});
    var shop = cartItem.shop; //shops.findOne({"_id":cartItem.shop});  
    return {_id:item_id,product:pro, qty:cartItem.quantity, subtotal:cartItem.subtotal, item_id:item_id,shop:shop};
}); 

Template.registerHelper('getCart', function (curdate) {
    var mycart = '';
    userid = Session.get('userId');
    mycart = cart.find({userId:userid});
    var total = 0;
    mycart.forEach( function(value,index){
        total = total + value.subtotal;
        })
        Session.set("total", total);
        return mycart;
    }); 

    var clock = 100;
    var timeLeft = function() {
        if (clock > 0) {
            clock--;
            Session.set("time", clock);
    } else {
        return Meteor.clearInterval(interval);
    }
};

var interval = Meteor.setInterval(timeLeft, 1000);

Template.registerHelper("time", function() {
    return Session.get("time");
});


Template.registerHelper("getFirstImgContent",function(id){
    var p=contents.findOne({_id:id});
    if(p.image instanceof Array)
        return p.image[0];
    else
        return p.image;
});

Template.registerHelper("getFirstImgProduct",function(id){
    var p=products.findOne({_id:id});
    if(p.image instanceof Array)
        return p.image[0];
    else
        return p.image;
});

Template.registerHelper("validProduct",function(img,price){
    if(typeof price === "undefined" || price=="" || typeof img === "undefined" || img=="")
        return false;
    else
        return true;
});

Template.registerHelper("getDirection",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'rtl';
    else
        return 'ltr'
});

Template.registerHelper("getCurrentLanguage",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'fa-IR';
    else
        return 'en'
});

Template.registerHelper("getDirectionMenu",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'navbar-right';
    else
        return 'navbar-left'
});

Template.registerHelper("classCom",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'megamenu_left';
    else
        return 'megamenu_right'
    });

Template.registerHelper("classItem",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'megamenu_right';
    else
        return 'megamenu_left'
    });
Template.registerHelper("backCom",function(img,price){
    if(TAPi18n.getLanguage()=='fa')
        return 'background:url(/images/bg_nav1.png)';
    else
        return 'background:url(/images/bg_nav_right.png)'
    });


Template.registerHelper("smaller",function(text,size){
    var finalText='';
        var line=text.split(' ');
        if(line.length<size)
            var wordmax=line.length;
        else
            wordmax=size;
        for(var i=0;i<wordmax;i++){
            finalText=finalText+line[i]+' ';
        }
        return finalText;
});

Template.registerHelper("slug",function(){
    return slugname( this.title );
});
var slugname = function( title ){
    title = title.replace(/\-/g,"(minus)");
    title = title.replace(/\s/g,"-");
    title = title.replace(/\%/g,"(percentag)");
    title = title.replace(/\+/g,"(plush)");
    title = title.replace(/\ô/g,"(ocir)");
    title = title.replace(/\®/g,"(copyright)");
    title = title.replace(/\°/g,"(number)");
    title = title.replace(/\Ô/g,"(bigocir)");
    title = title.replace(/\²/g,"(square)");
    title = title.replace(/\`/g,"(accentaigu)");
    title = title.replace(/\é/g,"(eaccentaigu)");
    title = title.replace(/\É/g,"(bigeaccentaigu)");
    title = title.replace(/\&/g,"(and)");
    title = title.replace(/\//g,"(slash)");
    title = title.replace(/\’/g,"(apostrophe)");
    title = title.replace(/\'/g,"(quote)");
    title = title.replace(/\!/g,"(warning)");
    title = title.replace(/\?/g,"(question)");
    title = title.replace(/\$/g,"(dolla)");
    title = title.replace(/\è/g,"(eaccentgrave)");
    title = title.replace(/\–/g,"(hyphen)");
    //title = title.toLowerCase();
    return title;
}
    
Template.registerHelper("unSlug",function(){
    var title = this.title;
    title = title.replace(/\-/g," ");
    title = title.replace(/\(percentag\)/g,"%");
    title = title.replace(/\(plush\)/g,"+");
    title = title.replace(/\(ocir\)/g,"ô");
    title = title.replace(/\(minus\)/g,"-");
    title = title.replace(/\(copyright\)/g,"®");
    title = title.replace(/\(number\)/g,"°");
    title = title.replace(/\(bigocir\)/g,"Ô");
    title = title.replace(/\(square\)/g,"²");
    title = title.replace(/\(accentaigu\)/g,"`");
    title = title.replace(/\(eaccentaigu\)/g,"é");
    title = title.replace(/\(bigeaccentaigu\)/g,"É");
    title = title.replace(/\(and\)/g,"&");
    title = title.replace(/\(slash\)/g,"/");
    title = title.replace(/\(apostrophe\)/g,"’");
    title = title.replace(/\(quote\)/g,"'");
    title = title.replace(/\(warning\)/g,"!");
    title = title.replace(/\(question\)/g,"?");
    title = title.replace(/\(dolla\)/g,"$");
    title = title.replace(/\(eaccentgrave\)/g,"è");
    title = title.replace(/\(hyphen\)/g,"–");
    return title;
});

Template.registerHelper("slugProduct",function(){
    var title=this.title;
    title=title.toLowerCase();
    title=title.replace(/ /g, "-");
    title=title.replace(/\+/g, "(plus)");
    title=title.replace(/ô/g, "(o-cir)");
    return title;
});

Template.registerHelper("getMenuClass",function(index){
    if(TAPi18n.getLanguage()=='fa')
        return 'dropdown_fullwidth';
        if(index==1)
            return 'dropdown_fullwidth';
            //return 'dropdown_6columns dropdown_container';
        index=Number(index);
        var newIndex=12-(1*index);
        var str='dropdown_'+newIndex+'columns dropdown_container'
        return str;
});

Template.registerHelper("convertMsTimeStamp", function(tms) {
         var d = new Date(tms), // Convert the passed timestamp to milliseconds
           yyyy = d.getFullYear(),
           mm = ('0' + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
           dd = ('0' + d.getDate()).slice(-2),   // Add leading 0.
           hh = d.getHours(),
           h = hh,
           min = ('0' + d.getMinutes()).slice(-2),  // Add leading 0.
           ampm = 'AM',
           hTime;
            
          if (hh > 12) {
           h = hh - 12;
           ampm = 'PM';
          } else if (hh === 12) {
           h = 12;
           ampm = 'PM';
          } else if (hh == 0) {
           h = 12;
          } 
          // ie: 2013-02-18, 8:35 AM 
           hTime = yyyy + '/' + mm + '/' + dd + ', ' + h + ':' + min + ' ' + ampm;
        return hTime;
    });
// ==========makara=======================
Template.registerHelper("getReviewBySort", function(review) {
    var attr=[];

    var result=review.sort(function(x, y){
    return y.date - x.date;
    });
    if(Session.get("numberReviews") == false){
        if (review.length<5){
            return result;
        }else{
            for (var i=0;i<5;i++){
            attr.push(result[i]);           
            }
            return attr;
        }
        return attr;
    }else{
        return result;
    }
    
    
});
//======end makara==============================

Template.registerHelper("capitalWord", function(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}); 
Template.registerHelper("getprofile",function(userId, topic, category, id, date, description){
    //var user = Meteor.users.findOne({_id:userId});
    //console.log(user);
    Meteor.call('getUser', userId, function(err, data){
        if(!err) Session.set("USERDATA"+userId, data); 
        //console.log('_id:'+userId);
    })
    var user = Session.get("USERDATA"+userId);
    var info = {topic:topic, category:category, forumId:id, date:date, description:description};
    if(typeof user !='undefined' && user !="" ){
        if(typeof user.image !='undefined'){
            return {status:true, imageId:user.image, info:info, name:user.profile.firstname}
        }else{
            return {status:false, info:info, name:user.profile.firstname};    
        }
    }else{
         return {status:false}; 
    }
});
Template.registerHelper("getHumanTime",function(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
});

Template.registerHelper("getListprice", function(oldId) {
    var attrprice = attribute.findOne({"product":oldId});
        return attrprice;

    }); 
//====================relate product content====================
Template.registerHelper('related_product',function(categoryId){
        var resultRandom=products.find();
        var dataLenght=false;
        if(resultRandom.count()>0) dataLenght=true;
        return {productsRelat:resultRandom,dataLenght:dataLenght};
});
item1 = 0;
counter1 = 0;
item2 = 0;
counter2 = 0;
item3 = 0;
counter3 = 0;

Template.registerHelper('oneSlide1',function( data ){
    if( data ){
        var html = '';
        data.forEach( function(value, index){
            var result =  products.findOne({"_id":value});
            item1 = item1 + 1;
            counter1 = counter1 +1;
             var active = '';
            if( counter1 ==1) active = 'active';
            if( item1 == 1){
                html += '<div class="item '+active+'"><div class="row">';
            }
            html += oneProduct(result);
            if( item1 ==4 ){
                 html += '</div></div>';
                 item1 = 0;
            }     
        });
        return html;
    }
});
Template.registerHelper('oneSlide2',function( data ){
    if( data ){
        var html = '';
        data.forEach( function(value, index){
            var result =  products.findOne({"_id":value});
            item2 = item2 + 1;
            counter2 = counter2 +1;
             var active = '';
            if( counter2 ==1) active = 'active';
            if( item2 == 1){
                html += '<div class="item '+active+'"><div class="row">';
            }
            html += oneProduct(result);
            if( item2 ==4 ){
                 html += '</div></div>';
                 item2 = 0;
            }     
        });
        return html;
    }
});
Template.registerHelper('oneSlide3',function( data ){
    if( data ){
        var html = '';
        data.forEach( function(value, index){
            var result =  products.findOne({"_id":value});
            item3 = item3 + 1;
            counter3 = counter3 +1;
             var active = '';
            if( counter3 ==1) active = 'active';
            if( item3 == 1){
                html += '<div class="item '+active+'"><div class="row">';
            }
            html += oneProduct(result);
            if( item3 ==4 ){
                 html += '</div></div>';
                 item3 = 0;
            }     
        });
        return html;
    }
});
Template.registerHelper('getSelectedProduct',function( ){

    var id = Session.get('quickview');
    console.log('Quick View:'+ id);
    if(id=='')
        return null;

    var currentProduct=products.findOne({"_id":id});
    console.log( 'Data Count:'+ currentProduct )
    return currentProduct;
});
Template.home.events({
    'click #quickbtn': function(e,tpl){
         e.preventDefault();
        var productId = $(e.currentTarget).attr('data-id');
        Session.set('quickview', productId);
    }
})
Template.listproducts.events({
    'click #quickbtn': function(e,tpl){
        e.preventDefault();
        var productId = $(e.currentTarget).attr('data-id');
        Session.set('quickview', productId);
    }
})
Template.recommendation.events({
    'click #quickbtn': function(e,tpl){
         e.preventDefault();
        var productId = $(e.currentTarget).attr('data-id');
        Session.set('quickview', productId);
    }
})
Template.registerHelper('oneStyleProduct',function( products ){
    if( products ){
        var data = '';
        products.forEach( function(value, index ){
            data += oneProduct(value);
        })
        return data;
    }
})

oneProduct = function(result){
    var product_id = result._id;
    var title = result.title;
    var price = result.price;

    var img = getImgForProduct( result._id);
    var myslug = slugname( title );

    var html = '';
    html += '<li class="col-md-3 col-sm-6">';
    html +=     '<div class="thumbnail">';
    html +=         '<div class="hold-quickview">';
    html +=             '<a href="/details/'+myslug+'"><img src="'+img+'" alt="'+title+'"></a>';
    html +=             '<div class="quickview"><button type="button" data-id="'+product_id+'" id="quickbtn" class="btn btn-quickview center-block btn-block" data-toggle="modal" data-target="#quickView">Quick View</button></div>';
    html +=         '</div>';
    html +=         '<div class="caption">';
    html +=             '<p class="title"><a href="/details/'+myslug+'">'+title+'</a></p>';
    html +=             '<div class="rating">';
    //html +=                 '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span></div>';
    html +=                 '<p>';
    html +=                     '<a class="price pull-left">'+price+' </a>';
    //html +=                     '<a href="#" data-id="'+product_id+'" class="heart pull-right unlike unlike'+product_id+'"><span class="fa fa-heart-o"></span></a>';
    //html +=                     '<a href="#" data-id="'+product_id+'" class="heart pull-right like nonelike like'+product_id+'"><span class="fa fa-heart fa-heart-full"></span></a>';
    html +=                 '</p>';
    html +=             '</div>';
    html +=        '</div>';
    html += '</li>';
    return html;
}