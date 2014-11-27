Meteor.publish('degerler', function(){
	return Degerler.find();
});

Meteor.publish('haberler', function(){
	return Haberler.find();
});


Meteor.startup(function () {

            if (Degerler.find().count() === 0) {
                var deger = [
                        {'bedelliDurumu':'0','tahminiCikisTarihi':'27/10/2009', 'tahminiUcret':'20000TL', 'tahminiDogumTarihi':'15/01/1987','kesinDogumTarihi':'15/01/1987','kesinUcret':'20000TL'},
          ];
                for (var i = 0; i < deger.length; i += 1) {
                  Degerler.insert(deger[i]);
                }
            }

            if (Haberler.find().count() === 0) {
                var haber = [
                        {'bedelliDurumu':'0','tahminiCikisTarihi':'27/10/2009', 'tahminiUcret':'20000TL', 'tahminiDogumTarihi':'15/01/1987','kesinDogumTarihi':'15/01/1987','kesinUcret':'20000TL'},
          ];
                for (var i = 0; i < haber.length; i += 1) {
                  Haberler.insert(haber[i]);
                }
            }
        });

Accounts.onCreateUser(function(options, user) {
  if(user && user.services.facebook){
  var result;
  if (options.profile) {
    user.profile = options.profile;
    result = Meteor.http.get("https://graph.facebook.com/me", {
      params: {
        access_token: user.services.facebook.accessToken
      }
    });
    if (!result.error && result.data) {
      user.profile.birthday = result.data.birthday;
    }
  }
  }

  else {
    user.profile = options.profile;
  }
  return user;
  });
