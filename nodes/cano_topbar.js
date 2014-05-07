
function CanoTopbarNode() {
    this.render = function($container)
    {
        $container.html("\
<div class=cano-topbar>\
    <div class=cano-topbar-account><img align=top src='http://c.dryicons.com/images/icon_sets/coquette_icons_set/png/32x32/user.png'><a href=..>Guest</a></div>\
    <div class=cano-logo>canopy</div>\
</div>\
");
    }
}
