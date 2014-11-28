// Template.haber.listele = function(){
// 	return Haberler.find({}, {sort: {numericTime: -1}});
// };

Template.haber.helpers({
	'listele': function(){
		if (Degerler.findOne() != undefined) {
		return Haberler.find({}, {sort: {numericTime: -1}});
	}
}
});