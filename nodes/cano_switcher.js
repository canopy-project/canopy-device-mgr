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
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher;

    $.extend(this, new CanoNode());

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
                if (params.children[i].content.get$)
                    params.children[i].content.get$().show();
                else
                    params.children[i].content.show();

            }
            else {
                if (params.children[i].content.get$)
                    params.children[i].content.get$().hide();
                else
                    params.children[i].content.hide();
            }
        }
    }

    $me = $("<div>");

    var i;
    for (i = 0; i < params.children.length; i++) {
        if (params.children[i].content.get$) {
            params.children[i].content.appendTo($me);
            params.children[i].content.get$().hide();
        }
        else {
            params.children[i].content.appendTo($me);
            params.children[i].content.hide();
        }
    }
}
