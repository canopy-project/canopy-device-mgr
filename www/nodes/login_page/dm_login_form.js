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
 * Login form
 *
 * PARAMS:
 *      .remote - CanopyRemote object
 *      .redirect - string URL
 */
function DmLoginForm(params) {
    cuiInitNode(this);

    var $username;
    var $password;
    var $submit;
    var $error;

    this.onConstruct = function() {
        if (!params.remote) {
            return ["<div style='color:#ff0000'>DmLoginForm: params.remote required</div>"];
        }
        if (!params.redirect) {
            return ["<div style='color:#ff0000'>DmLoginForm: params.redirect required</div>"];
        }
        $username = $("<input style='width:250px' type=text></input>");
        $password = $("<input style='width:250px' type=password></input>");
        $submit = $("<input type=submit value='SIGN IN'></input>");
        $error = $("<div style='display:none; font-style: italic; color: #ff0000;'></div>");

        return [
            "<div class=dm_login_form>",
                "<div style='font-size: 30px; font-weight:400'>",
                    "Log In",
                "</div>",
                $error,
                "<br>",
                "Username or email<br>",
                $username,
                "<br><br>",
                "Password<br>",
                $password,
                "<br><br>",
                $submit,
                "<br>",
                "<a style='font-size: 13px' href='reset_password.html'>Forgot password?</a>",
            "</div>"
        ];
    }

    this.onSetupCallbacks = function() {
        $submit.on('click', function() {
            var username = $username.val();
            var password = $password.val();
            $error.hide();

            if (username == "") {
                $error.html("Please enter username.");
                $error.slideDown();
                return;
            }
            if (password == "") {
                $error.html("Please enter password.");
                $error.slideDown();
                return;
            }

            params.remote.login({
                username: username,
                password: password
            }).onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    var msg;
                    if (data.error_msg) {
                        msg = data.error_msg;
                    } else if (result == CANOPY_ERROR_INCORRECT_USERNAME_OR_PASSWORD) {
                        msg = "Incorrect username or password";
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
