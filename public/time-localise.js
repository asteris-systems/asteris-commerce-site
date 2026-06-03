/**
 * Asteris time-localise (asteriscommerce.com) — renders <time datetime>
 * in viewer's browser timezone + locale. Same script shipped across all
 * Asteris sites and the WC plugin admin.
 *
 * Per memory/feedback_local_time_rule.md (locked 2026-06-03).
 */
( function () {
	'use strict';
	if ( typeof Intl === 'undefined' || ! Intl.DateTimeFormat ) return;
	var locale = ( navigator.language || 'en-US' );
	var dtFmt = new Intl.DateTimeFormat( locale, { dateStyle: 'medium', timeStyle: 'short' } );
	var dFmt  = new Intl.DateTimeFormat( locale, { dateStyle: 'medium' } );
	function one ( el ) {
		var iso = el.getAttribute( 'datetime' );
		if ( ! iso || el.dataset.asterisLocalised === '1' ) return;
		var d = new Date( iso );
		if ( isNaN( d.getTime() ) ) return;
		el.textContent = /T\d/.test( iso ) ? dtFmt.format( d ) : dFmt.format( d );
		el.title = d.toISOString();
		el.dataset.asterisLocalised = '1';
	}
	function scan ( root ) {
		( root || document ).querySelectorAll( 'time[datetime], .asteris-localise[datetime]' ).forEach( one );
	}
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function () { scan(); } );
	} else { scan(); }
	window.AsterisLocalise = { scan: scan };
} )();
