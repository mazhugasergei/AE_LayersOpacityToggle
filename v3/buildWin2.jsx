#include "buildWin3.jsx"



function buildWin2(win2, win3){
  // get all effects applied to control layer
  var appliedEffects = app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade")

  // get applied effects names
  var appliedEffectsNames = []
  for(var i=1; i<=appliedEffects.numProperties; i++){
    var effect = appliedEffects.property(i);
    appliedEffectsNames.push(effect.name)
  }

  win2.add("statictext", undefined, "Контроллеры найдены. Выбери из имеющихся или создай новый.")
  var win2_Group = win2.add("group", undefined, "")
  var win2_Dropdown = win2_Group.add("dropdownlist", undefined, appliedEffectsNames)

  // chose an existing effect
  var win2_ChooseBtn = win2_Group.add("button", undefined, "Выбрать")
  win2_ChooseBtn.onClick = function(){
    for(var i=0; i<selectedLayersArr.length; i++) // global
      selectedLayersArr[i].property("Opacity").expression = "comp('"+app.project.activeItem.name+"').layer('"+app.project.activeItem.selectedLayers[0].name+"').effect('"+appliedEffectsNames[win2_Dropdown.selection.index]+"')('Checkbox')*100"
    win1.close()
    win2.close()
  }

  // create a new effect
  var win2_NewEffect = win2_Group.add("button", undefined, "Новый")
  win2_NewEffect.onClick = function(){
    // 1 layer selected
    if(selectedLayersArr.length == 1){
      var effect = app.project.activeItem.selectedLayers[0].Effects.addProperty("ADBE Checkbox Control")
      effect.name = "HideShow_" + (appliedEffects.numProperties)
      selectedLayersArr[0].property("Opacity").expression = "comp('"+app.project.activeItem.name+"').layer('"+app.project.activeItem.selectedLayers[0].name+"').effect('"+effect.name+"')('Checkbox')*100"
      win1.close()
      win2.close()
    }
    // many layers selected
    else buildWin3(win3)
  }
  
  win2.show()
}