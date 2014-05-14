
function CanoDeviceEventsDialogNode(params) {
    var self=this,
        canopy = params.canopyClient,
        $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
        $me.html("<div style='font-weight:400; color: #000000; padding:4px; padding-left:16px; font-size:22px; background:#e0e6f0'>Notices</div>\
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

    $me = $("\
        <div class='cano-dialog2 cano-main-right-side-layout'>\
        </div>\
    ");
}
