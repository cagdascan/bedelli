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



        });