Session.setDefault('sessionUstobje',true);
Session.setDefault('sessionHaberekle',false);

Template.layout.helpers({
	'sessionUstobje': function(){
		return Session.get('sessionUstobje');
	}
});

Template.layout.helpers({
	'sessionHaberEkle': function(){
		return Session.get('sessionHaberEkle');
	}
});

Template.ustmenu.events({
	'click #hesaplama': function(){
		Session.set('sessionUstobje',false);
		Session.set('sessionHaberEkle',false);
		$('#menucukHesaplama').addClass('active');
		$('#menucukHaberler').removeClass('active');
		$('#menucukHaberEkle').removeClass('active');

	},

	'click #haberler': function(){
		Session.set('sessionUstobje',true);
		Session.set('sessionHaberEkle',false);
		$('#menucukHaberler').addClass('active');
		$('#menucukHesaplama').removeClass('active');
		$('#menucukHaberEkle').removeClass('active');
	},

	'click #haberekleme': function(){
		Session.set('sessionUstobje',true);
		$('#menucukHaberler').removeClass('active');
		$('#menucukHesaplama').removeClass('active');
		$('#menucukHaberEkle').addClass('active');
		Session.set('sessionHaberEkle',true);
	}
});