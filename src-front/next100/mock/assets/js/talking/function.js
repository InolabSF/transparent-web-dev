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
		//return false;
		var temp = {};
		temp.x = x;
		temp.y = y;
		temp.x_max = x_max;
		temp.y_max = y_max;
		pos_data[i] = temp;
	});
	
	arreyShuffle(pos_data);
	
	var rotate = ['0deg', '90deg', '180deg', '270deg'];
	var rotate2 = ['1deg', '-0deg', '-1deg', '-2deg', '-3deg', '-4deg', '-3deg', '-2deg', '-1deg', '0deg'];
	var keyword_color = ['red', 'blue', 'green', 'yellow', 'purple', 'vermilion', 'yellowgreen', 'orange', 'lightblue', 'gold', 'pink', 'bluegreen', 'white'];
	arreyShuffle(keyword_color);
	$('.post').each(function(j){
		$(this).find('.media-container > *').each(function(i){
			//var top = pos_data[i].y;
			//var left = pos_data[i].x;
			var top = randNum(pos_data[i].y_max,pos_data[i].y);
			var left = randNum(pos_data[i].x_max,pos_data[i].x);
			var center_x = parseInt($(this).children().width() / 2);
			var center_y = parseInt($(this).children().height() / 2);
			//console.log('center_x:'+center_x);
			//console.log('center_y:'+center_y);
			arreyShuffle(rotate);
			$(this).css({'top':top - center_y+'px','left':left - center_x+'px','transform':'rotate('+rotate[0]+')'});
		});
		$(this).children().css({'transform':'translate3d(0,0,'+ (500*j-4500) +'px) rotate('+rotate2[j]+')', 'filter':'blur('+ (90 - (j*10)) +'px)', 'opacity':(0.1 + (j*0.1))});
		// $(this).children().css({'transform':'scale('+(0.5 + j*0.05)+') rotate('+rotate2[j]+')', 'filter':'blur('+ (90 - (j*10)) +'px)', 'opacity':(0.1 + (j*0.1))});
		// $(this).children().css({'transform':'scale('+(1 - j*0.05)+') rotate('+rotate2[j]+')', 'opacity':(0.1 + (j*0.1))});

		$(this).children().attr('data-keyword-color', keyword_color[j]);
	});
    
    // mockテスト用アニメーション制御ボタン追加
    var buttonControls = '<div id="buttonControls" style="font-size:200%; position:fixed; right:30px; top:30px; z-index:9999;">'
    $('#opening #wrapper').append(buttonControls + '<input type="button" value="WebGL Anime End" data-class-name="is-end" data-target="#webgl" id="webgl-hidden">');
    $('#webgl-hidden').on('click', function(){
        setTimeout(function(){
            var btn = document.getElementById("webgl-stop");
            btn.click();
            $('#webgl').children().remove();
        },3000);
    });
    $('#talk-welcome #wrapper').append(buttonControls + '<input type="button" value="State Box Hide" data-class-name="is-blurOut" data-target=".touch-state-box" data-action="add">');
    $('#talk-stand-by #wrapper').append(buttonControls + '<input type="button" value="State Box Hide" data-class-name="is-blurOut" data-target=".touch-state-box" data-action="add">');
    $('#talk-start #wrapper').append(buttonControls + '<input type="button" value="Hue Anime Start" data-class-name="is-small" data-target="#hue"> <input type="button" value="Hue Anime End" data-class-name="is-end" data-target="#hue"> <input type="button" value="Hue Remove Class" data-target="#hue" data-action="remove"> <input type="button" value="State Box Hide" data-class-name="is-blurOut" data-target=".touch-state-box" data-action="add">');
    $('#buttonControls input[type="button"]').on('click', function(){
        var className = $(this).data('className');
        var target = $(this).data('target');
        var action = $(this).data('action');
        if(action === 'remove'){
            $(target).removeAttr('class');
        } else if(action === 'add') {
            $(target).addClass(className);
        } else {
            $(target).attr('class','');
            $(target).addClass(className);
        }
    });
    $('#talking #hue').addClass('is-end');
    $('#talking-start #hue').addClass('is-end');
    setTimeout(function(){ // 確認用delay
        $('#talking-start .user-box').addClass('is-active');
        $('#talking-start #grid-layer').addClass('is-move');
        setTimeout(function(){ // 確認用delay
            $('#talking-start .post').addClass('transit');
        },2000);
    },1000);
});
