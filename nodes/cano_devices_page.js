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
function CanoDevicesPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode,
        sidebarNode,
        deviceListNode,
        noDevicesNode,
        createDeviceNode,
        deviceDetailsNode,
        mainNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        sidebarNode.onLive();
        mainNode.onLive();
        deviceDetailsNode.onLive();
    }

    sidebarNode = new CanoDevicesSidebarNode({
        canopyClient : canopy,
        dispatcher: dispatcher,
        onCreateDeviceLink : function() {
            mainNode.select("create_device");
        },
        onFilterChange : function(filterName, filter) {
            deviceListNode.setFilter(filterName, filter);
        }
    });

    deviceListNode = new CanoDeviceListNode({
        canopyClient : canopy,
        onSelect: function(idx, device) {
            deviceDetailsNode.setDevice(device);
        }
    });
        
    noDevicesNode = new CanoDevicesNoDevicesMsgNode({
        canopyClient : canopy,
        onCreateDeviceLink : function() {
            mainNode.select("create_device");
        }
    });

    createDeviceNode = new CanoDevicesCreateNode({
        canopyClient : canopy,
        onCreated: function() {
            mainNode.select("no_devices");
        },
        onCancel: function() {
            mainNode.select("no_devices");
        }
    });

    deviceDetailsNode = new CanoDeviceDetailsNode({
    });

    mainNode = new CanoSwitcherNode({
        children: [{
            name: "create_device",
            content: createDeviceNode,
        }, {
            name: "no_devices",
            content: noDevicesNode,
        }, {
            name: "device_list",
            content: deviceListNode,
        }]
    });

    mainNode.select("device_list");

    $me = CanopyUtil_Compose(["<div>\
        ", sidebarNode, "\
        &nbsp; <div style='margin-left:244px; margin-top:18px'>", mainNode, "</div>\
        <div style='z-index: 20; border:1px solid #d0d0d0; background:#f0f0f0; right: 16px; border-radius:5px; width:600px; position:absolute; top:78px;'>", deviceDetailsNode, "</div>\
    </div>"]);
}
