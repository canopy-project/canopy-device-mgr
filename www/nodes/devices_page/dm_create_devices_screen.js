/*
 * Copyright 2015 Canopy Services, Inc.
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
 * Create Devices screen for Canopy Device Manager
 *
 *  PARAMS:
 *      params.onCreated
 *      params.onCancel
 *      params.user -- Optional CanopyUser object
 *
 *  METHODS:
 *      setUser
 *
 */
function DmCreateDevicesScreen(params) {
    cuiInitNode(this);
    this.markDirty("user");

    var user = params.user;

    var createBtn;
    var cancelBtn;

    var $deviceNameInput;
    var $quantityInput;
    var $cancelButton;
    var $errorMsg;

    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.onConstruct = function() {
        $deviceNameInput = $("<input type=text style='width:250px'>");
        $quantityInput = $("<input type=text value=1 style='width:250px'>");

        createBtn = new CuiButton({
            content: "CREATE",
            cssClass: "cui_default",
            onClick: function() {
                if (!user) {
                    alert("No user -- cannot create devices");
                    return;
                }

                var deviceName = $deviceNameInput.val();
                var quantity = parseInt($quantityInput.val());

                // TODO: validate input
                var names = [];
                for (var i = 0; i < quantity; i++) {
                    names.push(deviceName + i);
                }

                /* TODO: enforce quotas server-side */
                user.createDevices({
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
            }
        });

        cancelBtn = new CuiButton({
            content: "CANCEL",
            cssClass: "cui_default",
            onClick: function() {
                if (params.onCancel)
                    params.onCancel();
            }
        });

        $errorMsg = $("<div style='display:none; font-style:italic; color: #ff0000;'></div>");
        return [
            "<div style='margin-left: 280px'>",
                "<div style='padding:16px;'>",
                    "<div style='font-size: 30px; font-weight:400'>",
                        "Create Devices",
                    "</div>",
                    "<div style='font-size: 16px; color: #404040;'>",
                        "This form allocates UUID and Secret Key pairs for you to use.",
                        $errorMsg,
                    "</div>",
                    "<div style='display:none; font-style: italic; color: #ff0000;' id=login_error></div>",
                    "<p>",
                        "Device Name<br>",
                        $deviceNameInput,
                    "</p>",
                    "<p>",
                        "How many to create?<br>",
                        $quantityInput,
                    "</p>",
                    "<p>",
                        createBtn,
                        " ",
                        cancelBtn,
                    "</p>",
                "</div>",
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([createBtn, cancelBtn], live);
    }

    this.onSetupCallbacks = function($me) {
    }

    this.onTeardownCallbacks = function($me) {
    }
}
