/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery',
    'mage/translate',
    'underscore',
    'Magento_Catalog/js/product/view/product-ids-resolver',
    'Magento_Catalog/js/product/view/product-info-resolver',
    'jquery-ui-modules/widget'
], function ($, idsResolver, _) {
    'use strict';

    return function (widget, _) {
	$.widget('mage.catalogAddToCart', widget, {

	   /**
	     * @param {jQuery} form
	     */
	  ajaxSubmit: function (form) {
            var self = this,
                productIds = idsResolver(form),
                productInfo = self.options.productInfoResolver(form),
                formData;

            $(self.options.minicartSelector).trigger('contentLoading');
            self.disableAddToCartButton(form);
            formData = new FormData(form[0]);

            $.ajax({
                url: form.attr('action'),
                data: formData,
                type: 'post',
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,

                /** @inheritdoc */
                beforeSend: function () {
                    if (self.isLoaderEnabled()) {
                        $('body').trigger(self.options.processStart);
                    }
                },

                /** @inheritdoc */
                success: function (res) {
			console.log('addtocart success');		    
                    var eventData, parameters;

                    $(document).trigger('ajax:addToCart', {
                        'sku': form.data().productSku,
                        'productIds': productIds,
                        'productInfo': productInfo,
                        'form': form,
                        'response': res
                    });

                    if (self.isLoaderEnabled()) {
                        $('body').trigger(self.options.processStop);
                    }

                    if (res.backUrl) {
                        eventData = {
                            'form': form,
                            'redirectParameters': []
                        };
			
                        // trigger global event, so other modules will be able add parameters to redirect url
                        $('body').trigger('catalogCategoryAddToCartRedirect', eventData);

                        if (eventData.redirectParameters.length > 0 &&
                            window.location.href.split(/[?#]/)[0] === res.backUrl
                        ) {
                            parameters = res.backUrl.split('#');
                            parameters.push(eventData.redirectParameters.join('&'));
                            res.backUrl = parameters.join('#');
                        }

			// Alstoone_Ui changes
			// If we are just redirecting to ourself to show an error message, just scroll to top and load message.

   		        console.log('backurl: ' + res.backUrl);
   		        console.log('windowurl: ' + window.location.href);						
			if (res.backUrl == window.location.href) {

			    // Load messages and then scroll to top
			    require('Magento_Customer/js/customer-data').invalidate('messages');
			    require('Magento_Customer/js/customer-data').reload('messages', true);
			    $("html, body").animate({ scrollTop: 0 }, "slow");
			    self.enableAddToCartButton(form);
			} else {
			    //Otherwise do the redirect like asked.
			    self._redirect(res.backUrl);
			}
			
                        return;
                    }

                    if (res.messages) {
                        $(self.options.messagesSelector).html(res.messages);
                    }

                    if (res.minicart) {
                        $(self.options.minicartSelector).replaceWith(res.minicart);
                        $(self.options.minicartSelector).trigger('contentUpdated');
                    }

                    if (res.product && res.product.statusText) {
                        $(self.options.productStatusSelector)
                            .removeClass('available')
                            .addClass('unavailable')
                            .find('span')
                            .html(res.product.statusText);
                    }
		    // Alstoone UI Change to scroll to top.
 		    $("html, body").animate({ scrollTop: 0 }, "slow");
                    self.enableAddToCartButton(form);
                },

                /** @inheritdoc */
                error: function (res) {
		    console.log('addtocart error');		    		    
                    $(document).trigger('ajax:addToCart:error', {
                        'sku': form.data().productSku,
                        'productIds': productIds,
                        'productInfo': productInfo,
                        'form': form,
                        'response': res
                    });
                },

                /** @inheritdoc */
                complete: function (res) {
   		    console.log('addtocart complete');		    		    		    
                    if (res.state() === 'rejected') {
                        location.reload();
                    }
                }
            });
        },
	});

	return $.mage.catalogAddToCart;
    }
});
