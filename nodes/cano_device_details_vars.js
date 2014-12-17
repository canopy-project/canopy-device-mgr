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
function CanoDeviceDetailsVarsNode(params) {
    var self=this,
        $me,
        device = null,
        locationNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        locationNode.onLive();
    }

    this.setDevice = function(dev) {
        device = dev;
        this.refresh();
    }

    locationNode = new CanoEditable({
        textClass: "devmgr_device_editable_location_text",
        inputClass: "devmgr_device_editable_location_input"
    });

    this.refresh = function() {
        if (device == null)
            return;

        if (!device.Vars() || device.Vars().Length() == 0) {
            // no cloud variables
            $me.html("<div style='font-size:17px'>This device does not have any Cloud Variables.\
            <p>\
                <b>(C/C++) Create a Cloud Variable with:</b>\
                <div class=code>canopy_var_init(ctx, \"inout float32 my_var\");\n\
canopy_var_set_float32(ctx, \"my_var\", 123.45f);\n\
canopy_sync_blocking(ctx, -1);</div>\
            </p>\
            <p>\
                <b>(REST) Create a Cloud Variable with:</b>\
                <div class=code>POST /api/device/" + device.UUID() + "\n\
{\n\
    \"sddl\" : {\n\
        \"inout float32 my_var\" : {},\n\
    },\n\
    \"vars\" : {\n\
        \"my_var\" : 123.45\n\
    }\n\
}\
                </div>\
            </p></div>");
            return;
        } else {
            $me.html("");
            var numVars = device.Vars().Length();
            var varNodes = [];
            for (var i = 0; i < numVars; i++) {
                var varNode = new CanoCloudVarBoxNode({
                    cloudvar: device.Vars().Var(i)
                });
                $me.append(varNode.get$());
            }
            return;
        }

        locationNode.setValue(device.LocationNote());

        $me.html(CanopyUtil_Compose(["\
            <table cellspacing=0 cellpadding=8 class=devmgr_prop_table style='font-size:16px'>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Status\
                    </td>\
                    <td>\
                        " + CanopyUtil_ConnectionStatusText(device.ConnectionStatus()) + "\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Last Seen\
                    </td>\
                    <td>\
                        Unknown\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        UUID\
                    </td>\
                    <td>\
                        <div style='font-size:14px; font-family:monospace'>\
                            " + device.UUID() + "\
                        </div>\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Secret Key\
                    </td>\
                    <td>\
                        <div style='font-size:14px; font-family:monospace'>\
                            " + "857736b5ea09ff57ff833cd20c8e8eb08aea8a35a" + "\
                        </div>\
                    </td>\
                </tr>\
                <tr>\
                    <td align=right style='font-weight:400; color:#404040'>\
                        Location Note\
                    </td>\
                    <td>\
                        ", locationNode, "\
                    </td>\
                </tr>\
            </table><br>\
        "]));
    }

    $me = $("<div>");
    this.refresh();
}
