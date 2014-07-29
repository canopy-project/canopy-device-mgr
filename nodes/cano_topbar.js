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
function CanoTopbarNode(params) {
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
        $username.off('click').on('click', function(event) {
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
        });
    }

    accountDropdownNode = new CanoAccountDropdown({
        canopyClient: canopy,
        dispatcher: dispatcher
    });

    $username = $("<a href='javascript:void(0);'>" + canopy.account.username() + "</a>");

    $me = CanopyUtil_Compose(["\
    <div class='cano-topbar-outer'>\
        <div class=center_channel>\
            <div class='cano-topbar-left-section'>\
                <div class=logo-in-text>Canopy</div>\
            </div><div class='cano-topbar-middle-section'>\
                <div style='padding-bottom:4px; display:inline-block; border-bottom: 2px solid #c00000;'>Devices</div>\
                <div style='padding-bottom:6px; margin-left:20px; display:inline-block;'>Account</div>\
            </div><div class='cano-topbar-right-section'>", $username, accountDropdownNode, "</div>\
        </div>\
    </div>\
    "]);
}
