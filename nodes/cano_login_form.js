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

/*
 * params contains:
 *      remote - CanopyRemote object
 *      redirect - string URL
 */
function CanoLoginFormNode(params) {
    var self=this,
        $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#login_btn").off('click').on('click', function() {
            var username = $("#login_user").val();
            var password = $("#login_password").val();
            $("#login_error").hide();

            if (username == "") {
                $("#login_error").html("Please enter username.");
                $("#login_error").slideDown();
                return;
            }
            if (password == "") {
                $("#login_error").html("Please enter password.");
                $("#login_error").slideDown();
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
                    $("#login_error").html(msg);
                    $("#login_error").slideDown();
                    return;
                }
                window.location.replace(params.redirect);
            });
        });
    }

    $me = $("\
        <div style='font-size: 30px; font-weight:400'>\
            Log In\
        </div>\
        <div style='display:none; font-style: italic; color: #ff0000;' id=login_error></div>\
        <p>\
            Username or email<br>\
            <input style='width:250px' id=login_user type=text></input>\
        </p>\
        <p>\
            Password<br>\
            <input style='width:250px' id=login_password type=password></input>\
        </p>\
        <p>\
            <input id=login_btn type=submit value='SIGN IN'></input><br> <a style='font-size: 13px' href='reset_password.html'>Forgot password?</a>\
        </p>\
    ");
}

