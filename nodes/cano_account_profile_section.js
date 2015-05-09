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
        topbarSubmenuNode,
        sidebarNode,
        mainNode,
        $emailInput,
        $errorMsg,
        $saveBtn,
        $createOrgBtn,
        $emailConfirmed
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $saveBtn.off('click').on('click', function() {
            $errorMsg.slideUp();
            $successMsg.slideUp();
            params.user.email($emailInput.val());
            params.user.updateToRemote().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    $errorMsg.html("Error updating profile");
                    $errorMsg.slideDown();
                    return;
                }
                $successMsg.slideDown();
            });
        });
    }

    $emailInput = $("<input style='width:250px' type=text value='" + params.user.email()+ "'></input>");
    $errorMsg = $("<div style='display:none; font-style:italic; color: #ff0000;'></div>");
    $successMsg = $("<div style='display:none; font-style:italic; color: #008000;'>Saved!</div>");
    $saveBtn = $("<input type=submit value='SAVE'></input>");
    $createOrgBtn = $("<input type=submit value='CREATE NEW ORGANIZATION'></input>");

    if (params.user.isValidated()) {
        $emailConfirmed = $("<span style='font-weight:400; color:#008000'>Yes</span>");
    }
    else {
        $emailConfirmed = $("<span style='font-weight:400; color:#ff0000'>No</span>");
    }

    $me = CanopyUtil_Compose(["<div>\
        <div style='font-size: 30px; font-weight:400'>\
            Profile for " + params.user.username() + "\
        </div>\
        <br>Email Confirmed: ", $emailConfirmed, "\
        ", $errorMsg, "\
        <br><br>\
            Email address\
            <br>", $emailInput, "\
        <br><br>\
            ", $saveBtn, "\
            ", $successMsg, "\
        <!--div style='font-size: 30px; font-weight:400'>\
            <br>Organizations\
        </div>\
        <br>You are not a member of any organizations.\
        <br><br>\
            ", $createOrgBtn, "\
    </div-->"]);
}
