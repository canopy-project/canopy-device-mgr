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
 * Organizations screen on Account page for Canopy Device Manager
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *      params.onCreateClicked -- 
 *
 *  METHODS:
 *      setUser
 *
 */
function DmOrganizationsScreen(params) {
    cuiInitNode(this);
    this.markDirty("user");
    var self = this;

    var user = params.user;
    var $details;
    var $orgList;
    var createOrgBtn;
    
    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.onConstruct = function() {
        $details = $("<div>");
        $orgList = $("<div>");
        createOrgBtn = new CuiButton({
            cssClass: "cui_default",
            content: "CREATE ORGANIZATION",
            onClick: function() {
                if (params.onCreateClicked) {
                    params.onCreateClicked();
                }
            }
        });
        return ["<div>", 
            "<div style='font-size: 30px; font-weight:400'>",
                "Organizations",
            "</div>",
            "<br>",
            $details,
            $orgList,
            "<br>",
            createOrgBtn,
        "</div>"];
    }

    this.onRefresh = function($me, dirty, live) {
        if (dirty) {
            if (!user) {
                $details.html("No user specified.");
                return;
            }

            user.organizations().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Problem looking up organizations: " + result.error_msg);
                    return;
                }

                $orgList.html("");
                for (var i = 0; i < data.orgs.length; i++) {
                    $orgList.append("<a href='.'>" + data.orgs[i].name() + "</a><br>");
                }
            });

            $details.html("<div style='font-size:16px'>You are a member of:</div>");
        }
        
        cuiRefresh([createOrgBtn], live);
    }
}
