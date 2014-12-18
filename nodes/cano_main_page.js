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

/*
 *       <-------------------1004--------------------------------->
 *       <---256----><--------492-------------><------256--------->
 *       padding: 6px
 */
function CanoMainPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        devicesNode,
        accountNode,
        popupNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        accountNode.onLive();
        devicesNode.onLive();
        popupNode.onLive();

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
            if (value == "devices") {
                devicesNode.get$().show();
                accountNode.get$().hide();
            }
            else if (value == "account") {
                devicesNode.get$().hide();
                accountNode.get$().show();
            }
        }
    });

    devicesNode = new CanoDevicesPageNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });

    accountNode = new CanoAccountPageNode({
        canopyClient: canopy,
        dispatcher: dispatcher
    });
    accountNode.get$().hide();

    $me = $("<div>");
    topbarNode.appendTo($me);
    devicesNode.appendTo($me);
    accountNode.appendTo($me);

    var urlParams = CanopyUtil_GetURLParams();
    if (urlParams["activated"] == "true") {
        popupNode.appendTo($me);
    }

    topbarNode.select(3, false);

}
