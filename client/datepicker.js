Template.hesaplama.rendered = function() {
    $('.datetimepicker').datetimepicker({
    	language: 'tr',
    	pickTime: false,
    	minDate:'1/1/1980',
    	maxDate:'12/12/2004',
    	useCurrent: false,
    	defaultDate: '1/1/1980'
    });

    $(".datetimepicker").on("dp.change",function (e){
    	var ay= $('.datetimepicker').data("DateTimePicker").viewDate._i.M + 1;
		var gun= $('.datetimepicker').data("DateTimePicker").viewDate._i.d;
    	var yil= $('.datetimepicker').data("DateTimePicker").viewDate._i.y;

    	var bedelliYasiTarihi=["15","01","1987"];

    	if ((bedelliYasiTarihi[2]-yil>0)) {
    		$('#durum').html('Bedelli Tuttu! :)');
			$('#durum').css('color','green');
    	}
    	else if(bedelliYasiTarihi[2]-yil==0 && bedelliYasiTarihi[1]-ay>0){
			$('#durum').html('Bedelli Tuttu! :)');
			$('#durum').css('color','green');
		}
		else if(bedelliYasiTarihi[2]-yil==0 && bedelliYasiTarihi[1]-ay==0 && bedelliYasiTarihi[0]-gun>=0){
			
			$('#durum').html('Bedelli Tuttu! :)');
			$('#durum').css('color','green');
		}
		else {
			console.log('tutmadi');
			$('#durum').html('Bedelli Tutmadı :(');
			$('#durum').css('color','red');

		}
    });
}