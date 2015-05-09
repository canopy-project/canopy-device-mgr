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
 * Sidebar for Devices screen of Canopy Device Manager
 *
 *  PARAMS:
 *      params.user
 *      params.onCreateDeviceClicked
 *      params.onFilterChange
 *
 *  METHODS:
 *      setUser
 *
 */
function DmDevicesSidebar(params) {
    cuiInitNode(this);

    var user = params.user;

    var $all;
    var $activated;
    var $connected, $connectedText, $connectedLabel;
    var $disconnected, $disconnectedText, $disconnectedLabel;
    var $newlyCreated, $newlyCreatedText, $newlyCreatedLabel;
    var $inactive, $inactiveText, $inactiveLabel;
    var $active, $activeText, $activeLabel;

    this.setUser = function(_user) {
        user = _user;
        this.markDirty("user");
        return this;
    }

    this.onConstruct = function() {
        $all = $("<a href='javascript:void(0);'>All</a>");
        $activated = $("<a href='javascript:void(0);'>Activated</a>");

        $connected = $("<input type=checkbox>");
        $connectedText = $("<span> Connected</span>")
        $connectedLabel = cuiCompose([
            "<label>", 
            $connected, 
            $connectedText, 
            "</label>"
        ]);

        $active = $("<input type=checkbox>");
        $activeText = $("<span> Active</span>")
        $activeLabel = cuiCompose([
            "<label>", 
            $active, 
            $activeText, 
            "</label>"
        ]);

        $inactive = $("<input type=checkbox>");
        $inactiveText = $("<span> Inactive</span>")
        $inactiveLabel = cuiCompose([
            "<label>", 
            $inactive, 
            $inactiveText, 
            "</label>"
        ]);

        $disconnected = $("<input type=checkbox>");
        $disconnectedText = $("<span> Disconnected</span>")
        $disconnectedLabel = cuiCompose([
            "<label>", 
            $disconnected, 
            $disconnectedText, 
            "</label>"
        ]);

        $newlyCreated = $("<input type=checkbox>");
        $newlyCreatedText = $("<span> Newly Created</span>")
        $newlyCreatedLabel = cuiCompose([
            "<label>", 
            $newlyCreated, 
            $newlyCreatedText, 
            "</label>"
        ]);

        $createDevice = $("<input type=submit value='CREATE DEVICES'></input>");

        return [
            "<div class='dm_devices_page dm_filter_list'>",
                "<div>",
                    "<div class='ml'>Filter</div>",
                    $all,
                    "<br>", $activated,
                    "<br>",
                    "<br><b>ACTIVITY</b>",
                    "<br>", $activeLabel,
                    "<br>", $inactiveLabel,
                    "<br>", $newlyCreatedLabel,
                    "<br><br><b>WEBSOCKET STATUS</b>",
                    "<br>", $connectedLabel,
                    "<br>", $disconnectedLabel,
                "</div>",
            "</div>",
            "<div class='dm_devices_page dm_sidebar_bottom'>",
                $createDevice,
                "<br><br>",
                "Powered by <a target=_blank href=http://canopy.link><span class='logo-in-text'>Canopy</div>",
            "</div>",
        ];
    }

    this.onRefresh = function($me, dirty, live) {
    }

    function clearAllFilters() {
        $connected.prop("checked", false);
        $disconnected.prop("checked", false);
        $newlyCreated.prop("checked", false);
        $active.prop("checked", false);
        $inactive.prop("checked", false);
    }

    function updateFilter() {
        var filters = [];
        var genFilterName = (filterName == "");

        if ($newlyCreated.is(":checked")) {
            if (genFilterName) {
                filterName += "Newly Created &amp; ";
            }
            filters.push("system.activity_status == -1");
        }
        if ($connected.is(":checked")) {
            if (genFilterName) {
                filterName += "Connected &amp; ";
            }
            filters.push("system.ws_connected == true");
        }
        if ($disconnected.is(":checked")) {
            if (genFilterName) {
                filterName += "Disconnected &amp; ";
            }
            filters.push("system.ws_connected == false");
        }
        if ($active.is(":checked")) {
            if (genFilterName) {
                filterName += "Active &amp; ";
            }
            filters.push("system.activity_status == 1");
        }
        if ($inactive.is(":checked")) {
            if (genFilterName) {
                filterName += "Inactive &amp; ";
            }
            filters.push("system.activity_status == 0");
        }
        if (genFilterName) {
            if (filterName == "") {
                filterName = "All";
            }
            else {
                filterName = filterName.substring(0, filterName.length-6);
            }
        }
        if (params.onFilterChange)
            var filter = filters.join(" OR ");
            console.log(filter);
            params.onFilterChange(filterName, filter);

    }

    this.onSetupCallbacks = function($me) {
        $createDevice.on('click', function() {
            if (params.onCreateDeviceClicked) {
                params.onCreateDeviceClicked();
            }
        });

        $all.on('click', function() {
            clearAllFilters();
            filterName = "";
            updateFilter();
        });

        $activated.on('click', function() {
            clearAllFilters();
            $active.prop("checked", true);
            $inactive.prop("checked", true);
            filterName = "Activated";
            updateFilter();
        });

        $newlyCreated.on('click', function() {
            filterName = "";
            updateFilter();
        });

        $connected.on('click', function() {
            filterName = "";
            updateFilter();
        });
        $disconnected.on('click', function() {
            filterName = "";
            updateFilter();
        });
        $active.on('click', function() {
            filterName = "";
            updateFilter();
        });
        $inactive.on('click', function() {
            filterName = "";
            updateFilter();
        });
    }

    this.onTeardownCallbacks = function($me) {
        $createDevice.off('click');
        $all.off('click');
        $activated.off('click');
        $newlyCreated.off('click');
        $connected.off('click');
        $disconnected.off('click');
        $active.off('click');
        $inactive.off('click');
    }
}
