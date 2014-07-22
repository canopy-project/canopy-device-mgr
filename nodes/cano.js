function CanoNode() {
    var $me;

    this.render = function($container) {
        $container.html(this.get$());
        this.onLive();
        return this;
    }

    this.appendTo = function($container) {
        $container.append(this.get$());
        this.onLive();
        return this;
    }

    this.prependTo = function($container) {
        $container.append(this.get$());
        this.onLive();
        return this;
    }
}
