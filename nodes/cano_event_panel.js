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
            <span class='s'><span class='thicker'>SmartFan</span><div style='float:right; color:#606060;'>4m ago</div></span><br>\
            <img style='vertical-align:middle; width:32px; border-radius:4px; box-shadow: 1px 1px 2px #a0a0a0'; src=images/robot1_64x64.jpg>\
            Connected\
        </div>\
        <div class='cano-event_panel-item'>\
            <span class='s'><span class='thicker'>SmartFan</span><div style='float:right; color:#606060;'>4m ago</div></span><br>\
            <img style='vertical-align:middle; width:32px; border-radius:4px; box-shadow: 1px 1px 2px #a0a0a0'; src=images/robot1_64x64.jpg>\
            <span style='color:#a00000'>Disconnected</span>\
        </div>\
        <div class='cano-event_panel-item'>\
            <span class='s'><span class='thicker'>SmartFan</span><div style='float:right; color:#606060;'>3h ago</div></span><br>\
            <img style='vertical-align:middle; width:32px; border-radius:4px; box-shadow: 1px 1px 2px #a0a0a0'; src=images/robot1_64x64.jpg>\
            Connected\
        </div>\
        <div class='cano-event_panel-item'>\
            <span class='s'><span class='thicker'>greg</span><div style='float:right; color:#606060;'>3h ago</div></span><br>\
            Shared <a href=..>SmartFan</a> with <a href=..>juliebert</a>\
        </div>\
        <div class='cano-event_panel-item'>\
            <span class='s'><span class='thicker'>greg</span><div style='float:right; color:#606060;'>3h ago</div></span><br>\
            Renamed <a href=..>Device1</a> to <a href=..>SmartFan</a>\
        </div>\
        <div class='cano-event_panel-item'>\
            <span class='s'><span class='thicker'>Welcome</span><div style='float:right; color:#606060;'>3d ago</div></span><br>\
            Welcome to Canopy\
        </div>\
    </div>");
}
