/*
 * Copyright 2014 Gregory Prisament
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
function CanoDevicesSidebarNode(params) {
    var self=this,
        $me,
        filterName = "",
        accountDropdownNode,
        $createDevice,
        $all,
        $activated,
        $connected,
        $disconnected,
        $newlyCreated,
        $inactive,
        $active
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $createDevice.off('click').on('click', function() {
            if (params.onCreateDeviceLink) {
                params.onCreateDeviceLink();
            }
        });

        var clearAllFilters = function() {
            $connected.prop("checked", false);
            $disconnected.prop("checked", false);
            $newlyCreated.prop("checked", false);
            $active.prop("checked", false);
            $inactive.prop("checked", false);
        }

        $all.off('click').on('click', function() {
            clearAllFilters();
            filterName = "";
            updateFilter();
        });

        $activated.off('click').on('click', function() {
            clearAllFilters();
            $active.prop("checked", true);
            $inactive.prop("checked", true);
            filterName = "Activated";
            updateFilter();
        });

        $newlyCreated.off('click').on('click', function() {
            filterName = "";
            updateFilter();
        });

        $connected.off('click').on('click', function() {
            filterName = "";
            updateFilter();
        });
        $disconnected.off('click').on('click', function() {
            filterName = "";
            updateFilter();
        });
        $active.off('click').on('click', function() {
            filterName = "";
            updateFilter();
        });
        $inactive.off('click').on('click', function() {
            filterName = "";
            updateFilter();
        });
    }

    function updateFilter() {
        var filter = {};
        var genFilterName = (filterName == "");

        if ($newlyCreated.is(":checked")) {
            if (genFilterName) {
                filterName += "Newly Created &amp; ";
            }
            // TODO: also show connected devices
            filter.newly_created = true;
        }
        if ($connected.is(":checked")) {
            if (genFilterName) {
                filterName += "Connected &amp; ";
            }
            filter.connected = true;
        }
        if ($disconnected.is(":checked")) {
            if (genFilterName) {
                filterName += "Disconnected &amp; ";
            }
            // TODO: also show connected devices
            filter.disconnected = true;
        }
        if ($active.is(":checked")) {
            if (genFilterName) {
                filterName += "Active &amp; ";
            }
            filter.active = true;
        }
        if ($inactive.is(":checked")) {
            if (genFilterName) {
                filterName += "Inactive &amp; ";
            }
            filter.inactive = true;
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
            params.onFilterChange(filterName, filter);

    }
    $createDevice = $("<input type=submit value='CREATE DEVICES'></input>");

    params.user.devices().getMany(0, 10).onDone(function(result, data) {
        var devices = data.devices;
        var allDevices = data.devices;
        var activatedDevices = filterDevices({active: true, inactive: true}, devices);
        var connectedDevices = filterDevices({connected: true}, devices);
        var disconnectedDevices = filterDevices({disconnected: true}, devices);
        var activeDevices = filterDevices({active: true}, devices);
        var inactiveDevices = filterDevices({inactive: true}, devices);
        var newlyCreatedDevices = filterDevices({newlyCreated: true}, devices);


        $all.html("All (" + allDevices.length + ")");
        $activated.html("Activated (" + activatedDevices.length + ")");
        $connectedLabel.html("Connected (" + connectedDevices.length + ")").prepend($connected);
        $activeLabel.html("Active (" + activeDevices.length + ")").prepend($active);
        $inactiveLabel.html("Inactive (" + inactiveDevices.length + ")").prepend($inactive);
        $disconnectedLabel.html("Disconnected (" + disconnectedDevices.length + ")").prepend($disconnected);
        $newlyCreatedLabel.html("Newly Created (" + newlyCreatedDevices.length + ")").prepend($newlyCreated);

        self.onLive();
    });

    $all = $("<a href='javascript:void(0);'>All (?)</a>");
    $activated = $("<a href='javascript:void(0);'>Activated (?)</a>");

    $connected = $("<input type=checkbox>");
    $connectedLabel = CanopyUtil_Compose(["<label>", $connected, "Connected</label>"]);

    $active = $("<input type=checkbox>");
    $activeLabel = CanopyUtil_Compose(["<label>", $active, "Active</label>"]);

    $inactive = $("<input type=checkbox>");
    $inactiveLabel = CanopyUtil_Compose(["<label>", $inactive, "Inactive</label>"]);

    $disconnected = $("<input type=checkbox>");
    $disconnectedLabel = CanopyUtil_Compose(["<label>", $disconnected, "Disconnected</label>"]);

    $newlyCreated = $("<input type=checkbox>");
    $newlyCreatedLabel = CanopyUtil_Compose(["<label>", $newlyCreated, "Newly Created</label>"]);

    $me = CanopyUtil_Compose(["\
        <div style='z-index: 400; position:fixed; left:16px; width: 234px; top: 90px; bottom:0px; background:#ffffff; color:#000000'>\
            <div style='padding:8px; font-size: 16px;'>\
                <div class='ml'>Filter</div>\
                ", $all, "\
                <br>", $activated, "\
                <br>\
                <br><b>ACTIVITY</b>\
                <br>", $activeLabel, "\
                <br>", $inactiveLabel, "\
                <br>", $newlyCreatedLabel, "\
                \
                <br><br><b>WEBSOCKET STATUS</b>\
                <br>", $connectedLabel, "\
                <br>", $disconnectedLabel, "\
            </div>\
        </div>\
        <div style='padding-bottom:16px; text-align:center; z-index: 500; position:fixed; width: 250px; bottom:0px; background:#ffffff; color:#000000'>\
            ", $createDevice, "<br><br>\
            Powered by <a target=_blank href=http://canopy.link><span class='logo-in-text'>Canopy</div>\
        </div>\
    "]);
}
