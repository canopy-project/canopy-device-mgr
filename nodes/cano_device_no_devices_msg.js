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
function CanoDevicesNoDevicesMsgNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        $createDevicesBtn
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $createDevicesBtn.off("click").on("click", function() {
            if (params.onCreateDeviceLink)
                params.onCreateDeviceLink();
        });
    }

    this.onShow = function() {
        $me.show();
        if (params.onShow) {
            params.onShow();
        }
    }

    $createDevicesBtn = $("<input type=submit value='CREATE DEVICES'></input>");

    $me = CanopyUtil_Compose(["<div style='padding:16px'>\
        <div class='l'>Welcome to the Canopy Device Manager</div>\
        <p>\
            You do not currently have access to any Canopy-enabled devices on this deployment.\
        </p>\
        <p>\
            If you're a developer, you can start by creating devices.\
        </p>\
        <br>", $createDevicesBtn, "\
        \
    </div>"]);
}
