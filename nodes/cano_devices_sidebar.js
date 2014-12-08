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
function CanoDevicesSidebarNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        accountDropdownNode,
        $username
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        /*$username.off('click').on('click', function(event) {
            accountDropdownNode.show();
            event.preventDefault();
            return false;
        });
        accountDropdownNode.onLive();

        // hacky way to determine when to close the window.
        $("html").click(function(e) {
            if (!$(e.target).is($me)) {
                if (accountDropdownNode.isVisible()) {
                    accountDropdownNode.hide();
                }
            }
        });*/
    }

    /*accountDropdownNode = new CanoAccountDropdown({
        canopyClient: canopy,
        dispatcher: dispatcher
    });

    $username = $("<a href='javascript:void(0);'>" + canopy.account.username() + "</a>");*/

    $me = CanopyUtil_Compose(["\
        <div style='z-index: 400; position:fixed; width: 250px; top: 58px; bottom:0px; background:#dddddd; color:#000000'>\
            <div style='padding:16px; font-size: 16px;'>\
                <div style='padding-left:2em'>All Devices (0)</div>\
                <div style='padding-left:2em'>Connected (0)</div>\
                <div style='padding-left:2em'>Disconnected (0)</div>\
                <div style='padding-left:2em'>Allocated (0)</div>\
\
                <br><b>LOTS</b>\
                <div style='padding-left:2em'>Recently Created (0)</div>\
                <div style='padding-left:2em'><i>+ Create Lot</i></div>\
            </div>\
        </div>\
    "]);
}
