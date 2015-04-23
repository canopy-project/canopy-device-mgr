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
        topbarSubmenu,
        sidebarNode,
        passwordNode,
        profileNode,
        upgradeNode,
        mainNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        sidebarNode.onLive();
        topbarSubmenu.live();
        mainNode.onLive();

        this.refresh();
    }

    this.refresh = function() {
        mainNode.select("profile");
    }

    sidebarNode = new CanoAccountSidebarNode({
        user: params.user
    });

    topbarSubmenu = new CuiTopbar({
        appName: params.user.username(),
        cssClass: "cui_default cui_topbar_submenu",
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
        },
        showAppDropdown: false,
    });

    passwordNode = new CanoAccountPasswordSectionNode({
        user: params.user
    });

    profileNode = new CanoAccountProfileSectionNode({
        user: params.user
    });

    upgradeNode = new CanoAccountUpgradeSectionNode();

    mainNode = new CanoSwitcherNode({
        children: [ {
            name: "profile",
            content: profileNode
        }, {
            name: "upgrade",
            content: upgradeNode
        }, {
            name: "password",
            content: passwordNode
        } ],
        selectedIdx: 0
    });

    $me = CanopyUtil_Compose(["<div>\
        ", topbarSubmenu, "\
        ", sidebarNode, "\
        &nbsp; <div style='padding:16px; margin-left: 260px; margin-top:18px'>", mainNode, "</div>\
    </div>"]);
}
