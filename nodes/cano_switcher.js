/*
 * Copyright 2014 SimpleThings, Inc.
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
 * params:
 *  .children : [{
 *      .name
 *      .content
 *  }]
 */
function CanoSwitcherNode(params) {
    var self=this,
        $me
    ;

    $.extend(this, new CanoNode());

    var show = function(content) {
        if (content.show) {
            content.show();
        }
        else {
            content.get$().show();
        }
    }

    var hide = function(content) {
        if (content.hide) {
            content.hide();
        }
        else {
            content.get$().hide();
        }
    }

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        var i = 0;
        for (i = 0; i < params.children.length; i++) {
            if (params.children[i].content.onLive) {
                params.children[i].content.onLive();
            }
        }
    }

    this.select = function(name) {
        var i;
        for (i = 0; i < params.children.length; i++) {
            if (params.children[i].name == name) {
                show(params.children[i].content);
            }
            else {
                hide(params.children[i].content);
            }
        }
    }

    $me = $("<div>");

    var i;
    for (i = 0; i < params.children.length; i++) {
        params.children[i].content.appendTo($me);
        hide(params.children[i].content);
    }
}
