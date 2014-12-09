/*
 * Copyright 2014 SimpleThings, Inc.
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
function CanoDeviceDetailsDetailsNode(params) {
    var self=this,
        $me,
        device = null
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.setDevice = function(dev) {
        device = dev;
        this.refresh();
    }

    this.refresh = function() {
        if (device == null)
            return;
        $me.html("\
            <table cellspacing=0 cellpadding=8 class=devmgr_prop_table style='font-size:16px'>\
                <tr>\
                    <td align=right style='font-weight:400'>\
                        Status\
                    </td>\
                    <td>\
                        " + device.ConnectionStatus() + "\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400'>\
                        Last Seen\
                    </td>\
                    <td>\
                        Unknown\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400'>\
                        UUID\
                    </td>\
                    <td>\
                        " + device.UUID() + "\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400'>\
                        Secret Key\
                    </td>\
                    <td>\
                        " + device.UUID() + "\
                    </td>\
                </tr>\
            </table>");
    }

    $me = $("<div>");
    this.refresh();
}

