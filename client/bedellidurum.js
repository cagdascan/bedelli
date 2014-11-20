// Session.setDefault('sessionBedelliDurumu',true);

Template.bedellidurum.helpers({
	'sessionBedelliDurumu': function(){
		var bd = Degerler.findOne().bedelliDurumu;

		if(bd==0){
	Session.set('sessionBedelliDurumu',true);
	return Session.get('sessionBedelliDurumu');
	}
	else if(bd==1){
		Session.set('sessionBedelliDurumu',false);
	return Session.get('sessionBedelliDurumu');
	}
}
});

Template.bedellidurum.helpers({
	'tahminiCikisTarihi': function(){
		return Degerler.findOne().tahminiCikisTarihi;
	}});

Template.bedellidurum.helpers({
	'tahminiUcret': function(){
		return Degerler.findOne().tahminiUcret;
	}});

Template.bedellidurum.helpers({
	'tahminiYas': function(){
		var dogumtarihi = Degerler.findOne().tahminiDogumTarihi;
		var dogumyiliVal = dogumtarihi.split('/');
		return 2014 - dogumyiliVal[2];
	}});

//////////

Template.bedellidurum.helpers({
	'kesinUcret': function(){
		return Degerler.findOne().kesinUcret;
	}});

Template.bedellidurum.helpers({
	'kesindogumtarihi': function(){
		var dogumtarihi = Degerler.findOne().kesinDogumTarihi;
		return dogumtarihi;
	}});

Template.bedellidurum.helpers({
	'kesinYas': function(){
		var dogumtarihi = Degerler.findOne().kesinDogumTarihi;
		var dogumyiliVal = dogumtarihi.split('/');
		return 2014 - dogumyiliVal[2];
	}});


