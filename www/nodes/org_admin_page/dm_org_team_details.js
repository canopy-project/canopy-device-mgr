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
 *      params.team
 *
 *  METHODS:
 *      setTeam
 *
 */
function DmOrgTeamDetails(params) {
    cuiInitNode(this);
    var self=this;

    var team = params.team;
    var cachedTeam = params.team;
    var $content;

    this.setTeam = function(_team) {
        team = _team;
        return this;
    }

    this.onConstruct = function() {
        $content = $("<div>No team selected.</div>");
        return [
            "<div style='padding:16px'>",
                $content,
            "</div>",
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        if (cachedTeam != team) {
            //
            // Team changed
            //
            $content.html("<b>" +  team.name() + "</b> Members:");
            team.members().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Problem getting organization members");
                    return;
                }
                var tbl = $("<table cellspacing=0 cellpadding=0 class='dm_org_admin_page dm_table'>" +
                        "<th colspan=4>Members of " + params.org.name() + "</th></tr><tr>" +
                    "</table>"
                );
                for (var i = 0; i < data.members.length; i++) {
                    removeBtn = $("<a href='javascript:void(0)'>Remove</a>");
                    removeBtn.on('click', function(idx) {
                        return function() {
                            params.org.removeMember(data.members[idx].username).onDone(function(result, data) {
                                self.refresh();
                            });
                        }
                    }(i));
                    tbl.append(cuiCompose([
                        "<tr>",
                            "<td>",
                                "<b>", data.members[i].username, "</b><br>",
                                data.members[i].email,
                            "</td>",
                            "<td></td>", // TODO
                            "<td></td>",  // TODO
                            "<td>",
                                removeBtn,
                            "</td>" + 
                        "</tr>"])
                    );
                }
                memberListOuter.html(tbl);
            });
            cachedTeam = team;
        }
    }
}
