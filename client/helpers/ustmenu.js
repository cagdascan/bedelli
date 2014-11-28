Template.ustmenu.helpers({
	'evetHayir': function(){
		if (Degerler.findOne() != undefined) {
		var bd = Degerler.findOne().bedelliDurumu;
		if(bd==1){
			Session.set('evetHayir',true);
			return Session.get('evetHayir',true);
		}
		else if(bd==0){
			Session.set('evetHayir',false);
			return Session.get('evetHayir',false);

		}
		} 
	}		

});