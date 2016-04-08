  Meteor.methods({
    eventCall: function (method, url, options) {
      HTTP.call(method, url, options, function(error, result) {
        if (error) {
          console.log('Analytic SERVER ERRR');
          console.log(error);
        } else{
          console.log('Analytic SERVER RESULT');
          console.log(result);
        }
      });
    }
  });