import React, { Component } from "react";
import axios from "axios";
import WishlistContent from "./WishlistContainer";
import Productcontent from "./Productcontainer";
import "antd/dist/antd.css";
import { Modal, Button, Form } from "antd";
import { Upload, Input, InputNumber, Select, TextArea } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import _ from "lodash";
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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualUserid: "",
      actualwishlist: new Object(),
      actualproduct: {},
      wishlists: [],
      products: [],
      isModalVisible: false,
      isModalVisible0: false,
      file: {},
    };
    this.forceReloder = this.forceReloder.bind(this);
  }
  forceReloder=()=>{
    this.forceUpdate();
  }
  formRef = React.createRef();
  normFile = (e) => {
    this.setState({ file: e.file });
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  formRef = React.createRef();
  getActualuserid = (cookies) => {
    return cookies.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === "newuser" ? decodeURIComponent(parts[1]) : r;
    }, "");
  };
  getWishlists = (id) => {
    axios
      .get(`http://localhost:4000/wishlist/user/${id}`)
      .then((response) => {
        this.setState({ wishlists: response.data });
        this.setState({ actualwishlist: response.data[0] });
      })
      .catch((error) => {
        console.log({ " error": error });
      });
  };
  getProducts = (userid) => {
    axios
      .get(`http://localhost:4000/product/userid/${userid}`)
      .then((response) => {
        this.setState({ products: response.data });
        this.setState({ actualproduct: response.data[0] });
      })
      .catch((error) => {
        console.log({ " error": error });
      });
  };
  setwishlist = (name) => {
    axios
      .post("http://localhost:4000/wishlist/", {
        wishlistname: name,
        owner: this.state.actualUserid,
      })
      .then((response) => {
        this.getWishlists(this.state.actualUserid);
      })
      .catch((error) => {
        console.log({ error });
        if (error.response.data.message === "name unvailble") {
          window.alert("A wishlist with this name already exists");
        }
      });
  };
  componentDidMount() {
    const id = this.getActualuserid(document.cookie);
    this.setState({ actualUserid: id });
    this.getWishlists(id);
    this.getProducts(id);
  }
  showModal = () => {
    this.setState({ isModalVisible: true });
  };
  showModal0 = () => {
    this.setState({ isModalVisible0: true });
  };

  onFinish = (values) => {
    this.setwishlist(values.wishlistname);
    this.setState({ isModalVisible: false });
    this.formRef.current.resetFields();
  };
  onFinish0 = (values) => {
    const fd = new FormData();
    fd.append("productimg", this.state.file.originFileObj);
    fd.append("productname", values.productname);
    fd.append("productprice", values.price);
    fd.append("currency", values.currency);
    fd.append("description", values.description);
    fd.append("wishlistid", values.wishlist);
    fd.append("status", values.Status);
    fd.append("owner", this.state.actualUserid);

    axios
      .post("http://localhost:4000/product/", fd)
      .then((response) => {
        console.log(response);
        this.getProducts(this.state.actualUserid);
      })
      .catch((error) => {
        console.log({ error });
        this.setState({ isModalVisible0: false });
      });
    this.setState({ isModalVisible0: false });
  };
  onCancel = () => {
    this.setState({ isModalVisible: false });
    this.formRef.current.resetFields();
  };
  handleCancel0 = () => {
    this.setState({ isModalVisible0: false });
    this.formRef.current.resetFields();
  };
  handleClick = (element) => {
    this.setState({ actualwishlist: element });
  };
  handleClickproduct = (element) => {
    this.setState({ actualproduct: element });
  };

  logout = () => {
    axios
      .get(`http://localhost:4000/user/logout`, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.log({ " error": error });
      });
  };
  render() {
    return (
      <div className="wrapper">
        <div id="body">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <ul
                    style={{ marginBottom: "5px !important" }}
                    className="nav nav-tabs"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="wichlist-tab"
                        data-toggle="tab"
                        href="#wishlists"
                        role="tab"
                        aria-controls="wishlists"
                        aria-selected="false"
                      >
                        {" "}
                        <i className="fas fa-heart" /> My Wishlists
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link "
                        id="products-tab"
                        data-toggle="tab"
                        href="#products"
                        role="tab"
                        aria-controls="products"
                        aria-selected="false"
                      >
                        {" "}
                        <i className="fas fa-icons" /> My Products
                      </a>
                    </li>
                    <li className="nav-item  ml-auto">
                      <button
                        className="btn btn-outline-dark mb-2"
                        onClick={this.logout}
                      >
                        {" "}
                        logout
                      </button>
                    </li>
                    <li className="nav-item  ">
                      <button> TND </button>
                    </li>
                  </ul>

                  <div className="tab-content" id="myTabContent">
                    {/* wishlists tab */}
                    <div
                      className="tab-pane fade active show"
                      id="wishlists"
                      role="tabpanel"
                    >
                      <div className="wrapper">
                        <nav id="sidebar">
                          <div
                            style={{
    
                              width: "245px",
                              height: "500px",
                              textAlign: "center",
                              overflow: "auto",
                            }}
                          >
                            <ul className="list-unstyled components text-secondary">
                              <li>
                                <button
                                  style={{ width: "120px" }}
                                  className="btn btn-primary mb-2"
                                  onClick={this.showModal}
                                  type="primary"
                                >
                                  Add Wishlist
                                </button>
                              </li>
                           

                          <Modal
                            title="Add wishlist "
                            visible={this.state.isModalVisible}
                            footer={null}
                            onCancel={this.onCancel}
                            focusTriggerAfterClose={false}
                          >
                            <Form
                              {...layout}
                              ref={this.formRef}
                              name="control-ref"
                              onFinish={this.onFinish}
                            >
                              <Form.Item
                                name="wishlistname"
                                label="wishlist name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your wishlist name!",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>

                              <Form.Item {...tailLayout}>
                                <Button
                                  style={{ marginRight: "8px" }}
                                  htmlType="button"
                                  onClick={this.onCancel}
                                >
                                  Cancel
                                </Button>
                                <Button type="primary" htmlType="submit">
                                  Done
                                </Button>
                              </Form.Item>
                            </Form>
                          </Modal>

                          {this.state.wishlists.length ? (
                            this.state.wishlists.map((element) => {
                              return (
                                
                                    <li>
                                      <button
                                        className="btn btn-outline-primary mb-2"
                                        style={{ width: "120px" }}
                                        onClick={() =>
                                          this.handleClick(element)
                                        }
                                      >
                                        {element["wishlistname"]}
                                      </button>
                                    </li>
                                
                              );
                            })
                          ) : (
                            <ul className="list-unstyled components text-secondary">
                              {" "}
                              <li style={{ padding: "50px 25px" }}>
                                <b> there are no Wishlists yet</b> <br />
                                Add your first wishlist{" "}
                                <i className="fas fa-heart" />{" "}
                              </li>
                            </ul>
                          )}
                           </ul>
                          </div>
                        </nav>
                        {_.isEmpty(this.state.actualwishlist) ? (
                          <h1> you have no wishlists yet </h1>
                        ) : (
                          <WishlistContent list={this.state.actualwishlist} forceReloder={ this.forceReloder}/>
                        )}
                      </div>
                    </div>

                    {/* products tab */}

                    <div
                      className="tab-pane fade"
                      id="products"
                      role="tabpanel"
                      aria-labelledby="products-tab"
                    >
                      <div className="wrapper">
                        <nav id="sidebar">
                          <div
                            style={{
                              
                              width: "245px",
                              height: "500px",
                              textAlign: "center",
                            }}
                            // className="sidebar-header list-unstyled components text-secondary"
                          >
                            <ul className="list-unstyled components text-secondary">
                            <li>
                              <button 
                              style={{ width: "120px" }}
                              className="btn btn-primary mb-2"type="primary" onClick={this.showModal0}>
                                Add Product
                              </button>
                              </li>
                             
                              <Modal
                                title="Add Product"
                                visible={this.state.isModalVisible0}
                                footer={null}
                                onCancel={this.handleCancel0}
                              >
                                <Form
                                  {...layout}
                                  ref={this.formRef}
                                  name="control-ref"
                                  onFinish={this.onFinish0}
                                >
                                  <Form.Item
                                    name="upload"
                                    label="image"
                                    valuePropName="fileList"
                                    getValueFromEvent={this.normFile}
                                    required
                                  >
                                    <Upload
                                      name="logo"
                                      action="/upload.do"
                                      listType="picture"
                                    >
                                      <Button icon={<UploadOutlined />}>
                                        Click to upload
                                      </Button>
                                    </Upload>
                                  </Form.Item>
                                  <Form.Item
                                    label="Name"
                                    name="productname"
                                    required
                                  >
                                    <Input placeholder="" />
                                  </Form.Item>
                                  <Form.Item
                                    label="Price"
                                    name="price"
                                    required
                                  >
                                    <Input placeholder="" />
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
                                    <Select placeholder="">
                                      <Option value="TND">TND</Option>
                                      <Option value="EURO">Euro</Option>
                                      <Option value="Dollar">Dollar</Option>
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    name={["description"]}
                                    label="Description"
                                  >
                                    <Input.TextArea placeholder="" />
                                  </Form.Item>
                                  <Form.Item
                                    name="wishlist"
                                    label="wishlist"
                                    hasFeedback
                            
                                  >
                                    <Select placeholder="">
                                      {this.state.wishlists.map((element) => {
                                        return (
                                          <Option value={element["_id"]}>
                                            {" "}
                                            {element["wishlistname"]}{" "}
                                          </Option>
                                        );
                                      })}
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
                                    <Select placeholder="">
                                      <Option value="to buy">To buy</Option>
                                      <Option value="bought">Bought</Option>
                                    </Select>
                                  </Form.Item>
                                  <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                      Submit
                                    </Button>
                                    <Button
                                      htmlType="button"
                                      onClick={this.handleCancel0}
                                    >
                                      Cancel
                                    </Button>
                                  </Form.Item>
                                </Form>
                              </Modal>
          

                          {this.state.products.length ? (
                            this.state.products.map((element) => {
                              return (
                                    <li>
                                      <button
                                      className="btn btn-outline-primary mb-2"
                                      style={{ width: "120px" }}
                                        onClick={() =>
                                          this.handleClickproduct(element)
                                        }
                                      >
                                        {element["productname"]}
                                      </button>
                                    </li>
                              );
                            })
                          ) : (
                            <ul className="list-unstyled components text-secondary">
                              {" "}
                              <li style={{ padding: "50px 25px" }}>
                                <b> there are no products yet</b> <br />
                                Add your first product{" "}
                                <i className="fas fa-heart" />{" "}
                              </li>
                            </ul>
                          )}
                           </ul>
                              </div>
                        </nav>
                        {/* {
                          
                        } */}
                        {_.isEmpty(this.state.actualproduct) ? (
                          <h1> you have no product yet </h1>
                        ) : (
                          <Productcontent
                            list={this.state.actualproduct}
                            wishlists={this.state.wishlists}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
