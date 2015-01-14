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
function CanoAccountPasswordSectionNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarSubmenuNode,
        sidebarNode,
        mainNode,
        $oldPasswordInput,
        $newPasswordInput,
        $confirmPasswordInput,
        $passwordError,
        $successMsg,
        $saveBtn
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $saveBtn.off('click').on('click', function() {
            $passwordError.slideUp();
            canopy.me.UpdateProfile({
                oldPassword: $oldPasswordInput.val(),
                newPassword: $newPasswordInput.val(),
                confirmPassword: $confirmPasswordInput.val(),
                onSuccess: function() {
                    $saveBtn.hide();
                    $successMsg.show();
                },
                onError: function() {
                    $passwordError.html("Error changing password");
                    $passwordError.slideDown();
                }
            });
        });
    }

    $oldPasswordInput = $("<input style='width:250px' type=password></input>");
    $newPasswordInput = $("<input style='width:250px' type=password></input>");
    $confirmPasswordInput = $("<input style='width:250px' type=password></input>");
    $passwordError = $("<div style='display:none; font-style:italic; color: #ff0000;'></div>");
    $successMsg = $("<div style='display:none; font-style:italic; color: #008000;'>Password changed!</div>");
    $saveBtn = $("<input type=submit value='CHANGE PASSWORD'></input>");

    $me = CanopyUtil_Compose(["<div>\
        <div style='font-size: 30px; font-weight:400'>\
            Change Password\
        </div>\
        ", $passwordError, "\
        <br>\
            Current password\
            <br>", $oldPasswordInput, "\
        <br><br>\
            New password\
            <br>", $newPasswordInput, "\
        <br><br>\
            Confirm new password\
            <br>", $confirmPasswordInput, "\
        <br><br>\
            ", $saveBtn, "\
            ", $successMsg, "\
        </p>\
    </div>"]);
}
