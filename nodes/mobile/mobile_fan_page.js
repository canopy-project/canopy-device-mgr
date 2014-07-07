function MobileFanPage(canopy, dispatcher) {
    var $me,
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        submenuNode.onLive();
        devicesNode.onLive();
        deviceEventsNode.onLive();
        deviceSensorsNode.onLive();
        deviceControlsNode.onLive();
    }

    $me = $("<div style'width:100%;'>");

}

