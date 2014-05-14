
function CanoDeviceSensorsDialogNode(params) {
    var self=this,
        canopy = params.canopyClient,
        optionNode,
        $me;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
    }

    this.refresh = function() {
        $me.html("<div style='font-weight:400; color: #000000; padding:4px; padding-left:16px; font-size:22px; background:#e0e6f0'>Monitor</div><div id=chart_div></div>");
        optionNode.appendTo($me);
        (new CanoPlotNode()).drawChart();
    }

    optionNode = new CanoOptionNode({
        options: ["cpu"]
    });
    $me = $("\
        <div class='cano-dialog2 cano-main-bottom-half-layout'>\
        </div>\
    ");
}
