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
        dispatcher = params.dispatcher,
        plotNode,
        device = null
    ;
    for (var i = 0; i < canopy.devices.length; i++) {
        if (canopy.devices[i].properties.speed) {
            device = canopy.devices[i];
        }
    }

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }
    var speed;

    function updateImage(event, ui) {
        var oldSpeed = speed;
        var val = ui.value;
        if (val == 0 || val == 1) {
            $("#slider_title").html("OFF");
            $("#fan_image").attr("src", "images/dyson_fan_off_cropped.jpg");
            speed = 0;
        }
        else if (val == 2) {
            $("#slider_title").html("LOW");
            $("#fan_image").attr("src", "images/dyson_fan_low_cropped.jpg");
            speed = 1;
        }
        else if (val == 3) {
            $("#slider_title").html("MED");
            $("#fan_image").attr("src", "images/dyson_fan_med_cropped.jpg");
            speed = 2;
        }
        else if (val == 4 || val == 5) {
            $("#slider_title").html("MAX");
            $("#fan_image").attr("src", "images/dyson_fan_high_cropped.jpg");
            speed = 3;
        }
        $("#instructions").hide();

        if (speed != oldSpeed) {
            device.properties.speed.setTargetValue(speed, {
                onError: function() {alert("oops");}
            });
        }
    }

    function showScreen(showTempPlot, showHumidityPlot) {
    }

    this.onLive = function() {
        $('body').css('background', '#ffffff');
        $("#slider").slider({
            range: "min",
            max: 5,
            value: 0,
            change: updateImage,
            slide: updateImage
        });
        var screen = "main";
        $("#thermometer").off('click').on("click", function(){
            if (screen == "main") {
                device.properties.temperature.fetchHistoricData({
                    onSuccess: function(data) {
                        plotNode.setTimeseriesData(data);
                        $("#plot_screen").show();
                        $("#main_screen").hide();
                    },
                    onError: function() {
                        alert("oops");
                    }
                });
                $("#thermometer").toggleClass("demo-icon-selected", true);
                $("#thermometer").toggleClass("demo-icon", false);
                screen = "plot";
            }
            else {
                $("#plot_screen").hide();
                $("#main_screen").show();
                $("#thermometer").toggleClass("demo-icon-selected", false);
                $("#thermometer").toggleClass("demo-icon", true);
                screen = "main";
            }
        });
        $("#humidity").hover(function(){
                    $("#plot_screen").show();
                    $("#main_screen").hide();
                },
                function(){
                    $("#plot_screen").hide();
                    $("#main_screen").show();
                }
        );
        $("body").on("touchstart", function(ev) {
            $("#slider").hide();
        });
        $("#fan_image").on("touchstart touchmove", function(ev) {
            ev.preventDefault();
            var value = ((ev.originalEvent.pageX - 255) / (800 - 255.0)) * 5;
            if (value < 0)
                value = 0;
            if (value > 5)
                value = 5;
            value = Math.floor(value);
            updateImage(null, {value: value});
        });
        $("#instructions").on("touchstart touchmove", function(ev) {
            ev.preventDefault();
            var value = ((ev.originalEvent.pageX - 255.) / (800. - 255.0)) * 5;
            if (value < 0)
                value = 0;
            if (value > 5)
                value = 5;
            value = Math.floor(value);
            updateImage(null, {value: value});
        });
        plotNode.appendTo($("#plotspot"));

    }
    console.log(device.properties);
    console.log(device.properties.temperature);
    $me = $("<div class=center_channel style='padding-left:32px;'>\
        <br>\
        <br>\
        <br>\
        <!--span style='color:#a0a0a0;font-size:70px; font-weight:200'>dyzon</span-->\
        <div id=dyzon style='display:inline-block; color:#a0a0a0;font-size:70px; font-weight:200'>dyzon</div>\
        <span style='color:#000000;font-size:70px; font-weight:200'>AR06</span>\
        <div style='white-space:nowrap; float:right; solid #a0a0a0;line-height:1; text-align:right; padding-right:32px;'><br><span style='color:#808080;font-size:40px; font-weight:300'>My Smart Fan</span><span style='font-size:30px'><br>Greg's Office</span></div>\
        <table cellspacing=0 cellpadding=0 width=100%><tr><td width=1 align=center valign=top style='padding-left:24px; font-size:20px;line-height:1; border-right:2px solid #d8d8d8; padding-right:24px;'>\
            <br><br><img src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/approve.png>\
            <br>\
            Connected\
            <br><br><img id='thermometer' class=demo-icon src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/thermometer.png>\
            <br>\
            " + device.properties.temperature.value() + "&deg;F\
            <br><br><img id='humidity' src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/drop.png>\
            " + device.properties.humidity.value() + "%<br>\
            <br><br><img src=http://b.dryicons.com/images/icon_sets/pixelistica_blue_icons/png/64x64/add_contact.png>\
            <br>\
            Share\
        </td><td valign=top>\
            <div id='main_screen' style='padding-left:48px'>\
                <img id='fan_image' src=images/dyson_fan_off_cropped.jpg width=85%>\
                <div style='position:relative'>\
                    <div id='instructions' style='display:inline-block; position:absolute; top:-410px; left:40px;'>\
                        <div style='border-bottom: 1px dashed #b0b0b0; border-top:1px dashed #b0b0b0; font-size:16px;display:inline-block; text-align:center;width:500px; padding-left:80px; height:140px; padding-top:110px'>\
                        &larr; click or drag to adjust fan speed &rarr;</div>\
                    </div>\
                    <div style='display:inline-block; position:absolute; top:-410px; left:00px;'>\
                        <div id='slider' style='font-size:400px;display:inline-block; width:680px'></div>\
                    </div>\
                    <div style='display:inline-block; position:absolute; top:-140px; left:180px;'>\
                        <div style='display:inline-block; color: #a0a0a0; font-weight:200; margin-left:40px; font-size:70px' id='slider_title'>OFF</div>\
                    </div>\
                </div>\
            </div>\
            <div id='plot_screen' style='display:none'>\
                <div style='position:relative'>\
                    <div id=plotspot style='padding:4px;'>\
                    </div>\
                </div>\
            </div>\
        </table>\
    </div><br><br><br><br>");

    plotNode = new CanoPlotNode({
        title: "hi",
        vAxisFormat: "#%"
    });
}
