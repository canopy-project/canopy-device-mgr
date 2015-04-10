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
function CanoDevicesCreateNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        $deviceNameInput,
        $quantityInput,
        $errorMsg
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    $deviceNameInput = $("<input type=text style='width:250px'>");
    $quantityInput = $("<input type=text value=1 style='width:250px'>");

    this.onLive = function() {

        $("#create_btn").off('click').on('click', function() {
            var deviceName = $deviceNameInput.val();
            var quantity = parseInt($quantityInput.val());

            // TODO: validate input
            names = []
            for (var i = 0; i < quantity; i++) {
                names.push(deviceName + i);
            }


            var numDevices = canopy.me.Devices().length;
            var quota = canopy.me.Quotas().devices;

            if (quantity + numDevices > quota) {
                $errorMsg.html("You currently have " + numDevices + " devices.  Creating " + quantity + " more would exceed your quota of " + quota + " devices.");
                $errorMsg.slideDown();
                return;
            }

            params.user.createDevices({
                names: names,
                quantity: quantity
            }).onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Error creating device");
                    return;
                }

                if (params.onCreated)
                    params.onCreated();
            });
        });

        $("#cancel_btn").off('click').on('click', function() {
            if (params.onCancel)
                params.onCancel();
        });
    }

    this.onShow = function() {
        $me.show();
        if (params.onShow) {
            params.onShow();
        }
    }

    $errorMsg = $("<div style='display:none; font-style:italic; color: #ff0000;'></div>");

    $me = CanopyUtil_Compose(["<div>\
        <div style='padding:16px;'>\
            <div style='font-size: 30px; font-weight:400'>\
                Create Devices\
            </div>\
            <div style='font-size: 16px; color: #404040;'>\
                This form allocates UUID and Secret Key pairs for you to use.\
                ", $errorMsg, "\
            </div>\
            <div style='display:none; font-style: italic; color: #ff0000;' id=login_error></div>\
            <p>\
                Device Name<br>\
                ", $deviceNameInput, "\
            </p>\
            <p>\
                How many to create?<br>\
                ", $quantityInput, "\
            </p>\
            <p>\
                <input id=create_btn type=submit value='CREATE'></input>\
                <input class=btn_not_selected id=cancel_btn type=submit value='CANCEL'></input>\
            </p>\
        </div>\
    </div>"]);
}
