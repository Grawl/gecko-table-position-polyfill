$(function(){
	// Gecko Table Cell Position Polyfill
	// Gecko is the **only** layout render engine that doesn't support `position: relative` for block elements with display set to `table-cell`.
	// This polyfill will add an inner div to that block and set the width and height.
	if(bowser.gecko){
		var class_handled='gecko-cell-wrapper';
		var style_target='table-cell';
		// wrap the insides of the table cell
		$('*').each(function(){
			if($(this).css('display')==style_target){
				var rule='position';
				if($(this).css(rule)!=='static'||$(this).css(rule)!=='initial'){
					$(this).wrapInner('<div class="'+class_handled+'" style="position: '+$(this).css('position')+'"></div>');
				}
			}
		});
		function action(){
			$('.'+class_handled).each(function(){
				var cell=$(this),
					cell_parent=$(this).parent(),
					cell_height;
				// remove any height that we gave wrapper so the browser can adjust size naturally.
				cell.height(0);
				// Only do stuff if the immediate parent has a display of "table-cell".  We do this to play nicely with responsive design.
				if(cell_parent.css('display')==style_target){
					// include any padding, border, margin of the parent
					cell_height=cell_parent.outerHeight();
					// set the height of our action div
					cell.height(cell_height);
				}
				cell_parent.css({
					padding: 0
				})
			});
		}

		// be nice to fluid / responsive designs
		$(window).on('resize',function(){
			action();
		});
		// called only on first page load
		$(document).on('ready',function(){
			action();
		});
	}
});
