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

		var ayVar= $('.datetimepicker2').data("DateTimePicker").date._i.M + 1;
		var gunVar= $('.datetimepicker2').data("DateTimePicker").date._i.d;
    	var yilVar= $('.datetimepicker2').data("DateTimePicker").date._i.y;

    	var tempNew = (ayVar + "/" + gunVar + "/" + yilVar);
		var sortTime = new Date(tempNew).getTime(); //numeric date
		var tarihVar = (gunVar + "/" + ayVar + "/" + yilVar);


		//kontroller
		var myRegExp =/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
		if(gazeteadiVar=="empty"){
			$('#haberekleuyari').html("Haberin bulunduğu gazeteyi seçiniz.");
		}
		else if(!myRegExp.test(haberLinkVar)){
			$('#haberekleuyari').html("Haber bağlantısını 'http://bedelli-askerlik.com' formatında giriniz.");
		}
		else if (haberbasligiVar === "") {
			$('#haberekleuyari').html("Haber basliği giriniz.");
		}
		else if (habericerikVar === "") {
			$('#haberekleuyari').html("Haber iceriği giriniz.");
		}
		else {		

			$('#haberekleuyari').html("Haber başarı ile gönderilmiştir.");

			Meteor.setTimeout(function(){
				Meteor.call('haberEkle',haberbasligiVar, gazeteadiVar, habericerikVar, haberLinkVar, tarihVar, sortTime);
				Session.set('sessionHaberekle',false);
			}, 3000);			
		}
	},
})

