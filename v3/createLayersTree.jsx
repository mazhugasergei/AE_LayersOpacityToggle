function createLayersTree(parentWindow, comp, level){
  // tab symbol shows how deep the leyer is nested
  var tabSymbol = "-"
  
  // default values (if these arguments were not provided)
  level = typeof level !== 'undefined' ? level : 0
  comp = typeof comp !== 'undefined' ? comp : app.project.activeItem

  // a group with composition name and nested layers
  var compGroup = parentWindow.add("group")
  compGroup.orientation = "column"
  compGroup.alignment = ["left", "center"]

  // a group with tab symbols and composition name
  var compNameGroup = compGroup.add("group")
  compNameGroup.alignment = ["left", "center"]
  for(var i=0; i<level; i++) compNameGroup.add("statictext", undefined, tabSymbol)
  var compName = compNameGroup.add("statictext", undefined, comp.name)
  compName.alignment = ["left", "center"]

  // a group with nested layers
  var layers = comp.layers
  for(var i=1; i<=layers.length; i++){
    var layer = layers[i]
    checkboxesLayers.push(layer) // global
    var layerGroup = compGroup.add("group")
    layerGroup.alignment = ["left", "center"]
    for(var j=0; j<level; j++) layerGroup.add("statictext", undefined, tabSymbol)
    var checkbox = layerGroup.add("checkbox")
    checkbox.text = layer.name
    checkboxes.push(checkbox) // global
    if(layer instanceof AVLayer && layer.source instanceof CompItem)
      createLayersTree(parentWindow, layer.source, level+1)
  }
}