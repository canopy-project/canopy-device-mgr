function CanoEventPanelNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        device = params.device
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("<div class=cano-event_panel-outer style='margin-left:16px; margin-top:16px; width:240px;'>\
        <div class='cano-event_panel-item'>\
            Welcome to Canopy\
        </div>\
        <div class='cano-event_panel-item'>\
            SmartFan connected\
        </div>\
        <div class='cano-event_panel-item'>\
            SmartFan Disconnected\
        </div>\
        <div class='cano-event_panel-item'>\
            SmartFan Connected\
        </div>\
        <div class='cano-event_panel-item'>\
            Device1 renamed to SmartFan\
        </div>\
    </div>");
}
