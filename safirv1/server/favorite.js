
Meteor.methods({
  insertFavoritee:function(attr){
    favorite.insert(attr);
  },
  deleteFavoritee:function(attr){
    favorite.remove({"proId":attr});
  },
  reviewtFavorite:function(attr){
    favoritereview.insert(attr);
  }

});