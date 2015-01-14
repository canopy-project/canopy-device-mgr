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
function CanoDevicesListItemNode(params) {
    var self=this,
        $me,
        $left,
        $right,
        canopy = params.canopyClient,
        device = params.device,
        controlWidgetNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $left.off("click").on("click", function() {
            if (device.friendlyName() == "My Smart Fan")
                window.open("demo.html", "_blank");
        });
    }

    controlWidgetNode = new CanoDeviceControlWidgetNode({
        canopyClient: canopy,
        device: device
    });

    if (device.friendlyName() != "SmartFan" && device.friendlyName() != "My Smart Fan")
        $me = $("<div class=cano-devices_list_item-outer1>");
    else
        $me = $("<div class=cano-devices_list_item-outer2>");

    if (device.isConnected()) {
        $left = $("<div class=cano-devices_list_item-left-section>").appendTo($me);
    }
    else {
        $left = $("<div class='cano-devices_list_item-left-section cano-devices_list_item-disconnected'>").appendTo($me);
    }
    $right = $("<div class=cano-devices_list_item-right-section>");

    $left.append("\
        <div class='cano-devices_list_item-title-outer'>\
            <div class='cano-devices_list_item-title-top'>\
                <div class='bottom_aligner'></div><div style='display:inline-block'>\
                    " + device.friendlyName() + "\
                </div>\
            </div>\
            <div class='cano-devices_list_item-title-bottom'>\
                Greg's Office\
            </div>\
        </div>\
    ");
    controlWidgetNode.appendTo($right);

    $right.appendTo($me);
}
