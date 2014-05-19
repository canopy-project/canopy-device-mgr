/*
 *  CanoOptionNode -- Generic node for selecting single item from list.
 *
 *  Required Parameters:
 *
 *      items: <object>
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
        numItems,
        $items = [],
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
        for (i = 0; i < numItems; i++) {
            $items[i].off('click').on('click', function(idx) {
                return function() {
                    select(idx);
                }(i);
            }
        }
    }

    var select = function(idx) {
        alert("item " + idx + " selected");
    }

    $me = $("<div>")
        .addClass(params.outerClass);

    numItems = params.items.length;
    for (i = 0; i < numItems; i++) {
        var $item = $("<div>");
        $item.html(params.items[i].html);
        // TODO: handle node
        $item.addClass(params.normalClass);
        $items.push($item);
        $me.append($item);
    }
}
