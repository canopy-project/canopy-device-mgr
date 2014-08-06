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
function DizonDemoPageNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    function updateImage(event, ui) {

        var val = ui.value;
        console.log(val);
        if (val == 0) {
            $("#slider_title").html("OFF");
            $("#fan_image").attr("src", "images/dyson_fan_off_cropped.jpg");
        }
        else if (val == 1) {
            $("#slider_title").html("LOW");
            $("#fan_image").attr("src", "images/dyson_fan_low_cropped.jpg");
        }
        else if (val == 2) {
            $("#slider_title").html("MED");
            $("#fan_image").attr("src", "images/dyson_fan_med_cropped.jpg");
        }
        else if (val == 3) {
            $("#slider_title").html("HIGH");
            $("#fan_image").attr("src", "images/dyson_fan_high_cropped.jpg");
        }
    }

    this.onLive = function() {
        $('body').css('background', '#ffffff');
        $("#slider").slider({
            range: "min",
            max: 3,
            value: 0,
            change: updateImage,
            slide: updateImage
        });
    }

    $me = $("<div class=center_channel>\
        <br>\
        <span style='color:#a0a0a0;font-size:70px; font-weight:200'>dyzon</span>\
        <span style='color:#000000;font-size:70px; font-weight:200'>AR06</span>\
        <div style='line-height:1;margin-left:330px; text-align:right; display:inline-block'><span style='color:#808080;font-size:30px; font-weight:300'>My Smart Fan</span><br>Greg's Office</div>\
        <table cellspacing=0 cellpadding=0><tr><td  align=center valign=top style='font-size:25px;line-height:1; border-right:1px solid #d8d8d8; padding-right:48px;'>\
            <br><br><img src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/approve.png>\
            <br>\
            Connected\
            <br><br><img src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/thermometer.png>\
            <br>\
            84&deg;F\
            <br><br><img src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/drop.png>\
            <br>\
            43%\
            <br><br><img src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/add_contact.png>\
            <br>\
            Share\
        </td><td style='padding-left:48px' valign=top>\
            <img id='fan_image' src=images/dyson_fan_off_cropped.jpg width=100%>\
            <div style='position:relative'>\
                <div style='display:inline-block; position:absolute; top:-110px; left:220px;'>\
                    <div id='slider' style='font-size:30px;display:inline-block; width:320px'></div>\
                    <div style='display:inline-block; margin-left:40px; font-size:40px' id='slider_title'>OFF</div>\
                </div>\
            </div>\
        </table>\
    </div>");
}
