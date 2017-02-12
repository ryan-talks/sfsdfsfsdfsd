jQuery(document).ready(function(){
	var plots=[], i;
	if($('body').prop('id')=="home_pg"){
		for(i=0; i<$('#div_farm > div').length; i++){plots[i] = Math.floor($('#div_farm > div').eq(i).outerHeight(true));}
//		console.log(plots);
	}	
	$(window).bind('resize',maintainRatio);
/*	$(document).bind('mousewheel DOMMouseScroll',function(e){	
//		console.log(e.target.id);
		var etgt;
		if(e.target.id.indexOf('plot') != -1){			
			if(etgt != e.target.id){
				etgt = e.target.id;
				$('#home_slides_ctrl').children('li').removeClass('selected');
				$('#home_slides_ctrl li').prop('id',etgt).addClass('selected');
			}
		}
		
	});*/
	
	$("#instructions_check").click(function(){
		$("#locked_instructions").fadeIn();
		$(this).fadeOut();
	});
	
	$(window).trigger('resize');	
	if($('#div_farm').children('div').length > 0){
		var home_slide_cnt = $('#div_farm').children('div').length;
		var home_slide_ctrl_el = "<ul id='home_slides_ctrl'>";
		for(i = 0; i < home_slide_cnt; i++){
			home_slide_ctrl_el += "<li id='plot"+i+"'></li>";
		}
		home_slide_ctrl_el += "</ul>";
		$('#div_farm').prepend(home_slide_ctrl_el);
		$('#home_slides_ctrl li:first-child').addClass('selected');
	}	
	$('#home_slides_ctrl li').click(function(){
		$(this).parent().children('li').removeClass('selected');
		$(this).addClass('selected');
		scrollHere($(this).position(), $(this).prop('id'),1618);
	});
	$('a.pu_link').click(function(e) {
		e.preventDefault();
		$("#" + $(this).attr('id') + "_dialog").dialog({
			modal:true,
			width: 600,
			height:500,
			resizable:false,
			closeText:"X"
		});
    });
	$('.education_topics a').bind('click',function(){
		$.a_ns = {};
		$.a_ns.href = $(this).attr('href').split("#");		
		var atgt = "#" + $.a_ns.href[1].replace("./","") + " p.read_more a";
		if($(atgt).text()==='Read More'){
			$(atgt).trigger('click');
		}else{
			scrollHere($(this).position(), $.a_ns.href[1].replace("./",""));
		}
	});
	$('div#education_items p.read_more a').bind('click',function(e){
		e.preventDefault();
		var gparent = $(this).parent().parent().prop('id');
		if($(this).text()==='Read More'){
			$(this).parent('.read_more').siblings('div#content').find('p').show('slow',scrollHere($(this).position(), gparent));
			$(this).text('Read Less');
		}else{
			$(this).parent('.read_more').siblings('div#content').find('p:not(:first-child)').hide('fast',scrollHere($(this).position(), gparent));
			$(this).text('Read More');
		}
	});
	$('.to_top').bind('click',function(){
		scrollHere($(this).position(), "education_wrapper");
	});
	$('div.model_points').each(function(){
		$(this).mouseenter(function(){
			$(this).css('cursor','default');
			$(this).find('div:first-child').fadeOut('fast');
		}).mouseleave(function(){
			$(this).find('div:first-child').fadeIn('fast');
		});
	});
	$(window).bind('resize',function(){
		$('#our_model_pg div#model_rollovers div.model_points').each(function() {
			var div2H = $(this).find('div:nth-child(2)').css('height');
            $(this).find('div:first-child').css('height',div2H);
        });		
	});
	$(window).trigger('resize');
	
});
function scrollHere(orig, dest, int){
	if(int === undefined){
		var pos = $('#'+dest).position();
		var dist = Math.ceil(orig.top) - Math.ceil(pos.top);
		if (dist < 0) dist = dist * -1;
		int = dist * .809;	
		if (int < 300){
			int = 300;
		}else if (int > 2000){
			int = 2000;
		}
		
	}
	$('html, body').stop().animate({
		scrollTop: $('div#'+dest).offset().top
	  }, int, 'easeInOutExpo', function(){
	});	
}
function maintainRatio(){
	"use strict";
	$("#home_pg #div_farm>div").each(function() {
    /*    $(this).height($(this).width() * .625);*/
    });
}