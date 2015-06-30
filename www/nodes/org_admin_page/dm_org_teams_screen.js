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
 *      params.onCreateTeamClicked
 *
 */
function DmOrgTeamsScreen(params) {
    cuiInitNode(this);
    var self=this;

    var layout;
    var sidebar;
    var main;

    this.onConstruct = function() {
        sidebar = new DmOrgTeamsSidebar({
            org: params.org,
            onCreateTeamClicked: params.onCreateTeamClicked,
            onTeamSelected: function(team) {
                main.setTeam(team).refresh();
            }
        });

        main = new DmOrgTeamDetails({
            org: params.org,
        });

        layout = new CuiHSplitLayout({
            left: sidebar,
            right: main,
            leftSize: "220px"
        });

        return [
            "<div class='dm_orgs_page' style='position:absolute; width:100%; height:100%'>",
                layout,
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        return cuiRefresh([layout], live);
    }
}
