require(['jquery', 'domReady!'], function($){
    // Stupid hack to wait for the error messages to be shown before checking on them.
    // There has got to be a better way to do this.
    const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    $(document).on('click','body .action.primary.checkout', function(){
	sleep(500).then(() => {
	    if($('.mage-error:visible:first').offset() !== undefined) {

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

		$('html, body').animate({
		    scrollTop: offset
		}, 500);
	    } else if($('.field-error:visible:first').offset() !== undefined) {

		// I want to scroll the div with the error into the middle of the screen.
		// So there is some math to do.

		var elOffset = $('.field-error:visible:first').parent().offset().top;
		var elHeight = $('.field-error:visible:first').parent().height();
		var windowHeight = $(window).innerHeight();
		var offset;
		
		if (elHeight < windowHeight) {
		    offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
		}
		else {
		    offset = elOffset;
		}

		$('html, body').animate({
		    scrollTop: offset
		}, 500);
	    }
	});
    });

    $(document).on('click','.action.action-update', function(){
	sleep(500).then(() => {
	    console.log('in this click');
	    if($('.field-error:visible:first').offset() !== undefined) {

		// I want to scroll the div with the error into the middle of the screen.
		// So there is some math to do.

		var elOffset = $('.field-error:visible:first').parent().offset().top;
		var elHeight = $('.field-error:visible:first').parent().height();
		var windowHeight = $(window).innerHeight();
		var offset;
		
		if (elHeight < windowHeight) {
		    offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
		}
		else {
		    offset = elOffset;
		}

		$('html, body').animate({
		    scrollTop: offset
		}, 500);
	    } else if($('.mage-error:visible:first').offset() !== undefined) {

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

		$('html, body').animate({
		    scrollTop: offset
		}, 500);
	    }
	});
	
    });
    
});
