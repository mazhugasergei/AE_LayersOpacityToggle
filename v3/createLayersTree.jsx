function createLayersTree(parentWindow, comp, level){
  // tab symbol shows how deep the leyer is nested
  var tabSymbol = " "
  
  // default values (if these arguments were not provided)
  level = typeof level !== 'undefined' ? level : 0
  comp = typeof comp !== 'undefined' ? comp : app.project.activeItem

  // a group with composition name and nested layers
  var compGroup = parentWindow.add("group")
  compGroup.orientation = "column"
  compGroup.alignment = ["left", "center"]

  // a group with composition name
  var compNameGroup = compGroup.add("group")
  compNameGroup.alignment = ["left", "center"]
  for(var i=0; i<level-1; i++) compNameGroup.add("statictext", undefined, tabSymbol)
  if(level){
    var expandButton = compNameGroup.add("statictext", undefined, ">")
    expandButton.onClick = function(){
      alert(1)
    }
    var compCheckbox = compNameGroup.add("checkbox")
    compCheckbox.text = comp.name
    checkboxes.push(compCheckbox) // global
  }
  else{
    var compName = compNameGroup.add("statictext", undefined, comp.name)
    compName.alignment = ["left", "center"]
  }

  // a group with nested layers
  var layers = comp.layers
  for(var i=1; i<=layers.length; i++){
    var layer = layers[i]
    checkboxesLayers.push(layer) // global
    if(layer instanceof AVLayer && layer.source instanceof CompItem)
      createLayersTree(compGroup, layer.source, level+1)
    else{
      var layerGroup = compGroup.add("group")
      // layerGroup.visible = false
      layerGroup.alignment = ["left", "center"]
      for(var j=0; j<level; j++) layerGroup.add("statictext", undefined, tabSymbol)
      var invisibleExpandButton = layerGroup.add("statictext", undefined, ">")
      invisibleExpandButton.visible = false
      var checkbox = layerGroup.add("checkbox")
      checkbox.text = layer.name
      checkboxes.push(checkbox) // global
    }
  }
}