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
