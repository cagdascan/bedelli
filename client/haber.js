Template.haber.helpers({
	'haberTarihi': function(){
		return Haberler.findOne().tarih;
	},

	'haberBasligim': function(){
		return Haberler.findOne().haberBasligi;
	},

	'haberIcerigim': function(){
		return Haberler.findOne().haberIcerigi;
	},

	'haberLinkim': function(){
		return Haberler.findOne().haberLinki;
	},
});

Template.haber.listele = function(){
	return Haberler.find({}, {sort: {sortTime: -1}});
}