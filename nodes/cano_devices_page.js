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
        mainNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        sidebarNode.onLive();
        mainNode.onLive();
    }

    sidebarNode = new CanoDevicesSidebarNode({
        canopyClient : canopy,
        dispatcher: dispatcher,
        onCreateDeviceLink : function() {
            mainNode.select("create_device");
        }
    });

    deviceListNode = new CanoDeviceListNode({
        canopyClient : canopy,
        onSelect: function(idx, device) {
            alert(device.UUID());
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
        &nbsp; <div style='margin-left:250px; margin-top:28px'>", mainNode, "</div>\
    </div>"]);
}
