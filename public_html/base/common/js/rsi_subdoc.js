jQuery(document).ready(function(){
	"use strict";
/*	$.validate({
		form: '#subdoc',
		modules:'html5'
	});
	*/
	$('.initials_requested').change(function(){
		if($(window).data('initials')==undefined){
			// call signature pad for initials
			$(window).data('initials', true);			
		}
	});
	$('.signature_requested').change(function(){
		if($(window).data('signature')==undefined){
			// call signature pad full signature
			$(window).data('signature', true);			
		}
	});
	
	$('.eitherOr input[type="text"]').each(function(){
		$(this).bind('blur',function(){
			var trimmed = $(this).val().trim();
			if(trimmed != ""){
//				console.log('"'+trimmed+'"');
				//$(this).clearOthers();
			}
		});
    });
	
//	$('#subdoc #signature_page input').each(function(){$(this).prop('required',true);});
//	$('#subdoc #signature_page textarea').each(function(){$(this).prop('required',true);});
	
	$('input:radio[name="data[relying_on_purchaser_rep]"]').change(function(){
		if(this.checked && this.value==="Yes"){
			 $('#purchaser_rep_info').show().find('input').each(function(){
                $(this).prop('required',true);
            });
		}else{
			 $('#purchaser_rep_info').hide().find('input').each(function(){
                $(this).removeProp('required').val("");
            });			
		}
	});	
	
	$('input:radio[name="data[consent_to_receive]"]').change(function(){
		if(this.checked && this.value==="No"){
			 $('#consent_to_receive_info').show().find('input').each(function(){
                $(this).prop('required',true);
            });
		}else{
			 $('#consent_to_receive_info').hide().find('input').each(function(){
                $(this).removeProp('required').val("");
            });			
		}
	});	
	
	$('input:radio[name="data[insurance_comp]"]').change(function(){
		if(this.checked && this.value==="Yes"){
			 $('#insurance_comp_info').show().find('input').each(function(){
                $(this).prop('required',true);
            });
		}else{
			 $('#insurance_comp_info').hide().find('input').each(function(){
                $(this).removeProp('required').val("");
            });			
		}
	});		
	
	
 	$( "#signature-pad" ).hide();
	/*	if signature for this space is NOT avail, open sigpad	*/
		/*	generate a png of the approved signature and apply in the signature clicked	*/
		/*	NOTE: will have to add to db upon submission	*/
	$('.signature').click(function(){
		$('#signature-pad').data('signature_el', $(this).prop('id')).fadeIn('slow');
    });
	$('.cancel').click(function(){
       	$( "#signature-pad" ).data('signature_el', '').fadeOut('fast');
		
    });

	/*	else use appropriate signature from the array of and use for this space	*/
	
	$( ".datepicker" ).datepicker({
		dateFormat:"MM d, yy"
	});
	
});
$.fn.clearOthers = function(){
	var myID = this.prop('id');
	this.parents('.eitherOr').find('input[type="text"]').each(function(){
		if($(this).prop('id') != myID){
			console.log($(this).prop('id'));
			$(this).removeProp('required').val("");
		}
	});
}