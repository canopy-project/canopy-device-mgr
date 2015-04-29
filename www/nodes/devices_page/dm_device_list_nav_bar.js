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
 * Navigation bar above device list table.
 *
 *  PARAMS:
 *
 *      .filterName
 *
 *  METHODS:
 *
 */
function DmDeviceListNavBar(params) {
    cuiInitNode(this);
    this.markDirty();

    var self = this;

    var pageControl;
    var filterName = (params.filterName ? params.filterName : "");
    var $filterName;

    this.startIdx = function() {
        return pageControl.startIdx();
    }

    this.numItemsPerPage = function() {
        return pageControl.numItemsPerPage();
    }

    this.setNumItems = function(count) {
        this.markDirty();
        pageControl.setNumItems(count);
        return this;
    }

    this.setFilterName = function(_filterName) {
        filterName = _filterName;
        this.markDirty();
    }

    this.onConstruct = function() {
        pageControl = new CuiPageControl({
            cssClass: "cui_default",
            onPageChange: function(page) {
                if (params.onPageChange) {
                    params.onPageChange(page);
                }
                self.markDirty().refresh();
            },
            itemsPerPage: 30
        });

        $filterName = $("<div class='dm_device_list_nav_bar dm_filter_name'></div>");

        return [
            "<div style='padding-top: 8px; padding-bottom:4px; max-width:800px;'>",
                "<div style='display: inline-block; width:50%; text-align: left'>",
                    "<div style='padding-left: 8px'>",
                        $filterName,
                    "</div>",
                "</div>",
                "<div style='display: inline-block; width:50%; text-align: right'>",
                    "<div style='padding-right: 8px'>",
                        pageControl,
                    "</div>",
                "</div>",
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        if (dirty()) {
            $filterName.html("Showing <i>" + filterName + "</i><b> " +
                (pageControl.startIdx()+1) + "-" + (pageControl.endIdx()) + 
                " of " + pageControl.numItems() + "</b>"
            );
        }
        cuiRefresh([pageControl], live);
    }
}
