//Session.setDefault('sessionBedelliDurumu',true);

Template.bedellidurum.helpers({
	'sessionBedelliDurumu': function(){
		if (Degerler.findOne() != undefined) {
		var bdd = Degerler.findOne().bedelliDurumu;

		if(bdd==0){
	Session.set('sessionBedelliDurumu',true);
	return Session.get('sessionBedelliDurumu');
	}
	else if(bdd==1){
		Session.set('sessionBedelliDurumu',false);
	return Session.get('sessionBedelliDurumu');
	}
}
},
	'tahminiCikisTarihi': function(){
		return Degerler.findOne().tahminiCikisTarihi;
	},
	'tahminiUcret': function(){
		return Degerler.findOne().tahminiUcret;
	},
	'tahminiYas': function(){
		var dogumtarihi = Degerler.findOne().tahminiDogumTarihi;
		var dogumyiliVal = dogumtarihi.split('/');
		return 2014 - dogumyiliVal[2];
	},
	
	'kesinUcret': function(){
		if (Degerler.findOne() != undefined) {
		return Degerler.findOne().kesinUcret;
	}
	},
	
	'kesindogumtarihi': function(){
		if (Degerler.findOne() != undefined) {
		var dogumtarihi = Degerler.findOne().kesinDogumTarihi;
		return dogumtarihi;
	}
	},
	
	'kesinYas': function(){
		if (Degerler.findOne() != undefined) {
		var dogumtarihi = Degerler.findOne().kesinDogumTarihi;
		var dogumyiliVal = dogumtarihi.split('/');
		return 2014 - dogumyiliVal[2];
	}
	},

	'kullaniciAdi':function(){
		if(Meteor.user){
			return Meteor.user().profile.name;
		}
	}
});

Template.bedellidurum.events({
		'click .cikis': function() {
			Meteor.logout();
		}
	});

