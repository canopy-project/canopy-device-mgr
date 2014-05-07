
function CanoSidebarNode() {
    this.render = function($container)
    {
        $container.html("\
<div class=cano-sidebar>\
    <div><a class=cano-sidebar-item href='.'>Refridgerator</a></div>\
    <div><a class=cano-sidebar-item href='.'><span class=hvy>Toaster</span></a></div>\
    <div><a class=cano-sidebar-item href='.'>Dishwasher</a></div>\
    <div><a class=cano-sidebar-item href='.'>Coffee Machine</a></div>\
    <div><a class=cano-sidebar-item href='.'>CO2 Detector</div>\
</div>\
");
    }
}
