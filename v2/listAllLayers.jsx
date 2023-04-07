function listAllLayers(comp, level, tabSymbol){
  // comp name & comp layers group
  var compGroup = win1.add("group")
  compGroup.orientation = "column"
  compGroup.alignment = ["left", "center"]
  var layers = comp.layers
  // comp name group
  var compNameGroup = compGroup.add("group")
  compNameGroup.alignment = ["left", "center"]
  for(var j = 0; j < level; j++) compNameGroup.add("statictext", undefined, tabSymbol)
  var compName = compNameGroup.add("statictext", undefined, comp.name)
  compName.alignment = ["left", "center"]
  // comp layers group
  for(var i = 1; i <= layers.length; i++){
    var layer = layers[i]
    checkboxesLayers.push(layer)
    var layerGroup = compGroup.add("group")
    layerGroup.alignment = ["left", "center"]
    for(var j = 0; j < level; j++) layerGroup.add("statictext", undefined, tabSymbol)
    var checkbox = layerGroup.add("checkbox")
    checkbox.text = layer.name
    checkboxes.push(checkbox)
    if(layer instanceof AVLayer && layer.source instanceof CompItem){
      listAllLayers(layer.source, level+1, tabSymbol)
    }
  }
}