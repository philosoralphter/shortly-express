var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,

  //TODO fix this shit
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      bcrypt.genSalt(10, function(err, salt){
        if (err) {
          console.log(err);
        }

        bcrypt.hash(model.get('password'), salt, null, function (err, hash){
          if (err) {
            console.log(err);
          }
          model.set('password', hash);
        })
      })
    });
  },

  checkPassword: function(pwd, cb){

    //compare found user's password to pwd
    bcrypt.compare(pwd, this.get('password'), function(err, result){
      if (err) console.log(err);
      else cb(res);
    });
  }


});

module.exports = User;
