( function(){
	'use strict';
	
	require('./parser.js');
	
	exports.parse = function( line ){
		if( !line || line.length === 0 ) return {};
		return Ingreedy.parse( line );
	};
	
})();

