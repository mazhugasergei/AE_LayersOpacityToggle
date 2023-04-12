function buildWin3(win3){
  // get all effects applied to control layer
  var appliedEffects = app.project.activeItem.selectedLayers[0].property("ADBE Effect Parade")

  win3.add("statictext", undefined, "Все слои к одному контроллеру или каждый слой к разному?")
  var win3_Group = win3.add("group", undefined, "")

  // all to one
  var win3_AllToOne = win3_Group.add("button", undefined, "Все к одному")
  win3_AllToOne.onClick = function(){
    var effect = app.project.activeItem.selectedLayers[0].Effects.addProperty("ADBE Checkbox Control")
    effect.name = "HideShow_" + (appliedEffects.numProperties)
    for(var i=0; i<selectedLayersArr.length; i++) // global
      selectedLayersArr[i].property("Opacity").expression = "comp('"+app.project.activeItem.name+"').layer('"+app.project.activeItem.selectedLayers[0].name+"').effect('"+effect.name+"')('Checkbox')*100"
    win1.close()
    win2.close()
    win3.close()
  }

  // one to one
  var win3_OneToOne = win3_Group.add("button", undefined, "Один к одному")
  win3_OneToOne.onClick = function(){
    for(var i=0; i<selectedLayersArr.length; i++){
      var effect = app.project.activeItem.selectedLayers[0].Effects.addProperty("ADBE Checkbox Control")
      effect.name = "HideShow_" + (appliedEffects.numProperties)
      selectedLayersArr[i].property("Opacity").expression = "comp('"+app.project.activeItem.name+"').layer('"+app.project.activeItem.selectedLayers[0].name+"').effect('"+effect.name+"')('Checkbox')*100"
    }
    win1.close()
    win2.close()
    win3.close()
  }

  win3.show()
}