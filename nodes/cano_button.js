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
/*
 * Generic button
 *
 * params:
 *  cssClass
 *  content
 *  onClick
 */
function CanoButtonNode(origParams) {
    var self=this,
        $me
    ;

    var params = $.extend({}, {
        cssClass: "",
        content: "",
        onClick: "",
    }, origParams);

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $me.off('click').on('click', function() {
            if (params.onClick)
                params.onClick();
        });
    }

    $me = CanopyUtil_Compose(["<div class=\"" + params.cssClass + "\">", params.content, "</div>"]);
}
