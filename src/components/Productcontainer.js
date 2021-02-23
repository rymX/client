import axios from "axios";
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Modal, Button, Form } from "antd";
import {
  Upload,
  DatePicker,
  Switch,
  Input,
  InputNumber,
  Select,
  TextArea,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
class Productcontent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isModalVisible0: false,
      file : {} ,
    };
  }
   normFile = (e) => {
    this.setState({ file: e.file });
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  formRef = React.createRef();
  showModal = () => {
    this.setState({ isModalVisible: true });
  };
  showModal0 = () => {
    this.setState({ isModalVisible0: true });
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleCancel0 = () => {
    this.setState({ isModalVisible0: false });
    this.formRef.current.resetFields();
  };
  handleOk = () => {
    const id = this.props.list["_id"];
    axios.delete(`http://localhost:4000/product/id/${id}`)
      .then((response) => {
        this.props.forceReloder();
      })
      .catch((error) => {
        console.log({ error });
      });
      this.setState({ isModalVisible: false });
  };
  onFinish = (values) => {

   const productid = this.props.list["_id"] ;
   const owner = this.props.list["owner"];
      const fd = new FormData();
      fd.append("productimg", this.state.file.originFileObj);
      fd.append("productid",productid);
      fd.append("productname", values.productname);
      fd.append("productprice", values.price);
      fd.append("currency", values.currency);
      fd.append("description", values.description);
      fd.append("wishlistname", values.wishlistname);
      fd.append("status", values.Status);
      fd.append("owner", owner);

      axios.patch("http://localhost:4000/product/", fd)
      .then((response) => {
        this.props.forceReloder2();
        this.setState({ isModalVisible0: false });
      })
      .catch((error) => {
        console.log({ error });
        this.setState({ isModalVisible0: false });
      });
        
        this.setState({ isModalVisible0: false });
      };

  render() {
    return (
      <div className="col-lg-12">
        <div className="row">
          <div className="col-md-8">
            <div className="card-body">
              <form>
                <div className="form-row">
                  <div
                    className="form-group col-md-6"
                    style={{ border: "1px solid #cccccc" }}
                  >
                    <img
                      name="image"
                      width="200px"
                      height="200px"
                      src={this.props.list["imageurl"]}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <div className="form-row">
                      <h5> {this.props.list["productname"]} </h5>
                    </div>
                    <div className="form-row">
                      <p> {this.props.list["description"]} </p>
                    </div>
                    <br />
                    <div class="form-group row">
                      <h6 class="col-sm-3">Price:</h6>
                      <div class="col-sm-3">
                        <p> {this.props.list["productprice"]} $ </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="state">Wishlist</label>
                  <select
                    name="state"
                    className="form-control col-md-4"
                    required
                  >
                    <option value selected>
                      {this.props.list["wishlistname"]}
                    </option>
                    <option value={1}> wishlist 1</option>
                    <option value={2}> wishlist 1</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="state">Status</label>
                  <select
                    name="state"
                    className="form-control col-md-4"
                    required
                  >
                    <option value selected>
                      {this.props.list["status"]}
                    </option>
                    <option value={1}> Bought </option>
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-2">
           
            <button style={{width :"81px"}} onClick={this.showModal0} type="primary" class="btn btn-primary">
              <i class="fas fa-edit"></i> Edit</button>

            <Modal
              title="Edit Product"
              visible={this.state.isModalVisible0}
              footer={null}
              onCancel={this.handleCancel0}
            >
              <Form
                {...layout}
                ref={this.formRef}
                name="control-ref"
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="upload"
                  label="image"
                  valuePropName="fileList"
                  getValueFromEvent={this.normFile}
                  required
                >
                  <Upload name="logo" 
                  action="/upload.do" 
                  listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label=" Name"
                  name="productname"
                  required
                  tooltip="This is a required field"
                  
                >
                  <Input placeholder={this.props.list["productname"]} />
                </Form.Item>
                <Form.Item 
                label="Price "
                name="price"
                required>
                  
                    <Input 
                    placeholder={this.props.list["productprice"]} />
                  
                </Form.Item>
                <Form.Item
                  name="currency"
                  label="currency"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder={this.props.list["currency"]} >
                    <Option value="TND">TND</Option>
                    <Option value="Euro">Euro</Option>
                    <Option value="Dollar">Dollar</Option>
                  </Select>
                </Form.Item>
                <Form.Item 
                name={["description"]}
                label="Description">
                  <Input.TextArea placeholder={this.props.list["description"]} />
                </Form.Item>
                <Form.Item
                  name="wishlist"
                  label="wishlist"
                >
                  <Select placeholder={this.props.list["wishlistname"]}>

                      {
                          this.props.wishlists.map((element)=>{
                              return(
                                <Option value={element["wishlistname"]}> {element["wishlistname"]} </Option>
                              )
                          })
                      }
            



                  </Select>
                </Form.Item>
                <Form.Item
                  name="Status"
                  label="Status"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder={this.props.list["status"]}>
                    <Option value="To buy">To buy</Option>
                    <Option value="Bought">Bought</Option>
                  </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={this.handleCancel0}>
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            
            <button style={{border : "none" , width : "81px"}} onClick={this.showModal} class="btn btn-danger"><i class="fas fa-trash-alt"></i>Delete</button>

            <Modal
              title="Are you sure to delete this product"
              visible={this.state.isModalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            ></Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Productcontent;
