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

function CanoMainPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        devicesNode,
        appsNode,
        accountNode,
        analyticsNode,
        popupNode,
        switcherNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        popupNode.onLive();
        switcherNode.onLive();
        switcherNode.select("analytics");

        $("#activate_ok").off('click').on('click', function() {
                popupNode.close();
                window.location.replace("index_new.html");
        });
    }

    var $msgContent = $("<div>\
        <div class=l>Account Activated</div>\
        Your email address has been confirmed.\
        <br><br><input id=activate_ok type=submit value='OK'></input>");
    var popupNode = new CanoPopupNode({
        content: $msgContent
    });

    topbarNode = new CanoTopbarNode({
        canopyClient: canopy,
        dispatcher: dispatcher,
        onSelect: function(value) {
            if (value == "analytics") {
                setTimeout(function() {analyticsNode.drawCharts();}, 30);
            }
            switcherNode.select(value);
        }
    });

    devicesNode = new CanoDevicesPageNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });

    appsNode = new CanoAppsPageNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });

    accountNode = new CanoAccountPageNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });

    analyticsNode = new CanoAnalyticsPageNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });

    switcherNode = new CanoSwitcherNode({
        children: [ {
            name: "devices",
            content: devicesNode
        }, {
            name: "analytics",
            content: analyticsNode
        }, {
            name: "apps",
            content: appsNode
        }, {
            name: "account",
            content: accountNode
        } ],
        selectedIdx: 0
    });

    $me = $("<div>");
    topbarNode.appendTo($me);
    switcherNode.appendTo($me);

    var urlParams = CanopyUtil_GetURLParams();
    if (urlParams["activated"] == "true") {
        popupNode.appendTo($me);
    }

    topbarNode.select(0, false);
}
