#include "listAllLayers.jsx"

if(app.project.activeItem.selectedLayers.length == 1){
  // get layers
  var win1 = new Window("palette", "")
  var win2 = new Window("palette", "")
  var activeComp = app.project.activeItem
  var checkboxes = []
  var checkboxesLayers = []
  listAllLayers(activeComp, 0, "-")
  
  // OK button
  var allLayers = []
  var okBtn = win1.add("button", undefined, "OK")
  okBtn.onClick = function(){
    var appliedEffects = activeComp.selectedLayers[0].property("ADBE Effect Parade")
    // get selected layers
    var selectedLayersArr = []
    for(var i=0; i<checkboxesLayers.length; i++)
      if(checkboxes[i].value) selectedLayersArr.push(checkboxesLayers[i])
    // if there are some effects, let user choose between selecting an existing or creating a new one
    if (appliedEffects.numProperties){
      var appliedEffectsNames = []
      for(var i=1; i<=appliedEffects.numProperties; i++){
        var effect = appliedEffects.property(i);
        appliedEffectsNames.push(effect.name)
      }
      win2.add("statictext", undefined, "Контроллеры найдены. Выбери из имеющихся или нажми \"Создать новый\".")
      var win2_Group = win2.add("group", undefined, "")
      var win2_Dropdown = win2_Group.add("dropdownlist", undefined, appliedEffectsNames)
      // if chose an existing effect
      var win2_ChooseBtn = win2_Group.add("button", undefined, "Выбрать")
      win2_ChooseBtn.onClick = function(){
        for(var i=0; i<selectedLayersArr.length; i++){
          selectedLayersArr[i].property("Opacity").expression = "comp('"+activeComp.name+"').layer('"+activeComp.selectedLayers[0].name+"').effect('"+appliedEffectsNames[win2_Dropdown.selection.index]+"')('Checkbox')*100"
        }
        win1.close()
        win2.close()
      }
      // if chose to create a new effect
      var win2_NewBtn = win2_Group.add("button", undefined, "Новый")
      win2_NewBtn.onClick = function(){
        var effect = activeComp.selectedLayers[0].Effects.addProperty("ADBE Checkbox Control")
        effect.name = "HideShow_" + (appliedEffects.numProperties)
        for(var i=0; i<selectedLayersArr.length; i++) selectedLayersArr[i].property("Opacity").expression = "comp('"+activeComp.name+"').layer('"+activeComp.selectedLayers[0].name+"').effect('"+effect.name+"')('Checkbox')*100"
        win1.close()
        win2.close()
      }
      win2.show()
    }
    // if no effects found, create a new effect
    else{
      for(var i=0; i<selectedLayersArr.length; i++){
        var selectedLayer = selectedLayersArr[i]
        var effect = activeComp.selectedLayers[0].Effects.addProperty("ADBE Checkbox Control")
        effect.name = "HideShow_1"
        effect.name = "HideShow_" + (appliedEffects.numProperties)
        selectedLayer.property("Opacity").expression = "comp('"+activeComp.name+"').layer('"+activeComp.selectedLayers[0].name+"').effect('"+effect.name+"')('Checkbox')*100"
      }
      win1.close()
    }
  }

  win1.show()
}
else if(app.project.activeItem.selectedLayers.length){
  alert("Ты долбаёб? Только один слой контроля выдели!")
}
else{
  alert("Ты долбаёб? Слой выдели!")
}