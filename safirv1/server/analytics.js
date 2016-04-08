Meteor.methods({
    eventCall: function (method, url, options) {
      HTTP.call(method, url, options, function(error, result) {
        if (error) {
          console.log('Analytics SERVER ERRR');
          console.log(error);
        } else
          console.log('Analytics SERVER RESULT');
          console.log(result);
      });
    }
  });