Template.layout.rendered =function(){
	$(window).on( 'resize', function () {
    $('.topbackdiv').height( $(window).width() / 3 );
}).resize();

if (window._gaq == null) {
  window._gaq = [];
  _gaq.push(['_setAccount', 'UA-50959651-3']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga, gajs, s;
    ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    gajs = '.google-analytics.com/ga.js';
    ga.src = 'https:' === document.location.protocol ? 'https://ssl' + gajs : 'http://www' + gajs;
    s = document.getElementsByTagName('script')[0];
    return s.parentNode.insertBefore(ga, s);
  })();
}
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