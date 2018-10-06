jQuery(function($){

	// ランダム整数
	function randNum(max,min) {
		return Math.floor(Math.random()*(max-min+1)+min);	
	}

	// Array Shuffle
	function arreyShuffle(array){
		for(var i = array.length - 1; i > 0; i--){
				var r = Math.floor(Math.random() * (i + 1));
				var tmp = array[i];
				array[i] = array[r];
				array[r] = tmp;
		}
	}
	
	var pos_data = [];
	$('#media-send-leyer .send-area').each(function(i){
		var x = parseInt($(this).offset().left);
		var y = parseInt($(this).offset().top);
		var x_max = parseInt(x + $(this).width());
		var y_max = parseInt(y + $(this).height());
		console.log('x:'+x);
		console.log('y:'+y);
		console.log('x_max:'+x_max);
		console.log('y_max:'+y_max);
		//return false;
		var temp = {};
		temp.x = x;
		temp.y = y;
		temp.x_max = x_max;
		temp.y_max = y_max;
		pos_data[i] = temp;
	});
	console.log(pos_data.length);
	
	arreyShuffle(pos_data);
	console.log(pos_data);
	
	var rotate = ['0deg', '90deg', '180deg', '270deg'];
	var rotate2 = ['1deg', '-0deg', '-1deg', '-2deg', '-3deg', '-4deg', '-3deg', '-2deg', '-1deg', '0deg'];
	$('.post').each(function(j){
		$(this).find('.media-container > *').each(function(i){
			//var top = pos_data[i].y;
			//var left = pos_data[i].x;
			var top = randNum(pos_data[i].y_max,pos_data[i].y);
			var left = randNum(pos_data[i].x_max,pos_data[i].x);
			var center_x = parseInt($(this).children().width() / 2);
			var center_y = parseInt($(this).children().height() / 2);
			console.log('top:'+top);
			console.log('left:'+left);
			//console.log('center_x:'+center_x);
			//console.log('center_y:'+center_y);
			arreyShuffle(rotate);
			$(this).css({'top':top - center_y+'px','left':left - center_x+'px','transform':'rotate('+rotate[0]+')'});
		});
		$(this).children().css({'transform':'translate3d(0,0,'+ (500*j-4500) +'px) rotate('+rotate2[j]+')', 'filter':'blur('+ (90 - (j*10)) +'px)', 'opacity':(0.1 + (j*0.1))});
	});
	
});
