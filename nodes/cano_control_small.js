/*
 * Copyright 2014 Gregory Prisament
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        var buttonControlNode = new CanoButtonControlNode({
            control: control
        });
        $me = buttonControlNode.get$();
        childNode = buttonControlNode;
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
 */
function CanoButtonControlNode(params) {
    var self=this,
        $me
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        buttonNode.onLive();
    }

    buttonNode = new CanoButtonNode({
        cssClass: "btn-small-not_selected",
        content: params.control.name(),
        onClick: function() {
            params.control.setTargetValue(null, {
                onSuccess: function() {
                },
                onError: function() {
                    alert("Unable to perform action");
                }
            });
        }
    });
    
    $me = CanopyUtil_Compose(["\
        <div class=cano-sensor_small-outer>\
            <div class=cano-sensor_small-top>\
                <div class=bottom_aligner></div>", buttonNode, "\
            </div>\
            <div class=cano-sensor_small-bottom>&nbsp;</div>\
        </div>\
    "]);

    if (params.control.value()) {
        optionNode.select(params.control.value().v, true);
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

    if (params.control.value()) {
        optionNode.select(params.control.value().v, true);
    }
}
