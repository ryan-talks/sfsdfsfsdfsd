var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),    
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas"),
    signaturePad;

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
}

function reviewable(){
	$('.m-signature-pad--footer').append('<button type="button" class="button review" data-action="review">Review Last</button>').find('.button.review').bind("click", function (event) {
		//window.open($(window).data('_sig'));
		reviewAction(true);
	});
}
function reviewAction(show){
	$('#refsig_dialog').remove();
	var refsig = $(window).data('_sig');
	$('#signature-pad')
	.append('<div id="refsig_dialog" title="Signature Review"><img src=\"'+refsig+'\"/></div>')
	.find('#refsig_dialog')
	.hide()	
	.bind('click',function(){
		$(this).fadeOut('fast',function(){
			$(this).remove();
		});
	});
	if(show==true)$('#refsig_dialog').fadeIn('slow')
	
	delete refsig;
}
function placeSignature(){
	var refsig = $(window).data('_sig');
	var refel = $('#signature-pad').data('signature_el');
	var tgt_sig = '#' + refel;
	$(tgt_sig).html('<input type="hidden" name="data['+refel+'_data]" id="data['+refel+'_data]" value=\"'+dataURItoBlob(refsig)+'\"><span class="scratch">X</span><img src=\"'+refsig+'\"/>').find('img').addClass('signature_image');
	
	// clean up
	$(window).removeData('_sig')
	$('#signature-pad').removeData('signature_el');
	delete refsig;
	delete refel;
	delete tgt_sig	
	signaturePad.clear();
	
	// under the rug
	$('#signature-pad').hide();
}

function dataURItoBlob(dataURI, callback) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab], {type:"image/png"});
	console.log(bb);
    return bb;
}
window.onresize = resizeCanvas;
resizeCanvas();

signaturePad = new SignaturePad(canvas);

clearButton.addEventListener("click", function (event) {
    signaturePad.clear();
});

saveButton.addEventListener("click", function (event) {
    if (signaturePad.isEmpty()) {
        alert("Please provide signature first.");
    } else {
		if(confirm("Confirm to apply signature.")==true){
			var sig = signaturePad.toDataURL();
			$(window).data('_sig',sig);
/*			reviewable();
			reviewAction();*/
			placeSignature();
		}
    }
});