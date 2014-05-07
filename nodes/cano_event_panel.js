
function CanoEventPanelNode() {
    this.render = function($container)
    {
        $container.html("\
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
}
