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
function CanoAppsPageNode(params) {
    var self=this,
        $me,
        topbarSubmenu,
        sidebarNode,
        appsListNode,
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
        mainNode.select("apps");
    }

    sidebarNode = new CanoAppsSidebarNode({ });

    topbarSubmenu = new CuiTopbar({
        appName: params.user.username(),
        cssClass: "cui_default cui_topbar_submenu",
        items: [ {
            content: "Credentials",
            value: "apps"
        }],
        showAppDropdown: false,
    });

    appsListNode = new CanoAppsListNode({ });


    mainNode = new CanoSwitcherNode({
        children: [ {
            name: "apps",
            content: appsListNode
        } ],
        selectedIdx: 0
    });

    $me = CanopyUtil_Compose(["<div>\
        ", topbarSubmenu, "\
        ", sidebarNode, "\
        &nbsp; <div style='padding:16px; margin-left: 260px; margin-top:18px'>", mainNode, "</div>\
    </div>"]);
}
