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
        devicesNode,
        appsNode,
        accountNode,
        analyticsNode,
        popupNode,
        switcherNode
    ;

    var topbar;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        popupNode.onLive();
        topbar.live();
        switcherNode.onLive();
        switcherNode.select("devices");

        $("#activate_ok").off('click').on('click', function() {
                popupNode.close();
                window.location.replace("index.html");
        });
    }

    var $msgContent = $("<div>\
        <div class=l>Account Activated</div>\
        Your email address has been confirmed.\
        <br><br><input id=activate_ok type=submit value='OK'></input>");
    var popupNode = new CanoPopupNode({
        content: $msgContent
    });

    topbar = new CuiTopbar({
        appName: "Device Manager",
        cssClass: "cui_default",
        items: [{
            content: "Devices",
            value: "devices"
        }, {
            content: "Analytics",
            value: "analytics"
        }, {
            content: "Apps",
            value: "apps"
        }, {
            content: "Account",
            value: "account",
        }],
        onSelect: function(value) {
            if (value == "analytics") {
                setTimeout(function() {analyticsNode.drawCharts();}, 30);
            }
            switcherNode.select(value);
        },
        showAppDropdown: true,
        user: params.user,
    });

    devicesNode = new CanoDevicesPageNode({
        user: params.user
    });

    appsNode = new CanoAppsPageNode({
        user: params.user
    });

    accountNode = new CanoAccountPageNode({
        user: params.user
    });

    analyticsNode = new CanoAnalyticsPageNode({
        user: params.user
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
    topbar.get$().appendTo($me);
    switcherNode.appendTo($me);

    var urlParams = CanopyUtil_GetURLParams();
    if (urlParams["activated"] == "true") {
        popupNode.appendTo($me);
    }
}
