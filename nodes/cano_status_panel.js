
function CanoStatusPanelNode() {
    this.render = function($container)
    {
        $container.html("\
<div>Status: Ready</div>\
<div>Darkness\
    <select>\
        <option>1 - Lightest</option>\
        <option>2</option>\
        <option>3</option>\
        <option>4</option>\
        <option>5</option>\
        <option>6</option>\
        <option>7</option>\
        <option>8 - Darkest</option>\
    </select>\
</div>\
<div>Bagel Mode\
    <input type=checkbox>\
</div>\
");
    }
}
