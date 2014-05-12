function CanoNode() {
    var $me,
        topbarNode;

    this.render = function($container) {
        $container.html(this.get$());
        this.onLive();
    }

    this.appendTo = function($container) {
        $container.append(this.get$());
        this.onLive();
    }

    this.prependTo = function($container) {
        $container.append(this.get$());
        this.onLive();
    }
}
