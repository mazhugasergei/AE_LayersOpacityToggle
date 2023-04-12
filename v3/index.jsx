#include "buildWin1.jsx"



var checkboxes = []
var checkboxesLayers = []
var selectedLayersArr = []
var win1 = new Window("palette", "")
var win2 = new Window("palette", "")
var win3 = new Window("palette", "")



// run program if 1 control layer is selected
if(app.project.activeItem.selectedLayers.length == 1) buildWin1(win1, win2, win3)
// if more layers selected
else if(app.project.activeItem.selectedLayers.length) alert("Ты долбаёб? Только один слой контроля выдели!")
// if no layers selected
else alert("Ты долбаёб? Слой выдели!")