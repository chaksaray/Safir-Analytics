Meteor.methods({
    eventCall: function (method, url, options) {
      HTTP.call(method, url, options, function(error, result) {
        if (error) {
          console.log('Analytics SERVER ERRR');
          console.log(error);
        } else
          console.log('Analytics SERVER RESULT');
          ga('send', 'event', 'Videos', 'play', 'Fall Campaign');
          console.log(result);
      });
    }
  });