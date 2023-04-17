function createLayersTree(parentWindow, comp, level){
  // tab symbol shows how deep the leyer is nested
  var tabSymbol = " "
  var expandSymbol = "▶"
  var expandedSymbol = "▼"
  
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
  for(var i=0; i<level; i++) compNameGroup.add("statictext", undefined, tabSymbol)
  if(level){
    var expandButton = compNameGroup.add("button", undefined, expandSymbol)
    expandButton.size = [20, 20]
    expandButton.onClick = function(){
      try{
        layersGroup.visible = !layersGroup.visible
        this.text = layersGroup.visible ? expandedSymbol : expandSymbol
        // layersGroup.size = layersGroup.visible ? undefined : [0, 0]
      }
      catch(e){
        alert(e)
      }
    }
    var compCheckbox = compNameGroup.add("checkbox")
    compCheckbox.text = comp.name
    checkboxes.push(compCheckbox) // global
  }

  // a group with nested layers
  var layersGroup = compGroup.add("group")
  layersGroup.orientation = "column"
  layersGroup.alignment = ["left", "center"]
  if(level){
    // layersGroup.size = [0, 0]
    layersGroup.visible = false
  }
  var layers = comp.layers
  for(var i=1; i<=layers.length; i++){
    var layer = layers[i]
    checkboxesLayers.push(layer) // global
    if(layer instanceof AVLayer && layer.source instanceof CompItem)
      createLayersTree(layersGroup, layer.source, level+1)
    else{
      var layerGroup = layersGroup.add("group")
      layerGroup.alignment = ["left", "center"]
      for(var j=0; j<level+1; j++) layerGroup.add("statictext", undefined, tabSymbol)
      var invisibleExpandButton = layerGroup.add("button", undefined, expandSymbol)
      invisibleExpandButton.size = [20, 20]
      invisibleExpandButton.visible = false
      var checkbox = layerGroup.add("checkbox")
      checkbox.text = layer.name
      checkboxes.push(checkbox) // global
    }
  }
}