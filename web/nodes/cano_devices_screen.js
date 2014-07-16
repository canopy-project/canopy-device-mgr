function CanoDevicesScreenNode(params) {
    var self=this,
        $me,
        canopy = params.canopyClient,
        dispatcher = params.dispatcher,
        topbarNode;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    $left = $("<div class=cano-main_page-left-and-middle-section></div>");
    $right = $("<div class=cano-main_page-right-section></div>");

    $left.append("\
        <div style='width:100%; padding:6px; padding-bottom:0px; border-bottom:2px solid #d0d0d0;'>\
            <div style='display:inline-block; width:256px;'>\
                <div style='text-align:center; border-bottom:2px solid #a00000; padding-bottom:4px; display: inline-block; line-height:0.75'>\
                    <span class=big>8</span>\
                    <span class=s><br>showing all devices</span>\
                </div>\
            </div>\
            <div style='text-align:center; display: inline-block; line-height:0.75'>\
                <span class=big>8</span>\
                <span class=s><br>devices</span>\
            </div>\
            <div style='margin-left:30px; text-align:center; display: inline-block; line-height:0.75'>\
                <span class=big>7</span>\
                <span class=s><br>online</span>\
            </div>\
            <div style='margin-left:20px; text-align:center; display: inline-block; line-height:0.75'>\
                <span class=big>1</span>\
                <span class=s><br>disconnected</span>\
            </div>\
        </div>\
    ");

    $me = $("<div class=center_channel>");
    $me.append($left).append($right);
}
