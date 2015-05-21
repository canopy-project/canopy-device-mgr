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
 * Create Organization Screen
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *      params.onCancel -- 
 *      params.onCreated -- 
 *
 *  METHODS:
 *      setUser
 *
 */
function DmCreateOrganization(params) {
    cuiInitNode(this);
    this.markDirty("user");
    var self = this;

    var user = params.user;
    var createBtn;
    var cancelBtn;
    var $errorMsg;
    
    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.onConstruct = function() {
        $orgNameInput = $("<input type=text style='width:250px'>");

        createBtn = new CuiButton({
            content: "CREATE",
            cssClass: "cui_default",
            onClick: function() {
                var orgName = $orgNameInput.val();
                user.createOrganization({
                    name: orgName,
                }).onDone(function(result, data) {
                    if (result != CANOPY_SUCCESS) {
                        $errorMsg.html(data.error_msg);
                        $errorMsg.show();
                        return;
                    }
                    $errorMsg.hide();
                    if (params.onCreated) {
                        params.onCreated();
                    }
                });
            }
        });

        cancelBtn = new CuiButton({
            content: "CANCEL",
            cssClass: "cui_default cui_gray",
            onClick: function() {
                if (params.onCancel) {
                    params.onCancel();
                }
            }
        });

        $errorMsg = $("<div style='display:none; font-style:italic; color: #ff0000;'></div>");

        return [
            "<div>",
                "<div style='font-size: 30px; font-weight:400'>",
                    "Create Organization",
                "</div>",
                "<div style='font-size: 16px; color: #404040;'>",
                    $errorMsg,
                "</div>",
                "<div style='display:none; font-style: italic; color: #ff0000;' id=login_error></div>",
                "<p>",
                    "Organization Name<br>",
                    $orgNameInput,
                "</p><br>",
                "<p>",
                    createBtn,
                    " ",
                    cancelBtn,
                "</p>",
            "</div>",
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([createBtn, cancelBtn], live);
    }
}
