if ('undefined' === typeof BG_SHCE_USE_EFFECTS) {
	BG_SHCE_USE_EFFECTS = '0';
} 
if ('undefined' === typeof BG_SHCE_TOGGLE_SPEED) {
	BG_SHCE_TOGGLE_SPEED = '0';
} 
if ('undefined' === typeof BG_SHCE_TOGGLE_OPTIONS) {
	BG_SHCE_TOGGLE_OPTIONS = 'swing';
}
if ('undefined' === typeof BG_SHCE_TOGGLE_EFFECT) {
	BG_SHCE_TOGGLE_EFFECT = '';
}


function bgExpandCollapsedContent() {
	var bgCollapseExpandItems = document.querySelectorAll('input[bg_collapse_expand]');
	
	for ( i=0; i<bgCollapseExpandItems.length; i++) {
		
		var showHideButton = document.getElementById('bg-showmore-action-'+bgCollapseExpandItems[i].value);	
		var hiddenContent = document.getElementById('bg-showmore-hidden-'+bgCollapseExpandItems[i].value);
		
		if (showHideButton && hiddenContent) {
			if (window.addEventListener) {
				showHideButton.addEventListener('click', function(event) {bgExpandCollapsedContentAction(event, this);} );
			}
			else {
				window.attachEvent("onclick", function(event) {bgExpandCollapsedContentAction(event, this);} );
			}					
		}
		
		if (jQuery( showHideButton ).parent().prop("tagName") === 'LI' && 
			jQuery( showHideButton ).parent().parent().prop("tagName") === 'UL') {
			jQuery( showHideButton ).parent().parent().css('margin-bottom',0);
		}
		
	}

}

/* FE */
function bgExpandCollapsedContentAction(event, thisObj) {
	event.preventDefault();
	
	var bgUniqId = thisObj.id.replace('bg-showmore-action-', '');
		
	var showHideButton = document.getElementById('bg-showmore-action-'+bgUniqId);	
	var hiddenContent = document.getElementById('bg-showmore-hidden-'+bgUniqId);
	
	var showLessText = document.getElementById('bg-show-less-text-'+bgUniqId).value;
	var showMoreText = document.getElementById('bg-show-more-text-'+bgUniqId).value;
	
	var text = jQuery(showHideButton).text();
	if (BG_SHCE_USE_EFFECTS === '1') {
		jQuery( hiddenContent ).toggle(BG_SHCE_TOGGLE_EFFECT, BG_SHCE_TOGGLE_OPTIONS, parseInt(BG_SHCE_TOGGLE_SPEED)+1);
	}
	else {
		jQuery( hiddenContent ).toggle(parseInt(BG_SHCE_TOGGLE_SPEED));
	}
	
	if (showLessText === '') {
		jQuery( showHideButton ).toggle();
		
		if (jQuery( showHideButton ).parent().prop("tagName") === 'LI') {
			jQuery( showHideButton ).parent().toggle();
		}
	}
	else {
		 jQuery(showHideButton).text(
			 text == showMoreText ? showLessText : showMoreText
		 );
		  jQuery(showHideButton).toggleClass("bg-close");
	}
	
	if ('undefined' !== typeof gmspAllMaps) {
		gmspResizeMaps('recenterHidden');
	}
}

/* BE */
function bgSelectedEffect() {
	var effectOpts = jQuery('#bg_shce_effect > option');
	if (effectOpts.length > 0) {
		var i = 0;
		while ( i < effectOpts.length ) {
			if (effectOpts[i].value === BG_SHCE_TOGGLE_EFFECT) {
				effectOpts[i].selected = true;
			}
			i++;
		}
	}
	
	if (BG_SHCE_USE_EFFECTS === '1') {
		jQuery('.bg-effects').show();
	} 
}

jQuery(document).ready(function() {
	bgExpandCollapsedContent();
	bgSelectedEffect();
});