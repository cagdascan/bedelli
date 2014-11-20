// Houston.methods("Posts", {
//   "Publish": function (post) {
//     Posts.update(post._id, {$set: {published: true}});
//     return post.name + " published successfully.";
//   }
// });


Meteor.publish('degerler', function(){
	return Degerler.find();
});

Meteor.publish('haberler', function(){
	return Haberler.find();
});


Meteor.startup(function () {

        //  pollute the db with industry and practice names
        if (Haberler.find().count() === 0) {
                var industries = [
                        {'tarih':'19/12/2004', 'gazete':'milliyet','link':'http://hurriyet.com','baslik':"Erdoğan'dan flaş bedelli askerlik açıklaması", 'haber':"Cumhurbaşkanı Erdoğan, Cezayir ziyareti öncesi Esenboğa Havalimanı'nda gündeme dair değerlendirmelerde bulundu. Gazetecilerin bedelli askerlik ile ilgili sorularını yanıtlayan Erdoğan, ''Şu anda bunun artıları var eksileri var, böyle bir dönemin içindeyiz. Birileri çıkıp zaman zaman bu işi kaşıyorlar. Bunlar doğru yaklaşım tarzı değil. Burada TSK’nın kanaatini bir kenara koymak da mümkün değil. Cumhurbaşkanı olarak bende bu olayın artı ve eksilerini ilgili mercilerle değerlendirerek karar vermek zorundayım. Sırtımızda ağır bir küfe var'' dedi."},

          ];
                for (var i = 0; i < industries.length; i += 1) {
                  Haberler.insert(industries[i]);
                }
            }

            if (Degerler.find().count() === 0) {
                var deger = [
                        {'bedelliDurumu':'0','tahminiCikisTarihi':'27/10/2009', 'tahminiUcret':'20000TL', 'tahminiDogumTarihi':'15/01/1987','kesinDogumTarihi':'15/01/1987','kesinUcret':'20000TL'},
          ];
                for (var i = 0; i < deger.length; i += 1) {
                  Degerler.insert(deger[i]);
                }
            }



        });

