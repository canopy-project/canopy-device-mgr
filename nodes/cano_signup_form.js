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
function CanoSignupFormNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#signup_email").off('keyup').on('keyup', function() {
            if (CanopyUtil_IsValidEmail($("#signup_email").val())) {
                $("#signup_email_ok").html("<span style='font-weight: 800; color:#008000'>&#x2713;</span>");
            }
            else {
                $("#signup_email_ok").html("<span style='font-weight: 800; color:#ff0000'>&times;</span>");
            }
        });

        $("#create_account_btn").off('click').on('click', function() {
            var username = $("#signup_username").val();
            var email = $("#signup_email").val();
            var password = $("#signup_password").val();
            var confirmPassword = $("#signup_confirm_password").val();

            $("#signup_error").slideUp();
            if (username == "") {
                $("#signup_error").html("Username required.");
                $("#signup_error").slideDown();
                return;
            }
            if (email == "") {
                $("#signup_error").html("Email required.");
                $("#signup_error").slideDown();
                return;
            }
            if (!CanopyUtil_IsValidEmail(email)) {
                $("#signup_error").html("Invalid email address.");
                $("#signup_error").slideDown();
                return;
            }
            if (password == "") {
                $("#signup_error").html("Passowrd required.");
                $("#signup_error").slideDown();
                return;
            }
            if (confirmPassword == "") {
                $("#signup_error").html("Confirm Passowrd required.");
                $("#signup_error").slideDown();
                return;
            }
            if (password != confirmPassword) {
                $("#signup_error").html("Passwords don't match");
                $("#signup_error").slideDown();
                return;
            }

            canopy.CreateAccount({
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                onSuccess: function() {
                    window.location.replace("index_new.html");
                },
                onError: function(reason) {
                    if (reason == "username_already_taken") {
                        $("#signup_error").html("Username already taken");
                        $("#signup_error").slideDown();
                    }
                    else {
                        $("#signup_error").html("Oops... Error creating account");
                        $("#signup_error").slideDown();
                    }
                }
            });
        });
    }

    $me = $("\
        <div style='font-size: 30px; font-weight:400'>\
            Sign Up\
        </div>\
        <div style='display:none; font-style: italic; color: #ff0000;' id=signup_error></div>\
        <p>\
            Username<br>\
            <input style='width:250px' id=signup_username type=text></input>\
        </p>\
        <p>\
            Email<br>\
            <input style='width:250px;' id=signup_email type=text></input><span id=signup_email_ok>&nbsp;&nbsp;</div>\
        </p>\
        <p>\
            Choose Password<br>\
            <input style='width:250px;' id=signup_password type=password></input>\
        </p>\
        <p>\
            Confirm Password<br>\
            <input style='width:250px;' id=signup_confirm_password type=password></input>\
        </p>\
        <p>\
            <input id=create_account_btn type=submit value='CREATE ACCOUNT'></input>\
        </p>\
    ");
}

