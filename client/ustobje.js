Session.setDefault('sessionUstobje',true);



Template.layout.helpers({
	'sessionUstobje': function(){
		return Session.get('sessionUstobje');
	}
});

Template.ustmenu.events({
	'click #hesaplama': function(){
		Session.set('sessionUstobje',false);
		$('#menucukHesaplama').addClass('active');
		$('#menucukHaberler').removeClass('active');

	},

	'click #haberler': function(){
		Session.set('sessionUstobje',true);
		$('#menucukHaberler').addClass('active');
		$('#menucukHesaplama').removeClass('active');
	}
});

