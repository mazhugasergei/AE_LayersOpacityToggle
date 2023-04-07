var allLayers = []
var allLayersNames = []
var selectedLayersArr = []

function deleteItem(array, index){
  var res = array.slice(0, index)
  return res.concat(array.slice(index+1))
}

function listAllLayers(comp) {
  var layers = comp.layers
  for (var i = 1; i <= layers.length; i++) {
    var layer = layers[i]
    if (layer instanceof AVLayer && layer.source instanceof CompItem) listAllLayers(layer.source)
    allLayers.push(layer)
    allLayersNames.push(layer.name)
  }
}


var win1 = new Window("palette", "Layer List")
var win2 = new Window("palette", "Window")

var activeComp = app.project.activeItem
if (app.project.activeItem.selectedLayers.length){
  // getting all layers
  listAllLayers(activeComp)
  // group
  var flex = win1.add("group", undefined, "")
  // left group
  var left_group = flex.add("group", undefined, "")
  left_group.orientation = "column"
  left_group.add("statictext", undefined, "All layers")
  var allLayersNamesBox = left_group.add("listbox", [0, 0, 200, 300], allLayersNames)
  allLayersNamesBox.onChange = function() {
    selectedLayersArr.push(allLayers[allLayersNamesBox.selection.index])
    selectedLayersBox.add("item", allLayersNamesBox.selection)
  }
  // right group
  var right_group = flex.add("group", undefined, "")
  right_group.orientation = "column"
  right_group.add("statictext", undefined, "Selected layers names")
  var selectedLayersBox = right_group.add("listbox", [0, 0, 200, 300], null)
  selectedLayersBox.onChange = function() {
    selectedLayersArr = deleteItem(selectedLayersArr, selectedLayersBox.selection.index)
    selectedLayersBox.remove(selectedLayersBox.selection.index)
  }
  
  // adding button
  var submit = win1.add("button", undefined, "Submit")
  submit.onClick = function() {
    var appliedEffects = activeComp.selectedLayers[0].property("ADBE Effect Parade")
    // if there are some effects, let user choose between selecting an existing or creating a new one
    if (appliedEffects.numProperties) {
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
        for (var i = 0; i < selectedLayersArr.length; i++) {
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
      win1.close()
      win2.show()
    }
    // if no effects found, create a new effect
    else {
      var effect = activeComp.selectedLayers[0].Effects.addProperty("ADBE Checkbox Control")
      effect.name = "HideShow_1"
      for (var i = 0; i < selectedLayersArr.length; i++) {
        selectedLayersArr[i].property("Opacity").expression = "comp('"+activeComp.name+"').layer('"+activeComp.selectedLayers[0].name+"').effect('"+effect.name+"')('Checkbox')*100"
      }
      win1.close()
    }
  }
  win1.show()
}
else alert("Select control layer.")