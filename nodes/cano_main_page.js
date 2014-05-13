function CanoMainPageNode(canopy, dispatcher) {
    var $me,
        topbarNode;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        topbarNode.render($("#topbar"));
    }

    topbarNode = new CanoTopbarNode(canopy, dispatcher);

    $me = $("<div>\
        <div id=topbar></div>\
        main\
    </div>");

}
