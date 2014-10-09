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
 * Device definition editor.
 *
 * Lets you add/edit device sensors & controls.
 */
function CanoDefEditorNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        device = params.device,
        controlPanelNode = null
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $me = $("<div><b>Device Properties</b></div>");
    
    for (var i = 0; i < device.properties.__length; i++) {
        prop = device.properties[i];
        propNode = new CanoDefEditorPropertyNode({
            canopyClient: canopy,
            device: device,
            prop: prop
        });
        propNode.appendTo($me);
    }

    //alert(device.notifications().length);
}
