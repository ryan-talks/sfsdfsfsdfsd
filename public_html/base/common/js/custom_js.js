/* Word Finder RSI Sub Doc */

$.fn.wrapInTag = function(opts) {

  var tag = opts.tag || 'strong',
	  words = opts.words || [],
	  regex = RegExp(words.join('|'), 'gi'),
	  replacement = '<'+ tag +'>$&</'+ tag +'>';
  
  return this.html(function() {
	return $(this).text().replace(regex, replacement);
  });
};

$('#subscription_agreement_pg p').wrapInTag({
  tag: 'span class="b u"',
  words: ['"Shares"', '"Fund"', '"Memorandum"', '"Subscription Amount"', '"Agreement"', '"Board of Directors"', '"Purchase Date"', '"Articles"', '"ERISA"', '"Code"',
		'"Investment Company Act"', '"Securities Act"', '"Advisers Act"', '"Fund"', '"Beneficial Owner"', '"Confidential Information"', '"Underlying Subscriber"',
		'"Management Subscriber"', '"Exchange Act"', '"IRA"', '"Management Affiliate"', '"UBTI"', '"Subscriber"', '"OFAC"', '"FATF"', '"Company"', '"Additional Subscription"',
		'"Subscription Agreement"', '"Shareholder"', '"IRS"']
});

/* End Word Finder */