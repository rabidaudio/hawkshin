$( document ).on( "pageinit", "#A", function() {
    $( document ).on( "swipeleft swiperight", "#A", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

function login(){
    alert("loging in");
    $.mobile.changePage( "#A", {  allowSamePageTransition: true });
    navigator.notification.vibrate(700); //phonegap vibrate
}
