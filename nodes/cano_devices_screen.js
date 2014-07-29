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
function CanoDevicesScreenNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        devicesMenuNode,
        eventPanelNode,
        $left,
        $right
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        devicesMenuNode.onLive();
        eventPanelNode.onLive();
    }

    $left = $("<div class=cano-main_page-left-and-middle-section></div>");
    $right = $("<div class=cano-main_page-right-section></div>");

    devicesMenuNode = new CanoDevicesMenuNode({
        canopyClient: canopy,
        dispatcher: dispatcher,
        onFilterSet: function(filter) {
            devicesListNode.setFilter(filter);
        }
    });
    devicesMenuNode.appendTo($left);

    devicesListNode = new CanoDevicesListNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });
    devicesListNode.appendTo($left);

    eventPanelNode = new CanoEventPanelNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });
    eventPanelNode.appendTo($right);

    $me = $("<div class=center_channel>");
    $me.append($left).append($right);
}
