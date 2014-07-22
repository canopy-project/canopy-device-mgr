/*
 */
function CanoHoverPlotNode(params) {
    var self=this,
        $me,
        plotNode
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
    }

    this.close = function() {
        $me.hide();
    }

    this.setTimeseriesData = function(data) {
        plotNode.setTimeseriesData(data);
    }

    plotNode = new CanoPlotNode({
        title: "hi",
        vAxisFormat: "#"
    });

    $me = CanopyUtil_Compose(["\
            <!--div class=cano-hover_plot-poker-outer>\
                <div class=cano-hover_plot-poker-inner>\
                    &#x25b2;\
                </div>\
            </div-->\
            <div class=cano-hover_plot-outer>\
                <div class=cano-hover_plot-inner>\
                    ", plotNode, "\
                </div>\
            </div>\
    "]);
}

