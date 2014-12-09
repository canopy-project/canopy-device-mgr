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
function CanoDevicesCreateNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $("#create_btn").off('click').on('click', function() {
            /*var username = $("#login_user").val();
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

            canopy.Login({
                username: username,
                password: password,
                onSuccess: function() {
                    window.location.replace("index_new.html");
                },
                onError: function(reason) {
                    if (reason == "incorrect_username_or_password") {
                        $("#login_error").html("Incorrect username or password.");
                    }
                    else {
                        $("#login_error").html("Oops... Error signing in.");
                    }
                    $("#login_error").slideDown();
                }
            });*/

            canopy.CreateDevice({
                deviceName: "MyDevice",
                quanitity: 1,
                onSuccess: function() {
                    if (params.onCreated)
                        params.onCreated();
                },
                onError: function() {
                    alert("Error creating device");
                }
            });
        });

        $("#cancel_btn").off('click').on('click', function() {
            if (params.onCancel)
                params.onCancel();
        });
    }

    $me = $("\
        <div style='border-bottom:1px solid #a0a0a0; padding:16px;'>\
            Devices &rarr; Create Device\
        </div>\
        <div style='padding:16px;'>\
            <div style='font-size: 30px; font-weight:400'>\
                Create Device\
            </div>\
            <div style='font-size: 16px; color: #404040;'>\
                This form allocates UUID and Secret Key pairs for you to use.\
            </div>\
            <div style='display:none; font-style: italic; color: #ff0000;' id=login_error></div>\
            <p>\
                Device Name<br>\
                <input style='width:250px' id=login_user type=text></input>\
            </p>\
            <p>\
                How many to create?<br>\
                <input style='width:250px' value=1 id=login_user type=text></input>\
            </p>\
            <p>\
                <input id=create_btn type=submit value='CREATE'></input>\
                <input class=btn_not_selected id=cancel_btn type=submit value='CANCEL'></input>\
            </p>\
        </div>\
    ");

}
