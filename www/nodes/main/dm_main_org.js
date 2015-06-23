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
 * Main page of "Device Manager".
 *
 *  PARAMS:
 *      params.user
 *      params.viewer
 *
 *  MEHTODS:
 *      .setUser   -- Authenticated User
 *      .setViewer -- Viewer (User or Org) whose perspective should be shown.
 */
function DmMainOrg(params) {
    cuiInitNode(this);
    this.markDirty("user", "viewer");

    var topbar;
    var switcher;

    var devicesPage;
    var analyticsPage;
    var accountPage;

    var user = params.user;
    var viewer = params.viewer;

    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.setViewer = function(_viewer) {
        viewer = _viewer;
        this.markDirty("viewer");
        return this;
    }

    this.onConstruct = function() {

        orgAdminPage = new DmOrgAdminPage({
            user: user,
            org: viewer
        });

        topbar = new CuiTopbar({
            appName: "Device Manager",
            cssClass : "cui_default",
            items: [{
                content: "Organization",
                value: "organization"
            } ],
            navState: cuiNavState,
            navStateName: "page",
            onSelect: function(value) {
                switcher.select(value).refresh();
            },
            user: user,
            showAppDropdown: false,
            showUserDropdown: true,
        });

        switcher = new CuiSwitcher({
            children: {
                "organization" : orgAdminPage,
            },
            default: "organization",
        })

        this.markDirty("user");

        return [topbar, switcher];
    }

    this.onRefresh = function($me, dirty, live) {
        if (dirty("user")) {
            topbar.setUser(user);
            //devicesPage.setUser(user);

            if (user) {
                cuiNavState.set("u", user.username());
            } else {
                cuiNavState.set("u", "");
            }
        }

        if (dirty("viewer")) {
            if (viewer) {
                cuiNavState.set("v", viewer.name());
            } else {
                cuiNavState.set("v", "");
            }
        }

        cuiRefresh([topbar, switcher], live);
    }

}
