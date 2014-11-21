Template.haber.rendered = function(){
	var uzunluk = Haberler.find().fetch().length;
	var timeLine = [];

	for (var i=0; i<= uzunluk ; i++) {

		//initilaze and clear
		var tempTot = []
		var tempNew = []
		var temptimeNew = []
		var tempid = []
		//initilaze and clear

		//Gun ve ayın yerini değiştirme
		var tempTot = Haberler.find().fetch()[i].tarih.split('/');
		var tempNew = (tempTot[1] + "/" + tempTot[0] + "/" + tempTot[2]);
		//Gun ve ayın yerini değiştirme

		var temptimeNew = new Date(tempNew).getTime(); //numeric date
		var tempid = Haberler.find().fetch()[i]._id; //id
		console.log(i);

		timeLine.push([temptimeNew, tempid]); // zaman değerleri & _id 
	}
	console.log(timeLine);
};


// TODOS:1 - Haberlerin zaman sırasına göre akması 
//		 2 - Haberlerin saatlerini bi yere eklemek
//		 3 - Paginating