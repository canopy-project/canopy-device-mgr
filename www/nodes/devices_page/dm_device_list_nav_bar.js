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
 *  METHODS:
 *
 */
function DmDeviceListNavBar(params) {
    cuiInitNode(this);
    var self = this;

    var pageControl;

    this.startIdx = function() {
        return pageControl.startIdx();
    }

    this.numItemsPerPage = function() {
        return pageControl.numItemsPerPage();
    }

    this.setNumItems = function(count) {
        return pageControl.setNumItems(count);
    }

    this.onConstruct = function() {
        pageControl = new CuiPageControl({
            cssClass: "cui_default",
            onPageChange: function(page) {
                if (params.onPageChange) {
                    params.onPageChange(page);
                }
            },
            itemsPerPage: 30
        });

        return [
            "<div style='padding-top: 8px; padding-bottom:4px; max-width:800px;'>",
                "<div style='text-align: right'>",
                    pageControl,
                "</div>",
            "</div>"
        ];
    }

    this.onRefresh = function($me, dirty, live) {
        cuiRefresh([pageControl], live);
    }
}
