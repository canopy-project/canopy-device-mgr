/*
 * CanoDeviceEventDialogNode - Dialog box showing device events
 *
 * Required Parameters:
 *  
 *      canopy_client: <CanopyClient object>
 *          Canopy client used for fetching data from the cloud.
 *
 * Optional Parameters:
 *
 *      layout_css: <object>
 *          CSS used for laying out the position of this dialog box.  Defaults
 *          to {}.
 */
function CanoDeviceEventsDialogNode(origParams) {
    var self=this,
        $body,
        $me,
        params;

    $.extend(this, new CanoNode());

    params = $.extend({}, {
        layout_css: {}
    }, origParams);

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
    $body.html("\
<div class=cano-event-panel>\
    <div class=cano-event-panel-outer>\
        <div class=cano-event-panel-title>Toast Finished</div>\
        <div class=cano-event-panel-time>28 min ago</div>\
        <div class=cano-event-panel-message>Enjoy your toast!</div>\
    </div>\
    \
    <div class=cano-event-panel-outer>\
        <div class=cano-event-panel-title>Toast Started</div>\
        <div class=cano-event-panel-time>30 min ago</div>\
    </div>\
    \
    <div class=cano-event-panel-outer>\
        <div class=cano-event-panel-title>Toast Finished</div>\
        <div class=cano-event-panel-time>May 5 9:22am</div>\
        <div class=cano-event-panel-message>Enjoy your toast!</div>\
    </div>\
    <div class=cano-event-panel-outer>\
        <div class=cano-event-panel-title>Toast Started</div>\
        <div class=cano-event-panel-time>May 5 9:20am</div>\
    </div>\
    <div class='cano-event-panel-outer cano-event-panel-green'>\
        <div class=cano-event-panel-title>Connection Restored</div>\
        <div class=cano-event-panel-time>May 3 12:28pm</div>\
    </div>\
    <div class='cano-event-panel-outer cano-event-panel-red'>\
        <div class=cano-event-panel-title>Connection Lost</div>\
        <div class=cano-event-panel-time>May 3 12:20pm</div>\
    </div>\
    <div class=cano-event-panel-outer>\
        <div class=cano-event-panel-title>Toast Finished</div>\
        <div class=cano-event-panel-time>Apr 25 8:00am</div>\
        <div class=cano-event-panel-message>Enjoy your toast!</div>\
    </div>\
    <div class=cano-event-panel-outer>\
        <div class=cano-event-panel-title>Toast Started</div>\
        <div class=cano-event-panel-time>Apr 25 7:59am</div>\
    </div>\
</div>\
        ");
    }

    $body = $("<div>");

    $me = new CanoDialogNode({
        body_css: {
            padding: "0px"
        },
        body_html: $body,
        outer_css: params.layout_css,
        title_html: "Events"
    }).get$();
}
