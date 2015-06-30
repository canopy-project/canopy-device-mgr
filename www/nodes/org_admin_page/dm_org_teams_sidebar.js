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
 *      params.onCreateTeamClicked -- 
 *      params.onTeamSelected --  function(teamObj)
 *
 */
function DmOrgTeamsSidebar(params) {
    cuiInitNode(this);
    var self=this;

    var createBtn;
    var optionNode;

    this.onConstruct = function() {
        $content = $("<div>Loading...</div>");
        createBtn = new CuiButton({
            cssClass: "cui_default",
            content: "CREATE TEAM",
            onClick: function() {
                if (params.onCreateTeamClicked) {
                    params.onCreateTeamClicked();
                }

            }
        });

        optionNode = new CuiOption({
            cssClass: "dm_org_team_selection",
            onSelect: function(idx, value) {
                if (params.onTeamSelected) {
                    params.onTeamSelected(value)
                }
            },
            items : [],
        });

        return [
            "<div style='padding:8px; <br>font-size:18px;'>",
                $content,
                optionNode,
                "<br><br>",
                createBtn,
            "</div>",
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        if (live) {
            params.org.teams().onDone(function(result, data) {
                if (result != CANOPY_SUCCESS) {
                    alert("Problem loading team list");
                    return;
                }

                if (data.teams.length == 0) {
                    $content.html("Organization " + params.org.name() + " currently has no teams.");
                } else {
                    $content.html("<div class='l'>Teams</div>");
                    var items = [];
                    for (var i = 0; i < data.teams.length; i++) {
                        items.push({
                            content: data.teams[i].name(), 
                            value: data.teams[i],
                        });
                    }
                    optionNode.setItems(items).refresh();
                }
            });
        }
        cuiRefresh([createBtn, optionNode], live);
    }
}
