Meteor.subscribe('degerler');
Meteor.subscribe('haberler');

Accounts.ui.config({
  requestPermissions: {
     facebook: ['user_birthday'],
  }
});