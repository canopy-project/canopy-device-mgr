/*
 *  CanoOptionNode -- Generic node for selecting single item from list.
 *
 *  Required Parameters:
 *
 *      items: [<object>, ...]
 *          List of items.  See below for details.
 *
 *  Optional Parameters:
 *
 *      normalClass: <string>
 *          CSS classes to apply to unselected items.
 *
 *      selectedClass: <string>
 *          CSS classes to apply to selected item.
 *
 *      outerClass: <string>
 *          CSS classes to apply to the container div.
 *
 *      onSelect: <function>(<int>idx, <object>item)
 *          Callback that gets called when an item is selected.
 *
 *  Item Object Parameters:
 *
 *      html: <string|null>
 *      node: <object|null>
 *      value: <any type>
 *
 */
function CanoOptionNode(origParams) {
    var self=this,
        $me,
        i,
        items = [],
        params;

    $.extend(this, new CanoNode());

    params = $.extend({}, {
        normalClass: "",
        selectedClass: "",
        outerClass: "",
        onSelect: function() {},
        layout_css: {}
    }, origParams);

    this.get$ = function() {
        return $me;
    }

    this.onLive = function() {
        this.refresh();
        /* TODO: call node.onLive for each child node */
    }

    this.setItems = function(newItems) {
        items.length = 0;
        $me.html("");
        for (i = 0; i < newItems.length; i++) {
            var $item = $("<div>");
            $item.html(newItems[i].html);
            // TODO: handle node
            $item.addClass(params.normalClass);
            $me.append($item);

            items.push({
                $item: $item,
                html: newItems[i].html,
                node: newItems[i].node,
                value: newItems[i].value
            });
        }
        this.refresh();
    }

    this.select = function(idx, skipCallback) {
        for (i = 0; i < items.length; i++) {
            items[i].$item.toggleClass(params.normalClass, (i != idx))
            items[i].$item.toggleClass(params.selectedClass, (i == idx))
        }
        if (!skipCallback) {
            params.onSelect(idx, items[idx]);
        }
    }

    this.refresh = function() {
        for (i = 0; i < items.length; i++) {
            items[i].$item.off('click').on('click', 
                (function(idx) {
                    return function() {
                        self.select(idx, false);
                    }
                }(i))
            );
        }
    }

    $me = $("<div>")
        .addClass(params.outerClass);
    this.setItems(params.items);
}
