VectorEditor.prototype.unselect = function(shape){

  if(!shape){
    while(this.selected[0]){
      this.unselect(this.selected[0])
    }
    if(shape !== false){
      this.fire("unselected")
    }
  }else{
    this.fire("unselect", shape);
    this.array_remove(shape, this.selected);
    for(var i = 0; i < this.trackers.length; i++){
      if(this.trackers[i].shape == shape){
        this.removeTracker(this.trackers[i]);
      }
    }
  }
}

VectorEditor.prototype.selectAdd = function(shape){
  if(this.is_selected(shape) == false){
    if(this.fire("selectadd",shape)===false)return;
    
    this.selected.push(shape)
    this.showGroupTracker(shape);
  }
}

VectorEditor.prototype.selectAll = function(){
  this.unselect()
  for(var i = 0; i < this.shapes.length; i++){
    this.selectAdd(this.shapes[i])
    
  }
}

VectorEditor.prototype.selectToggle = function(shape){
  if(this.is_selected(shape) == false){
    this.selectAdd(shape)
  }else{
    this.unselect(shape)
  }
}

VectorEditor.prototype.select = function(shape){
  if(this.fire("select",shape)===false)return;
  this.unselect(false)
  this.selected = [shape]
  this.showTracker(shape)
}

VectorEditor.prototype.removeTracker = function(tracker){
  if(!tracker){
    while(this.trackers.length > 0){
      this.removeTracker(this.trackers[0]);
    }
  }else{
    tracker.remove();
    
    for(var i = 0; i < this.trackers.length; i++){
      if(this.trackers[i] == tracker){
        this.trackers.splice(i, 1)
      }
    }
  }
}

VectorEditor.prototype.updateTracker = function(tracker){
  if(!tracker){
    for(var i = 0; i < this.trackers.length; i++){
      this.updateTracker(this.trackers[i])
    }
  }else{
    var shape = tracker.shape;
    var box = shape.getBBox();
    //this is somewhat hackish, if someone finds a better way to do it...
    if(shape.type == "path" && this.action.substr(0,4) == "path"){
      var pathsplit = Raphael.parsePathString(shape.attr("path"))
      if(pathsplit.length == 2){
        tracker[0].attr({cx: box.x + box.width/2, cy: box.y + box.height/2})
        tracker[1].attr({x: pathsplit[0][1]-2, y: pathsplit[0][2]-2})
        tracker[2].attr({x: pathsplit[1][1]-2, y: pathsplit[1][2]-2})
      }
      return;
    }

    tracker.translate(box.x - tracker.lastx, box.y - tracker.lasty)

    if(shape._ && shape._.rt){
      tracker.rotate(shape._.rt.deg, (box.x + box.width/2), (box.y + box.height/2))
    }
    
    tracker.lastx = box.x
    tracker.lasty = box.y
  }
}

VectorEditor.prototype.hideTooltip = function(){
  this.tt.hide();
}

VectorEditor.prototype.tooltip = function(t,bbox){
  if(!this.tt){
    var set = this.draw.set();
    set.push(this.draw.text(0,0,"x"))
    this.tt = set;
  }
  var set = this.tt;
  
  set.show();
  set.toFront();
  var text = set[0];
  text.attr("text", t);
  text.attr("x", bbox.x);
  text.attr("y", bbox.y);
  var txb = text.getBBox() //i wish i knew a better way to align it like that
  text.attr("x", bbox.x + txb.width/2 + 8)
  txb = text.getBBox()
  
  return set;
}

VectorEditor.prototype.markTracker = function(shape){
  shape.node.is_tracker = true;
  return shape;
}

VectorEditor.prototype.newTracker = function(shape){
  for(var i = 0; i < this.trackers.length; i++){
    if(this.trackers[i].shape == shape){
      this.removeTracker(this.trackers[i]);
    }
  }
  this.showTracker(shape)
}

VectorEditor.prototype.showTracker = function(shape){
  var rot_offset = -14;
  var box = shape.getBBox();
  var tracker = this.draw.set();
  tracker.shape = shape;
  
  //define the origin to transform to
  tracker.lastx = 0 //if zero then easier
  tracker.lasty = 0 //if zero then easier

  this.updateTracker(tracker)
}
