Template.layout.rendered =function(){
	$(window).on( 'resize', function () {
    $('.topbackdiv').height( $(window).width() / 3 );
}).resize();
};

Session.setDefault('sessionHaberekle',false);

Template.layout.helpers({
	'sessionHaberekle': function(){
		return Session.get('sessionHaberekle');
	}
});

Template.layout.events({
	'click .haberEkleSw': function(){
		if(Session.get('sessionHaberekle')){
		Session.set('sessionHaberekle',false);
		}
		else {
		Session.set('sessionHaberekle',true);
		}
	}
})