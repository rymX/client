import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';


export default class Test extends Component {
  constructor(props){
    super(props);
    this.state  = {
        visible: false
    };
}
     showModal = () => {
        this.setState({visible : true})
      };
    
       handleOk = () => {
        this.setState({visible : false})
      };
    
       handleCancel = () => {
        this.setState({visible : false})
      };
  
  render() {
    return (
      <div>
<Button type="primary" onClick={this.showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" 
      visible={this.state.visible}
       onOk={this.handleOk} 
       onCancel={this.handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

      </div>
       
    );
  }
}
