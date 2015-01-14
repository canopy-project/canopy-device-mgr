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
function CanoEditable(params) {
    var self=this,
        $me,
        $input,
        $text,
        value,
        device = params.device
        textClass = (params.textClass != undefined) ? params.textClass : "";
        inputClass = (params.inputClass != undefined) ? params.inputClass : "";
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $text.off('click').on('click', function() {
            $input.show();
            $input.select();
            $text.hide();
        });
        $input.off('change').on('change',  function() {
            $input.hide();
            $text.show();
            self.setValue($input.val(), false);
        });
        $input.off('change').on('blur',  function() {
            $input.hide();
            $text.show();
            self.setValue($input.val(), false);
        });
    }

    this.setValue = function(val, skipCallbacks) {
        if (value != val) {
            value = val;
            this.refresh();
            if (params.onChange && !skipCallbacks) {
                params.onChange(val);
            }
        }
    }

    this.refresh = function() {
        $text.html(value + "&nbsp;");
        $input.val(value);
    }

    $input = $("<input class='" + inputClass + "'value=></input>");
    $input.hide();
    $text = $("<div class='" + textClass + "'></div>");

    $me = $("<div></div>");
    $me.append($text);
    $me.append($input);
}

