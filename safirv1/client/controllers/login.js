Session.set("loginError", "");
Session.set("registerError", "");
Session.set("Duplicate");

Template.login.helpers({
    loginError: function() {
        var msg = Session.get("loginError");
        if (msg) return true;
        else return false;
    },
    loginErrormsg: function() {
        return Session.get("loginError");
    },
    registerError: function() {
        var msg = Session.get("registerError");
        if (msg) return true;
        else return false;
    },
    registerErrormsg: function() {
        return Session.get("registerError");
    },
    getMasage: function() {
        Session.set("Info", "رمز عبور شما مي بايست حداقل ٦ كاراكتر و شامل يك حرف بزرگ و يك حرف كوچك باشد")
        return Session.get("Info");
    },
    messageLogin: function() {
        if (Session.get('loginError')) {
            return true;
        } else {
            return false;
        }
    },
    duplicateEmail: function() {
        if (Session.get("DUPLICATE") == true) return true;
        else return false;
    }
});

Template.login.events({
    'click .close': function(e) {
        e.preventDefault();
        if (Meteor.userId()) {
            Router.go('/profile');
        } else {
            Router.go('/');
        }

    },
    'click #squarespaceModal': function(e) {
        $('#squarespaceModal').show();
    },
    'keyup .reg-password': function(e) {
        e.preventDefault();
        $(".alert-warning").addClass("hid_div");
        var password = $('.reg-password').val();
        var passwordsInfo = $('#pass-info');
        //Must contain 5 characters or more
        var WeakPass = /(?=.{6,}).*/;
        //Must contain lower case letters and at least one digit.
        var MediumPass = /^(?=\S*?[a-z])(?=\S*?[0-9])\S{6,}$/;
        //Must contain at least one upper case letter, one lower case letter and one digit.
        var StrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])\S{6,}$/;
        //Must contain at least one upper case letter, one lower case letter and one digit.
        var VryStrongPass = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{6,}$/;

        if (password) {
            if (VryStrongPass.test(password)) {
                passwordsInfo.removeClass().addClass('vrystrongpass').html("Very Strong! (Awesome, please don't forget your pass now!)");
            } else if (StrongPass.test(password)) {
                passwordsInfo.removeClass().addClass('strongpass').html("Strong! (Enter special chars to make even stronger");
            } else if (MediumPass.test(password)) {
                passwordsInfo.removeClass().addClass('goodpass').html("Good! (Enter uppercase letter to make strong)");
            } else if (WeakPass.test(password)) {
                passwordsInfo.removeClass().addClass('stillweakpass').html("Still Weak! (Enter digits to make good password)");
            } else {
                passwordsInfo.removeClass().addClass('weakpass').html("Very Weak! (Must be 6 or more chars)");
            }
        };

    },
    'click .btn_login': function(event, tpl) {
        event.preventDefault();
        var method = 'POST';
        var url = 'https://www.google-analytics.com/collect';
        var options = {
            headers: {
                'v': '1',
                'tid': 'UA-71059459-2',
                'cid': '5cbeab51-99b0-4c05-88b2-d2ba0d393aa2',
                't': 'event',
                'dp': '/login',
                'ec': 'Signin',
                'ea': 'click',
                'el': 'log in',
                'ev': '1'

            }
        }
        Meteor.call('eventCall', method, url, options, function(error, result) {
            if (error) {
                console.log('Analytic CLIENT ERRR');
                console.log(error);
            } else {
                console.log('Analytic CLIENT RESULT');
                console.log(result);
            }
        });
        $("#loginError").text("");
        var fields = $('[name=email]').val();
        email = fields;

        var password = $('[name=password]').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                console.log(error.reason);
                Session.set("loginError", error.reason);
                //$("#loginError").text("نام و یا رمز عبور شما اشتباه است! ");
            } else {
                Session.set("loginError", "");
                $('.close').click();

                var loggedInUser = Meteor.user();
                var group = 'mygroup';
                if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
                    /*Router.go(Session.get('THELASTPAGE'));*/
                    Router.go(Session.get('/manageproduct'));
                    $('.close').click();
                } else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {
                    Router.go('/profile');
                    $('.close').click();
                } else {

                    Router.go('/profile');
                    $('.close').click();
                }
            }
            Session.set('pass', null);
        });
    },
    'click #poplogin': function(event) {
        $("#squarespaceModal").modal({
            "backdrop": "static",
            "keyboard": true,
            "show": true // show the modal immediately                  
        });
    },
    'click #register': function(event) {
        event.preventDefault();
        console.log('Register in progress...');
        var username = $(".reg-username").val();
        var firstname = $('.reg-firstname').val();
        var lastname = $('.reg-lastname').val();
        var email = $('.reg-email').val();
        var password = $('.reg-password').val();
        var country = $('.reg-country').val();
        var city = $('.reg-city').val();
        var shipcard = '';
        var point = 0;
        var dataime = imedation.find();


        dataime.forEach(function(v) {
            if (v.email_imedate == email) {
                point = 5;
            }
        });

        console.log("let's start");
        var rerole = 'member';
        var msg = "";
        if (username == "" || firstname == "" || lastname == "" || email == "" || password == "") {
            if (password == "")
                if (TAPi18n.getLanguage() == 'fa') {
                    Bert.alert('رمز عبور مورد نیاز است.', 'danger', 'growl-bottom-right');
                } else {
                    Bert.alert('Password is required.', 'danger', 'growl-bottom-right');
                }
            if (email == "")
                if (TAPi18n.getLanguage() == 'fa') {
                    Bert.alert('ایمیل مورد نیاز است.', 'danger', 'growl-bottom-right');
                } else {
                    Bert.alert('Email is required.', 'danger', 'growl-bottom-right');
                }
            if (lastname == "")
                if (TAPi18n.getLanguage() == 'fa') {
                    Bert.alert('نام خانوادگی مورد نیاز است.', 'danger', 'growl-bottom-right');
                } else {
                    Bert.alert('Lastname is required.', 'danger', 'growl-bottom-right');
                }
            if (firstname == "")
                if (TAPi18n.getLanguage() == 'fa') {
                    Bert.alert('نام مورد نیاز است.', 'danger', 'growl-bottom-right');
                } else {
                    Bert.alert('Firstname is required.', 'danger', 'growl-bottom-right');
                }
            if (username == "")
                if (TAPi18n.getLanguage() == 'fa') {
                    Bert.alert('نام کاربری لازم است.', 'danger', 'growl-bottom-right');
                } else {
                    Bert.alert('Username is required.', 'danger', 'growl-bottom-right');
                }
            

            $(".register_msg").html(msg);
            Session.set("registerError", msg);
            console.log('error1');

        } else {
            if (password.length >= 6) {
                console.log('controls passed with success!');
                Meteor.call('regUser', firstname, lastname, email, password, shipcard, point, rerole, country, city, username, function(err) {
                    if (err) {
                        console.log(err.reason);
                        Session.set("registerError", err.reason);
                    } else {
                        console.log('register done!!!');
                        Session.set("registerError", "");
                        var dataImedation = imedation.find();
                        dataImedation.forEach(function(value) {
                            if (email == value.email_imedate) {
                                var profiles = Meteor.users.findOne({ _id: value.user_id }).profile;
                                if (!profiles.shipcard) {
                                    var oldShipcardid = '';
                                    var oldPoint = 0;
                                } else {
                                    var oldPoint = profiles.shipcard.point;
                                    var oldShipcardid = profiles.shipcard.shipcardId
                                }
                                var obj = {
                                    profile: {
                                        firstname: profiles.firstname,
                                        lastname: profiles.lastname,
                                        country: profiles.country,
                                        city: profiles.city,
                                        shipcard: {
                                            shipcardId: oldShipcardid,
                                            point: oldPoint + 5
                                        }
                                    }
                                }
                                Meteor.call('imedatPoint', value.user_id, obj);
                                alert('success');

                            }
                        });
                        Router.go('/success');
                    }
                });
            }
        }

    },
    'change #email': function(e) {
        e.preventDefault();
        var email = $('#email').val();
        Meteor.call('validateUserByEmail', email, function(err, data) {
            if (!err) {
                if (data == true) {
                    Session.set("DUPLICATE", true);
                } else {
                    Session.set("DUPLICATE", false);
                }
            }
        });

    }
});

Template.login.onRendered(function() {
    $(".hid_div").remove();
    $("#displayLogin").click();
    //$('.modal-backdrop').remove();
    $("#squarespaceModal").modal({
        "backdrop": "static",
        "keyboard": true,
        "show": true // show the modal immediately                  
    });
    $('#squarespaceModal').on('hidden.bs.modal', function() {
        var d = new Date();
        var date = d.toLocaleDateString();
        var obj = {
            userId: Meteor.userId(),
            date: date
        }
        var result = daily.find({ userId: Meteor.userId() }).fetch();
        if (Meteor.userId()) {
            if (result.length > 0) {
                var lastRecord = result[result.length - 1];
                if (date !== lastRecord.date) {
                    Meteor.call('insertDaily', obj);
                    Router.go('/dailyPopup');
                } else {
                    Router.go('/profile');
                }
            } else {
                Meteor.call('insertDaily', obj);
                Router.go('/dailyPopup');
            }
        } else {
            Router.go('/');
        }


    });

});

Template.success.onRendered(function() {
    $("#displayWindow").click();
});

Template.success.events({
    "click #goto-login": function() {
        $('.modal-backdrop').remove();
        Router.go('/login');
    }
});
