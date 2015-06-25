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
 * Organization Member List screen
 *
 *  PARAMS:
 *      params.org -- Optional CanopyOrganization object
 *      params.onInviteClicked -- Callback when "invite" button is clicked.
 *
 */
function DmOrgMembersScreen(params) {
    cuiInitNode(this);

    var memberListOuter;
    var inviteBtn;

    this.onConstruct = function() {
        memberListOuter = $("<div>loading...</div>");

        inviteBtn = new CuiButton({
            cssClass: "cui_default",
            content: "+ ADD MEMBER",
            onClick: function() {
                if (params.onInviteClicked) {
                    params.onInviteClicked()
                }
            }
        });


        return [
            "<div style='margin-left:240px; margin-top:24px'>",
                memberListOuter,
                "<br>",
                inviteBtn,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        if (live) {
            params.org.members().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Problem getting organization members");
                    return;
                }
                var tbl = $("<table cellspacing=0 cellpadding=0 class='dm_org_admin_page dm_table'>" +
                        "<th colspan=4>Members of " + params.org.name() + "</th></tr><tr>" +
                    "</table>"
                );
                for (var i = 0; i < data.members.length; i++) {
                    tbl.append($("<tr>" +
                            "<td><b>" + data.members[i].username + "</b><br>" + 
                    data.members[i].email + "</td>" + 
                    "<td>1 team</td>" + 
                    "<td>Owner</td>" + 
                    "<td><a href='.'>Remove</a></td>" + 
                    "</tr>)"));
                }
                memberListOuter.html(tbl);
            });
        }

        return cuiRefresh([inviteBtn], live);
    }
}
