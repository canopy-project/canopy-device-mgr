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
 * Organization details widget
 *
 *  PARAMS:
 *      params.user -- Optional CanopyUser object
 *      params.org -- Optional CanopyOrganization object
 *
 *  METHODS:
 *      setUser
 *      setOrg
 *
 */
function DmOrgDetails(params) {
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
    }

    this.onRefresh = function($me, dirty, live) {
    }
}
