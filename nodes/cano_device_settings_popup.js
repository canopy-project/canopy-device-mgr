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
 *  params:
 *  .canopyClient - CanopyClient object
 *  .device - CanopyDevice object
 */
function CanoDeviceSettingsPopupNode(params) {
    var self=this,
        popupNode,
        canopy = params.canopyClient,
        device = params.device,
        $cancelButton,
        $locationInput,
        $nameInput,
        $saveButton
    ;

    $.extend(this, new CanoNode());

    this.onLive = function() {
        $saveButton.off().on('click', function() {
            var friendlyName = $nameInput.val();
            var locationNote = $locationInput.val();

            device.setSettings({
                friendlyName: friendlyName,
                locationNote: locationNote,
                onSuccess: function() {
                    popupNode.close();
                },
                onError: function() {
                    alert("doh!");
                }
            });
        });
        $cancelButton.off().on('click', function() {
            popupNode.close();
        });
    }

    this.get$ = function() {
        return popupNode.get$();
    }

    $nameInput = $("<input type=text value='" + device.friendlyName() + "'></input>");
    $locationInput = $("<input type=text value='" + device.locationNote() + "'></input>");

    $cancelButton = $("<input type=submit value='CANCEL' class='btn_not_selected' style='margin-top:12px;'></input>");
    $saveButton = $("<input type=submit value='SAVE' style='margin-top:12px;'></input>");

    $content = CanopyUtil_Compose([
        "<div style='width:420px'>\
            <div class=l>" + device.friendlyName() + " Settings</div>\
            <br>\
            <div class=thicker>Name</div>\
            ", $nameInput, "\
            <br><br>\
            <div class=thicker>Location Note</div>\
            ", $locationInput, "\
            <br><br>\
            ", $saveButton, "\
            ", $cancelButton, "\
        </div>"
    ]);


    popupNode = new CanoPopupNode({
        content: $content
    });
}
