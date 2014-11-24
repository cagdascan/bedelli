Meteor.methods({

	haberEkle: function(haberbasligiVar, gazeteadiVar, habericerikVar, haberLinkVar, tarihVar, sortTime) {
		Haberler.insert({
			confirmedOrNot: 0,
			haberBasligi: haberbasligiVar,
			gazeteAdi: gazeteadiVar,
			haberIcerigi: habericerikVar,
			haberLinki : haberLinkVar,
			tarih: tarihVar,
			numericTime: sortTime,
			createdAt: new Date(),

		}, function (err, result) {
      if (err)
        console.log('An error has occured: ' + err);
      else
        console.log('Eklendi');
    });
	}
});