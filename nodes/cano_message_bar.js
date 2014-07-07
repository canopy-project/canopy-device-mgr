
function CanoMessageBarNode(origParams) {
    var $me,
        $msg,
        self=this
    ;

    $.extend(this, new CanoNode());

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        $x.off('click').on('click', function() {
            self.hide();
        });
    }

    this.show = function() {
        $me.slideDown();
        return self;
    }

    this.hide = function() {
        $me.slideUp();
        return self;
    }

    this.setHTML = function(msg) {
        $msg.html(msg);
        $msg.append($x);
        return self;
    }

    $x = $("<div class=cano-message-bar-close-button>X</div>");
    $msg = $("<div class=center_channel></div>");
    $me = $("<div class=cano-message-bar style='display:none'></div>");
    $me.append($msg);
}
