function CanoMainPageNode(canopy, dispatcher) {
    var $me,
        topbarNode,
        submenuNode,
        messageBarNode,
        devicesNode,
        deviceEventsNode,
        deviceSensorsNode,
        deviceControlsNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        submenuNode.onLive();
        //devicesNode.onLive();
        //deviceEventsNode.onLive();
        //deviceSensorsNode.onLive();
        //deviceControlsNode.onLive();

        /* Finish any pending share transactions */
        var params = CanopyUtil_GetURLParams();
        if (params["share_device"]) {
            var deviceId = params["share_device"];
            canopy.finishShareTransaction(deviceId, function(data) {
                messageBarNode.setHTML("You have been given access to <b>" + data['device_friendly_name'] + "</b>");
                messageBarNode.show();

                // remove query string
                if (window.history.replaceState) {
                    var uri = window.location.toString();
                    if (uri.indexOf("?") > 0) {
                        var clean_uri = uri.substring(0, uri.indexOf("?"));
                        window.history.replaceState({}, document.title, clean_uri);
                    }
                }
                // success
            }, function() {
                messageBarNode.setHTML("Oops!  We can't give you access to " + deviceId);
                messageBarNode.show();
            });
        }
    }

    $me = $("<div style'width:100%;'>");

    topbarNode = new CanoTopbarNode(canopy, dispatcher).appendTo($me);
    messageBarNode = new CanoMessageBarNode({}).appendTo($me);
    submenuNode = new CanoSubmenuNode(canopy, dispatcher).appendTo($me);

}
