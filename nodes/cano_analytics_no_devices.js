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
function CanoAnalyticsNoDevicesNode(params) {
    var self=this,
        $me,
        $createDevicesBtn
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.onShow = function() {
        $me.show();
        if (params.onShow) {
            params.onShow();
        }
    }

    $createDevicesBtn = $("<input type=submit value='CREATE DEVICES'></input>");

    $me = CanopyUtil_Compose(["<div>\
        <div class='l'>Not Enough Data</div>\
        <p>\
            There is currently not enough data to display analytics about your\
            devices.  <br>Please come back after your devices have connected to the\
            Canopy server.\
        </p>\
        \
    </div>"]);
}
