Template.haber.listele = function(){
	return Haberler.find({}, {sort: {numericTime: -1}});
};