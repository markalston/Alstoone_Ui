require(['jquery', 'domReady!'], function($){
    // Stupid hack to wait for the error messages to be shown before checking on them.
    // There has got to be a better way to do this.
    const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    $(document).on('click','body .action.primary.tocart', function(){
	console.log('Click');
	sleep(500).then(() => {
	    if($('.mage-error:visible:first').offset() !== undefined) {
	    	console.log('think I found an error');
		console.log($('.mage-error:visible:first').offset());

	
		// I want to scroll the div with the error into the middle of the screen.
		// So there is some math to do.

		var elOffset = $('.mage-error:visible:first').parent().offset().top;
		var elHeight = $('.mage-error:visible:first').parent().height();
		var windowHeight = $(window).innerHeight();
		var offset;
		
		if (elHeight < windowHeight) {
		    offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
		}
		else {
		    offset = elOffset;
		}
		console.log(offset);

		$('html, body').animate({
		    scrollTop: offset
		}, 500);
	    } else {
		console.log('I did not find an error');
	    }
	})
    });
});
