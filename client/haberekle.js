Template.haberekle.rendered = function() {
    $('.datetimepicker2').datetimepicker({
    	language: 'tr',
    	pickTime: false,
    	useCurrent: false,
    	showToday: true,
    	defaultDate:"",
    });
};

Template.haberekle.events({
	'click .habersubmit': function(){

		var haberbasligiVar = document.getElementById("haberbasligi").value;
		var gazeteadiVar = document.getElementById("gazeteadi").value;
		var habericerikVar = document.getElementById("habericerik").value;
		var haberLinkVar = document.getElementById("haberlinki").value;

		var ayVar= $('.datetimepicker2').data("DateTimePicker").viewDate._i.M + 1;
		var gunVar= $('.datetimepicker2').data("DateTimePicker").viewDate._i.d;
    	var yilVar= $('.datetimepicker2').data("DateTimePicker").viewDate._i.y;

    	var tempNew = (ayVar + "/" + gunVar + "/" + yilVar);
		var sortTime = new Date(tempNew).getTime(); //numeric date
		var tarihVar = (gunVar + "/" + ayVar + "/" + yilVar)

		Meteor.call('haberEkle',haberbasligiVar, gazeteadiVar, habericerikVar, haberLinkVar, tarihVar, sortTime);

	},
})
