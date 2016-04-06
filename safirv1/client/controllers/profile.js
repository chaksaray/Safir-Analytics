Session.set('ADDAVATAR','');
Session.set("error_mg","");
Template.profile.helpers({
    getprofile:function(){
        var id = Meteor.userId();
        return Meteor.users.findOne({_id:id});
    },
    getquestions:function(){
        return question.find({});
    },
    Answer:function(qId){
        var id = Meteor.userId();
        var answer = "";
        var question = Meteor.users.findOne({_id:id,"answerdata.qcmId":qId});
        question.answerdata.forEach(function(i){
            if(i.qcmId == qId){
                answer = i.answer;
            }
       });
        return answer;
    }
});

Template.editprofile.helpers({
    getprofile:function(){
        var id = Meteor.userId();
        var profile = Meteor.users.find({_id:id});
        return profile;
    },
    error_message: function (){
        var msg = Session.get('error_mg',msg);
            if( msg !="" ) return msg;
            else msg ='';
        }
});

Template.editprofile.events({
    'click #updateProfile': function(event){
        event.preventDefault();
        var firstname =$('#firstname').val();
        var lastname =$('#lastname').val();
        var birth = $('#birth').val();
        var sex = $('#gender').val();
        var address = $('#address').val();
        var id = Meteor.userId();
        var point = 5;
        var profile = Meteor.users.findOne({_id:id}).profile.firstname;
            var upoint = Meteor.users.findOne({_id:id}).profile.shipcard.point;
            upoint+=point;
            var attr= {
              profile:{
                firstname:firstname,
                lastname:lastname,
                sex:sex,
                birth:birth,
                address:address,
               shipcard:
               {
               point:upoint
               }
             }
            }
                var error_mg="";
                if( firstname  =="" || lastname =="" || address ==""){

                    if (firstname =="")
                            error_mg += "Firstname is requied";
                    if (lastname =="")
                            error_mg += "Lastname is requied";
                    if (address =="")
                            error_mg +="Address is requied";
                    return Session.set("error_mg",error_mg);

                }else {
                    Session.set("error_mg","");
                    delete Session.keys['error_mg'];
                    var profile = {
                    firstname:firstname,
                    lastname:lastname,
                    sex:sex,
                    birth:birth,
                    address:address
                   };
            if(Session.get('ADDAVATAR')!=''){
                var img_id = Session.get('ADDAVATAR');
                var obj={
                    profile:profile,
                    image:img_id
                };
            }else{
                var obj={
                    profile:profile,
                };
            }
            Meteor.call('editprofile',id,obj);
            if(TAPi18n.getLanguage()=='fa'){
                Bert.alert('مشخصات به روز شده است','success','growl-bottom-right');
            }else{
                Bert.alert('Profile has been Updated','success','growl-bottom-right');
            }
            $('.close').click();
            Meteor.call('addpoint',id,attr);
        }

        Router.go('profile');
    },
    'change #upload': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            Session.set('ADDAVATAR',fileObj._id);

          });
        }
    }
});
Template.profile.events({
    'click #btn-answer': function(e){
        var value=[];
        var attr = [];
        e.preventDefault();
        var id = Meteor.userId();
        var answer = $('[name=answer]');
        answer.each(function(i,val){
            if(val){
                var val=$(this).val();
                 value.push(val);
            }
        });
        var qcm = [];
        var question = $('[name=question]');
        question.each(function(i,val1){
            var val1=$(this).val();
             qcm.push(val1);
        });
        for(var i=0;i<value.length;i++){
            obj = {
                qcmId:qcm[i],
                answer:value[i]
            }
            attr.push(obj);
        }
        var array = {answerdata:attr};
            Meteor.call('addanswer',id,array);
    }
});
Template.editprofile.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

Template.member.helpers({
    getprofile:function(){
        var id = Meteor.userId();
        return Meteor.users.findOne({_id:id});
    }
});
