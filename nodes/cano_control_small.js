/*
 * .control -- CanopyProperty object to display
 */
function CanoControlSmallNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        control = params.control,
        propNodes = []
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    if (control.name() == "speed") {
        $me = $("\
            <div class=cano-sensor_small-outer>\
                <div class=cano-sensor_small-top>\
                    <div class=bottom_aligner></div><div style='display:inline-block;' class=btn-small-not_selected>OFF</div><div style='display:inline-block;' class=btn-small>SLOW</div><div style='display:inline-block;' class=btn-small-not_selected>MED</div><div style='display:inline-block;' class=btn-small-not_selected>FAST</div>\
                </div>\
                <div class=cano-sensor_small-bottom>" + control.name() + "</div>\
            </div>\
        ");
    }
    else if (control.controlType() == "trigger" && control.datatype() == "void") {
        $me = $("\
            <div class=cano-sensor_small-outer>\
                <div class=cano-sensor_small-top>\
                    <div class=bottom_aligner></div><div style='display:inline-block;' class=btn-small-not_selected>REBOOT</div>\
                </div>\
                <div class=cano-sensor_small-bottom>&nbsp;</div>\
            </div>\
        ");
    }
    else {
        var value = (control.value() !== null) ? control.value().v : '-';

        $me = $("<div class=cano-sensor_small-outer>\
            <div class=cano-sensor_small-top>\
                <div class=bottom_aligner></div><div style='display: inline-block'>\
                    " + value + "\
                </div>\
            <div class=cano-sensor_small-bottom>" + control.name() + "</div>\
        </div>");
    }
}
