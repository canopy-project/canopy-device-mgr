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
 * "No Devices" screen for Canopy Device Manager
 *
 *  PARAMS:
 *      params.onCreateDeviceRequest
 *
 */
function DmNoDevicesScreen(params) {
    cuiInitNode(this);

    var createDevicesBtn;

    this.onConstruct = function() {
        $deviceNameInput = $("<input type=text style='width:250px'>");
        $quantityInput = $("<input type=text value=1 style='width:250px'>");

        createDevicesBtn = new CuiButton({
            content: "CREATE DEVICES",
            cssClass: "cui_default",
            onClick: function() {
                if (params.onCreateDeviceRequest) {
                    params.onCreateDeviceRequest();
                }
            }
        });

        return [
            "<div style='margin-left:280px; padding:16px'>",
                "<div class='l'>Welcome to the Canopy Device Manager</div>",
                "<p>",
                    "You do not currently have access to any Canopy-enabled ",
                    "devices on this deployment.",
                "</p>",
                "<p>",
                    "If you're a developer, you can start by creating devices.",
                "</p>",
                "<br>", 
                createDevicesBtn,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([createDevicesBtn], live);
    }
}
