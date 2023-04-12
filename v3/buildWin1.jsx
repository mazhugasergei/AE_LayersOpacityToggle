#include "createLayersTree.jsx"
#include "buildWin2.jsx"
#include "buildWin3.jsx"



function buildWin1(win1, win2, win3){
  createLayersTree(win1)

  // OK btn
  var okBtn = win1.add("button", undefined, "OK")
  okBtn.onClick = function(){
    // get selected layers
    for(var i=0; i<checkboxesLayers.length; i++) // global
      if(checkboxes[i].value) selectedLayersArr.push(checkboxesLayers[i])

    // if selected some layers
    if(selectedLayersArr.length){
      // get all effects applied to control layer
      var appliedEffects = app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade")
  
      // there are effects
      if(appliedEffects.numProperties) buildWin2(win2, win3)
  
      // no effects
      else{
        // 1 layer selected
        if(selectedLayersArr.length == 1){
          var selectedLayer = selectedLayersArr[0]
          var effect = app.project.activeItem.selectedLayers[0].Effects.addProperty("ADBE Checkbox Control")
          effect.name = "HideShow_1"
          selectedLayer.property("Opacity").expression = "comp('"+app.project.activeItem.name+"').layer('"+app.project.activeItem.selectedLayers[0].name+"').effect('"+effect.name+"')('Checkbox')*100"
          win1.close()
          win2.close()
        }
        // many layers selected
        else buildWin3(win3)
      }
    }
    // no layers selected
    else alert("Ты долбаёб? Слои выбери!")
  }

  win1.show()
}