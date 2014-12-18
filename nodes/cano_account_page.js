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
function CanoAccountPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarSubmenuNode,
        sidebarNode,
        passwordNode,
        mainNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        sidebarNode.onLive();
        topbarSubmenuNode.onLive();
        mainNode.onLive();
    }

    sidebarNode = new CanoAccountSidebarNode({
        canopyClient : canopy,
        dispatcher: dispatcher
    });

    topbarSubmenuNode = new CanoTopbarSubmenuNode({
        items: [ {
            content: "Profile",
            value: "profile"
        }, {
            content: "Upgrade",
            value: "upgrade"
        }, {
            content: "Password",
            value: "password"
        }],
        onSelect: function(val) {
            mainNode.select(val);
        }
    })

    passwordNode = new CanoAccountPasswordSectionNode({
        canopyClient: canopy});

    mainNode = new CanoSwitcherNode({
        children: [ {
            name: "profile",
            content: $("<div>Edit Profile</div>")
        }, {
            name: "upgrade",
            content: $("<div>Upgrade</div>")
        }, {
            name: "password",
            content: passwordNode
        } ],
        selectedIdx: 0
    });

    $me = CanopyUtil_Compose(["<div>\
        ", topbarSubmenuNode, "\
        ", sidebarNode, "\
        &nbsp; <div style='padding:16px; margin-left: 244px; margin-top:18px'>", mainNode, "</div>\
    </div>"]);
}
