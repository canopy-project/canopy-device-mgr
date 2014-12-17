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
function CanoTopbarSubmenuNode(params) {
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
        optionNode.onLive();
    }

    optionNode = new CanoOptionNode({
        outerClass: "devmgr_topbar_outer",
        itemSelectedClass: "devmgr_topbar_item_selected",
        itemNotSelectedClass: "devmgr_topbar_item_not_selected",
        items: [ {
            content: "By Group",
            value: "devices"
        }, {
            content: "By Tag",
            value: "devices"
        }, {
            content: "All",
            value: "apps"
        }],
        onSelect: function(optionNode, idx, value) {
            params.onSelect(value);
        },
        selectedIdx: 0
    });

    $me = CanopyUtil_Compose(["\
        <div style='z-index:1000; position:fixed; border-bottom:1px solid #d0d0d0; top:44px; left:0px; width:250px; height: 44px; background:#f0f0f0; border-bottom-left-radius:0px; border-left:0px solid #d0d0d0; color:#ffffff'>\
            <div style='padding:8px;'>\
                <b style='color:#000000'>gregp</b>\
            </div>\
        </div>\
        <div style='z-index:1000; position:fixed; top:44px; left:250px; right:0px; height: 44px; background:#f0f0f0; border-bottom-right-radius:0px; border-right:0px solid #d0d0d0; color:#202020; border-bottom:1px solid #d0d0d0; border-left:0px solid #d0d0d0; border-bottom-left-radius:0px; '>\
            <div style='padding:8px; padding-right:100px; position:absolute; right:0px;'>\
            </div>\
            ", optionNode, "\
        </div><div style='height:44px'>&nbsp;</div>\
    "]);
}
