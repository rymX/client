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
const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

class Productcontent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isModalVisible0: false,
    };
  }
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
    axios
      .delete(`http://localhost:4000/product/id/${id}`)
      .then((response) => {
        console.log("done");
        this.setState({ isModalVisible: false });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  onFinish = (values) => {
      console.log(values)
    // const id =this.props.list["_id"]
    //     axios.patch(`http://localhost:4000/wishlist` ,{id : id , wishlistname :values.wishlistname})
    //       .then((response) => {
    //         this.setState({ key: Math.random() });
    //       })
    //       .catch((error) => {
    //         console.log({ error });
    //       });
        //this.setwishlist(values.wishlistname);
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
            <Button type="primary" onClick={this.showModal0}>
              <i className="fas fa-edit" /> Edit
            </Button>
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
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="longgggggggggggggggggg"
                >
                  <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label=" Name"
                  required
                  tooltip="This is a required field"
                  
                >
                  <Input placeholder={this.props.list["productname"]} />
                </Form.Item>
                <Form.Item label="Price ">
                  <Form.Item name="input-number" noStyle>
                    <InputNumber placeholder={this.props.list["productprice"]} />
                  </Form.Item>
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
                    <Option value="china">TND</Option>
                    <Option value="usa">Euro</Option>
                    <Option value="usa">Dollar</Option>
                  </Select>
                </Form.Item>
                <Form.Item name={["user", "introduction"]} label="Description">
                  <Input.TextArea placeholder={this.props.list["description"]} />
                </Form.Item>
                <Form.Item
                  name="wishlist"
                  label="wishlist"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                    },
                  ]}
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
                    <Option value="china">To buy</Option>
                    <Option value="usa">Bought</Option>
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

            <Button type="primary" onClick={this.showModal}>
              <i className="fas fa-trash-alt" /> Delete
            </Button>
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
