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
 * Signup form
 *
 * PARAMS:
 *      .remote - CanopyRemote object
 *      .redirect - string URL
 */
function DmSignupForm(params) {
    cuiInitNode(this);

    var $username;
    var $email;
    var $password;
    var $confirmPassword;
    var $submit;
    var $error;

    this.onConstruct = function() {
        if (!params.remote) {
            return ["<div style='color:#ff0000'>DmSignupForm: params.remote required</div>"];
        }
        if (!params.redirect) {
            return ["<div style='color:#ff0000'>DmSignupForm: params.redirect required</div>"];
        }
        $username = $("<input style='width:250px' type=text></input>");
        $email = $("<input style='width:250px' type=text></input>");
        $password = $("<input style='width:250px' type=password></input>");
        $confirmPassword = $("<input style='width:250px' type=password></input>");
        $submit = $("<input type=submit value='CREATE ACCOUNT'></input>");
        $error = $("<div style='display:none; font-style: italic; color: #ff0000;'></div>");

        return [
            "<div class=dm_login_form>",
                "<div style='font-size: 30px; font-weight:400'>",
                    "Sign Up",
                "</div>",
                $error,
                "<br>",
                "Username<br>",
                $username,
                "<br><br>",
                "Email<br>",
                $email,
                "<br><br>",
                "Choose Password<br>",
                $password,
                "<br><br>",
                "Confirm Password<br>",
                $confirmPassword,
                "<br><br>",
                $submit,
            "</div>"
        ];
    }

    this.onSetupCallbacks = function() {
        $submit.on('click', function() {
            var username = $username.val();
            var email = $email.val();
            var password = $password.val();
            var confirmPassword = $confirmPassword.val();

            $error.hide();
            if (username == "") {
                $error.html("Username required.");
                $error.slideDown();
                return;
            }
            if (email == "") {
                $error.html("Email required.");
                $error.slideDown();
                return;
            }
            if (!CanopyUtil_IsValidEmail(email)) {
                $error.html("Invalid email address.");
                $error.slideDown();
                return;
            }
            if (password == "") {
                $error.html("Password required.");
                $error.slideDown();
                return;
            }
            if (confirmPassword == "") {
                $error.html("Confirm Passowrd required.");
                $error.slideDown();
                return;
            }
            if (password != confirmPassword) {
                $error.html("Passwords don't match");
                $error.slideDown();
                return;
            }

            params.remote.createUser({
                username: username,
                email: email,
                password: password
            }).onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    var msg;
                    if (data.error_msg) {
                        msg = data.error_msg;
                    } else if (result == CANOPY_ERROR_USERNAME_NOT_AVAILABLE) {
                        msg = "Sorry, that username is not available";
                    } else if (result == CANOPY_ERROR_EMAIL_TAKEN) {
                        msg = "That email address already has a Canopy account";
                    } else {
                        msg = "Oops.  An error occurred.";
                    }
                    $error.html(msg);
                    $error.slideDown();
                    return;
                }
                window.location.replace(params.redirect);
            });
        });
    }

    this.onTeardownCallbacks = function() {
        $submit.off('click');
    }
}
