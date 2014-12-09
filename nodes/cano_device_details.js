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
function CanoDeviceDetailsNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        device = null,
        switcherNode,
        optionNode,
        detailsNode,
        nameNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        switcherNode.onLive();
        optionNode.onLive();
        detailsNode.onLive();
        nameNode.onLive();
    }

    this.setDevice = function(dev) {
        device = dev;
        detailsNode.setDevice(dev);
        this.refresh();
    }

    optionNode = new CanoOptionNode({
        outerClass: "devmgr_window_menu_outer",
        itemSelectedClass: "devmgr_window_menu_item_selected",
        itemNotSelectedClass: "devmgr_window_menu_item_not_selected",
        items: [{
            content: "Details",
            value: "details"
        }, {
            content: "Cloud Vars",
            value: "account"
        }, {
            content: "Notifications",
            value: "notifs"
        }, {
            content: "Coding",
            value: "notifs"
        }],
        onSelect: function(optionNode, idx, value) {
            switcherNode.select(value);
        },
        selectedIdx: 0
    });

    detailsNode = new CanoDeviceDetailsDetailsNode({});

    switcherNode = new CanoSwitcherNode({
        children: [{
            name: "details",
            content: detailsNode
        }]
    });
    switcherNode.select("details");

    nameNode = new CanoEditable({
        textClass: "devmgr_device_editable_name_text",
        inputClass: "devmgr_device_editable_name_input",
        onChange: function(value) {
            device.setSettings({friendlyName: value});
            if (params.onDeviceModified)
                params.onDeviceModified(device);
        }
    });

    this.refresh = function() {
        $me.html("");
        if (device != null) {
            nameNode.setValue(device.FriendlyName, true);
            $me.append(CanopyUtil_Compose(["\
                <div style='background:#f0f0f0; border-top-left-radius:5px; border-top-right-radius:5px; color:#000000; padding:8px;'>\
                    <div class='ml'>", nameNode, "</div>\
                </div>\
                <div style='background:#404040; border-top-left-radius:0px; border-top-right-radius:0px; color:#ffffff; font-weight:400; padding:0px;'>\
                    ", optionNode, "\
                </div>\
                <div style='padding:8px'>\
                    ", switcherNode, "\
                    <!--div style='font-size:14px; color:#808080; font-family:monospace'>" + device.UUID() + "</div>\
                    <div>\
                        <br>Get started: REST\
                        <pre class='code'>POST //ccs.canopy.link/di/" + device.UUID() + "\n\
    {\n\
        \"sddl\" : { \"out float32 myvar\" : {} },\n\
        \"vars\" : { \"myvar\" : 123.45 }\n\
    }\
                        </pre>\
                        <br>Get started: C/C++\
                        <pre class='code'>#include &lt;canopy.h&gt;\n\
    \n\
    int main(void) {\n\
        CanopyContext ctx = canopy_init_context();\n\
        canopy_set_opt(ctx, \n\
            CANOPY_CLOUD_HOST : \"ccs.canopy.link\",\n\
            CANOPY_DEVICE_UUID : \"" + device.UUID() + "\",\n\
            CANOPY_DEVICE_SECRET_KEY : \"" + device.UUID() + "\"\n\
        );\n\
        canopy_var_init(ctx, \"out float32 myvar\");\n\
        canopy_var_set_float32(ctx, \"myvar\", 123.45f);\n\
        canopy_sync_blocking(ctx, 10000);\n\
    }\n\
                        </pre>\
                    </div-->\
                </div>\
                "]));
        } else {
            $me.append("\
                <div style='padding:16px' class='ml'>No Device Selected</div>\
            ");
        }

        this.onLive();
    }

    $me = $("<div>");
    this.refresh();
}

