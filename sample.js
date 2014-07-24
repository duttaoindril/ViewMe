var viewer = new Autodesk.ViewerCanvas3D(thecanvas);
var docStruc;


var propertyPanel;

viewer.setBackgroundColor(0, 0, 0, 0, 0, 0); // set background to black

// Initialize docking panel system; it will store a global list of docking
// panels on the ViewerCanvas3D instance. I don't think this is the best
// place for that data, but I can't think of better spot. Revisit this
// when the GUI architecture abstraction is more clear...
DockingPanel.initialize(viewer);

//Warning turning progressive rendering off will have serious performance implications
viewer.setProgressiveRendering(true);

viewer.loadModel('data/tractor2/0.svf', null, function () {
    //create a document structure panel
    docStruc = new DocumentStructurePanel(viewer);
    var docStrucContainer = document.getElementById('docStrucContainer');
    docStrucContainer.appendChild(docStruc.container);
    //show the docStruc panel
    docStruc.container.style.display = "block";

    // create a property panel that the will listen to mouse events and display properties.
    propertyPanel = new PropertyPanel(viewer);

    var propContainer = document.getElementById('propContainer');
    propContainer.appendChild(propertyPanel.dockPanel.container);

});

viewer.addEventListener("error", function (event) {
    stderr("An error was raised: " + event.message);
})


//resize the viewer when window resize
window.addEventListener('resize', function (e) {

    var devicePixelRatio = window.devicePixelRatio || 1;

    var container = document.getElementById('content');
    var c = document.getElementById('thecanvas');

    c.height = container.clientHeight;
    c.width = container.clientWidth;

    viewer.resize(container.clientWidth, container.clientHeight);

}, false);

viewer.addEventListener('selection', function (event) {
    // hight the selected node
    docStruc.lastKnownSelectionList = event.dbIdArray;
    docStruc.setHighlightedNodeIds(event.dbIdArray);

    var selectionContainer = document.getElementById('selectionContainer');


    var dbIdArray = event.dbIdArray;

    var ul = document.createElement('ul');

    for (var i = 0; i < dbIdArray.length; i++) {
        var li = document.createElement('li');

        //click the dbId to toggleSelect 
        li.addEventListener('click', function (event) {
            var dbId = event.target.innerHTML;
            // just for test, seems not working fine
            viewer.toggleSelect(dbId);
        }, false);

        li.innerHTML = dbIdArray[i];
        ul.appendChild(li);
    }

    //clear first
    selectionContainer.innerHTML = '';
    selectionContainer.appendChild(ul);


});
