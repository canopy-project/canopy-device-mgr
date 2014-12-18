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
function CanoAccountProfileSectionNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarSubmenuNode,
        sidebarNode,
        mainNode,
        $emailInput,
        $errorMsg,
        $saveBtn,
        $createOrgBtn
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $saveBtn.off('click').on('click', function() {
            $errorMsg.slideUp();
            $successMsg.slideUp();
            canopy.me.UpdateProfile({
                email: $emailInput.val(),
                onSuccess: function() {
                    $successMsg.slideDown();
                },
                onError: function() {
                    $errorMsg.html("Error updating profile");
                    $errorMsg.slideDown();
                }
            });
        });
    }

    $emailInput = $("<input style='width:250px' type=text value='" + canopy.me.Email().value + "'></input>");
    $errorMsg = $("<div style='display:none; font-style:italic; color: #ff0000;'></div>");
    $successMsg = $("<div style='display:none; font-style:italic; color: #008000;'>Saved!</div>");
    $saveBtn = $("<input type=submit value='SAVE'></input>");
    $createOrgBtn = $("<input type=submit value='CREATE NEW ORGANIZATION'></input>");

    $me = CanopyUtil_Compose(["<div>\
        <div style='font-size: 30px; font-weight:400'>\
            Profile for " + canopy.me.Username().value + "\
        </div>\
        ", $errorMsg, "\
        <br>\
            Email address\
            <br>", $emailInput, "\
        <br><br>\
            ", $saveBtn, "\
            ", $successMsg, "\
        <div style='font-size: 30px; font-weight:400'>\
            <br>Organizations\
        </div>\
        <br>You are not a member of any organizations.\
        <br><br>\
            ", $createOrgBtn, "\
    </div>"]);
}
