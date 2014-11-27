Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    event.preventDefault();
    Accounts.createUser({
      username: template.find("#signup-email").value,
      password: template.find("#signup-password").value,
      profile: {
        name: template.find("#signup-name").value,
        surname: template.find("#signup-surname").value,
        birthdate: template.find("#signup-birthdate").value
        // Other required field values can go here
      }
      
    }, function(error) {
      if (error) {
        // Display the user creation error to the user however you want
      }
    });
  },


   "click .btn-Facebook": function () {
        event.preventDefault();
        console.log('log loginWithFacebook');
        Meteor.loginWithFacebook({
            requestPermissions: ['user_birthday', 'email'],
            requestOfflineToken: true
        }, function (err) {
            if(err) {
                console.log('loginWithFacebook error');
            } else {
              console.log('hata yok');
            }
        });
    }
});

