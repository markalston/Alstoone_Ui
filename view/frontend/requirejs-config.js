var config = {
    map: {
	'*' : {
	    'scroll-to-error' : 'Alstoone_Ui/js/scroll-to-error',
	    'scroll-to-error-payment' : 'Alstoone_Ui/js/scroll-to-error-payment'
	},
    },
    config: {
	mixins: {
	    'Magento_Catalog/js/catalog-add-to-cart': {
		'Alstoone_Ui/js/catalog-add-to-cart-mixin': true
	    }
	}
    }
};

