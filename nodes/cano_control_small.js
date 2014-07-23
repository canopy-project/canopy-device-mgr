/*
 * .control -- CanopyProperty object to display
 */
function CanoControlSmallNode(params) {
    var self=this,
        $me,
        control = params.control,
        childNode = null;
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        if (childNode)
            childNode.onLive();
    }

    if (control.name() == "speed") {
        var enumControlNode = new CanoEnumControl({
            control: control,
            values: ["OFF", "SLOW", "MED", "FAST"]
        });
        $me = enumControlNode.get$();
        childNode = enumControlNode;
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

/*
 * .control -- CanopyProperty object to display
 * .values -- Array of values
 */
function CanoEnumControl(params) {
    var self=this,
        $me
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        optionNode.onLive();
    }
    
    optionNode = new CanoOptionNode({
        outerClass: "cano-enum_control-outer",
        itemSelectedClass: "btn-small",
        itemNotSelectedClass: "btn-small-not_selected",
        itemPendingSelectClass: "btn-small-pending_select",
        onClick: function(optnode, idx, value) {
            optnode.pendingSelect(idx);
            params.control.setTargetValue(value, {
                onSuccess: function() {
                    optnode.select(idx);
                },
                onError: function() {
                }
            });
            return false; /* prevent selection */
        },
        items: [
            { content: "OFF", value: 0 },
            { content: "SLOW", value: 1 },
            { content: "MED", value: 2 },
            { content: "FAST", value: 3 }
        ],
        selectedIdx: -1
    });

    $me = CanopyUtil_Compose(["\
        <div class=cano-sensor_small-outer>\
            <div class=cano-sensor_small-top>\
                <div class=bottom_aligner></div>", optionNode, "\
            </div>\
            <div class=cano-sensor_small-bottom>" + params.control.name() + "</div>\
        </div>\
    "]);

    console.log(params.control.value());
    if (params.control.value()) {
        optionNode.select(params.control.value().v, true);
    }
}
