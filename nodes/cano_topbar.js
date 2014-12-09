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
        $username,
        optionNode
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
        optionNode.onLive();

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

    //$username = $("<a href='javascript:void(0);'>" + canopy.account.username() + "</a>");
    if (canopy.IsLoggedIn()) {
        $username = $("<a href='javascript:void(0);' style='color:#ffffff; font-weight:400'>" + canopy.me.Username().value + "</a>");
    }
    else {
        $username = $("");
    }

    optionNode = new CanoOptionNode({
        outerClass: "devmgr_topbar_outer",
        itemSelectedClass: "devmgr_topbar_item_selected",
        itemNotSelectedClass: "devmgr_topbar_item_not_selected",
        items: [{
            content: "Devices",
            value: "devices"
        }, {
            content: "Account",
            value: "account"
        }],
        onSelect: function(optionNode, idx, value) {
            params.onSelect(value);
        },
        selectedIdx: 0
    });

    $me = CanopyUtil_Compose(["\
        <div style='z-index:1000; position:fixed; left:0px; width:250px; height: 58px; background:#3060b0; color:#ffffff'>\
            <div style='padding:16px;'>\
                <b>Canopy Enterprise</b>\
            </div>\
        </div>\
        <div style='z-index:1000; position:fixed; left:250px; right:0px; height: 58px; background:#404040; color:#ffffff'>\
            <div style='padding:16px; padding-right:100px; position:absolute; right:0px;'>\
                ", $username, accountDropdownNode, "\
            </div>\
            ", optionNode, "\
        </div>\
    "]);
}
