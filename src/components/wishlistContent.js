import React, { Component } from "react";

export default class WishlistContent extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            width : "50%",
        }
     }
  // Get the elements with class="column"
 
// Declare a loop variable

// List View
 listView =() => {
  this.setState({width : "100%"})
}

// Grid View
 gridView=()=> {
    this.setState({width : "50%"})
}

  render() {
    return (
      <div>
        <h2>List View or Grid View</h2>

        <p>Click on a button to choose list view or grid view.</p>
        <div id="btnContainer">
  <button class="btn" onClick={this.listView} ><i class="fa fa-bars"></i> List</button> 
  <button class="btn active" onClick={this.gridView}><i class="fa fa-th-large"></i> Grid</button>
</div> 
<div class="row">
  <div class="column" style={
      {
        cssFloat: "left",
        width: this.state.width,
        padding: "10px",
        backgroundColor: "#aaa"
      }
  } >
    <h2>Column 1</h2>
    <p>Some text..</p>
  </div>
  <div class="column"  style={
      {
        cssFloat: "left",
        width: this.state.width,
        padding: "10px",
        backgroundColor: "#aaa"
      }
  } >
    <h2>Column 2</h2>
    <p>Some text..</p>
  </div>
</div>
<div class="row">
  <div class="column"  style={
      {
        cssFloat: "left",
        width: this.state.width,
        padding: "10px",
        backgroundColor: "#aaa"
      }
  }   >
    <h2>Column 3</h2>
    <p>Some text..</p>
  </div>
  <div class="column"  style={
      {
        cssFloat: "left",
        width: this.state.width,
        padding: "10px",
        backgroundColor: "#aaa"
      }
  }  >
    <h2>Column 4</h2>
    <p>Some text..</p>
  </div>
</div>
      </div>
    );
  }
}
