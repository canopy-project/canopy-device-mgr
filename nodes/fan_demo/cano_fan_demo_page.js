FAN_DEVICE_ID = "d59e4703-ed10-11e3-a241-74d02b36a289";

function CanoFanDemoPageNode(canopy, dispatcher) {
    var self=this,
        $me,
        topbarNode,
        $content,
        chart1,
        chart2,
        optionNode,
        $topp,
        $bottom,
        $temp,
        $hum,
        skipRefresh=0
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.onLive();
        optionNode.onLive();
        canopy.fetchSensorData(FAN_DEVICE_ID, "temperature", function(data) {
            chart1.setTimeseriesData(data.samples);
        })
        canopy.fetchSensorData(FAN_DEVICE_ID, "humidity", function(data) {
            chart2.setTimeseriesData(data.samples);
        })

        self.refresh();
    }

    this.refresh = function() {
        if (skipRefresh > 0) {
            skipRefresh--;
            console.log(skipRefresh);
            setTimeout(function(){self.refresh(true);}, 3000);
            return;
        }
        var i = gDevices.length;
        for (i = 0; i < gDevices.length; i++) {
            if (gDevices[i].device_id == FAN_DEVICE_ID) {
                var sensors = CanopyUtil_GetDeviceSensors(gDevices[i]);

                var temp = Math.round(100*(1.8*sensors["temperature"]._value + 32))/100;
                var hum = Math.round(100*sensors["humidity"]._value)/100;
                $temp.html("<div class=l>" + temp + "&deg;F</div>Temperature");
                $hum.html("<div class=l>" + hum + "%</div>Humidity");

                var controls = CanopyUtil_GetDeviceControls(gDevices[i]);
                var speed = controls["speed"]._value;
                optionNode.select(speed, true);
            }
        }
        setTimeout(function(){self.refresh(true);}, 3000);
    }

    optionNode = new CanoOptionNode({
        normalClass: "bigbtn",
        selectedClass: "bigbtn_selected",
        items: [ {
            html: "OFF",
            value: 0
        }, {
            html: "SLOW",
            value: 1
        }, {
            html: "MEDIUM",
            value: 2
        }, {
            html: "FAST",
            value: 3
        } ],
        onSelect: function(idx, item) {
            canopy.setControlValue(FAN_DEVICE_ID, "speed", item.value, 
                function() {skipRefresh = 2;}, 
                function() {
                    alert("Failed to set fan speed!");
                }
            );
        }
    });

    $content = $("<div class=center_channel></div>");
    $btnOuter = $("<div style='position:relative'></div>").appendTo($content);
    $chartOuter = $("<div style='position:relative'></div>").appendTo($content);
    $btnInner = $("<div style='position:absolute; display:inline-block; left:350px; top:465px'></div>").appendTo($btnOuter);
    $("<img height=600 src=http://www.canopy.link/shutterstock_82034455_fan.jpg></img>").appendTo($content);
    optionNode.appendTo($btnInner);

    $topp = $("<div style='position:absolute; top:120px; left:330px; width:630px;'></div>");
    $bottom = $("<div style='position:absolute; top:300px; left:330px; width:630px;'></div>");
    $chartOuter.append($topp);
    $chartOuter.append($bottom);

    chart1 = new CanoPlotNode({title: "Temperature", vAxisFormat: "#˚F"}).appendTo($topp);
    chart2 = new CanoPlotNode({title: "Humidity", vAxisFormat: '#%'}).appendTo($bottom);
    $temp = $("<div class=sensor_box style='position:absolute; top:130px; left:700px'><div class=xxl>-&deg;F</div>Temperature</div>").appendTo($chartOuter);
    $hum = $("<div class=sensor_box style='position:absolute; top:310px; left:700px'><div class=xxl>-%</div>Humidity</div>").appendTo($chartOuter);
    /*$content = $("\
        <div class=center_channel>\
            <div style='position:relative;'>\
                <div style='position:absolute; display:inline-block; left:400px; top:100px;'>\
                    <div id=offbtn class=bigbtn>OFF</div>\
                    <div id=onbtn class=bigbtn>SLOW</div>\
                    <div id=onbtn class=bigbtn>MEDIUM</div>\
                    <div id=onbtn class=bigbtn>FAST</div>\
                </div>\
            </div>\
            <img height=600 src=http://www.canopy.link/shutterstock_82034455_fan.jpg></img>\
        </div>
    ");*/

    $me = $("<div style'width:100%;'>");

    topbarNode = new CanoTopbarNode(canopy, dispatcher).appendTo($me);
    $me.append($content)
}

