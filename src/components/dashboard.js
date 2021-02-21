import React, { Component } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "antd/dist/antd.css";
import { Modal, Button, Form, Input } from "antd";

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
      actualwishlist: {},
      wishlists: [],
      profucts: {},
      isModalVisible: false,
    };
  }
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
  setwishlist = (name) => {
    axios
      .post("http://localhost:4000/wishlist/", {
        wishlistname: name,
        owner: this.state.actualUserid,
      })
      .then((response) => {
        console.log(response);
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
    console.log(document.cookie);
    this.setState({ actualUserid: id });
    this.getWishlists(id);
  }
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  onFinish = (values) => {
    this.setwishlist(values.wishlistname);
    this.setState({ isModalVisible: false });
    this.formRef.current.resetFields();
  };

  onCancel = () => {
    this.setState({ isModalVisible: false });
    this.formRef.current.resetFields();
  };
  handleClick = (element) => {
    this.setState({ actualwishlist: element });
  };

  logout = () => {
    axios
      .get(`http://localhost:4000/user/logout`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.data) {
          // this.props.handelLogin(response.data);
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
                      <button onClick={this.logout}> logout</button>
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
                      aria-labelledby="wichlist-tab"
                    >
                      <div className="wrapper">
                        <nav id="sidebar">
                          <div
                            style={{
                              border: "2px solid #22a1f9",
                              borderRadius: "4px",
                            }}
                            className="sidebar-header list-unstyled components text-secondary"
                          >
                            <li>
                              <Button onClick={this.showModal} type="primary">
                                Add Wishlist
                              </Button>
                            </li>
                          </div>

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
                                <div>
                                  <ul
                                    style={{ padding: "15px" }}
                                    className="list-unstyled components text-secondary"
                                  >
                                    <li>
                                      <button
                                        onClick={() =>
                                          this.handleClick(element)
                                        }
                                      >
                                        {element["wishlistname"]}
                                      </button>
                                    </li>
                                  </ul>
                                </div>
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
                        </nav>
                        {/* content tab */}
                        {/* {this.state.actualwishlist ? (
                          <Content list={this.state.actualwishlist} />
                        ) : this.state.wishlists.length  (
                        <Content list={this.state.wishlists[0] } ) 
                         } */}

                        {/* {!Object.entries(this.state.actualwishlist).length ===
                        0 ? (
                          <Content list={this.state.actualwishlist} />
                        ) : (
                          <Content list={this.state.firstwishlist} />
                        )} */}

                        {
                          <Content list={this.state.actualwishlist} />
                         }
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
                          {/* <div
                            style={{
                              border: "2px solid #22a1f9",
                              borderRadius: "4px",
                            }}
                            className="sidebar-header list-unstyled components text-secondary"
                          >
                            <li>
                              <a style={{ color: "#22a1f9" }} href>
                                <i
                                  style={{ marginRight: "40px" }}
                                  className="fas fa-plus"
                                />{" "}
                                Add Product
                              </a>
                            </li>
                          </div> */}
                          <ul
                            style={{ padding: "15px" }}
                            className="list-unstyled components text-secondary"
                          >
                            <li>
                              <a href="dashboard.html">
                                <i className="fas fa-" /> Product 1{" "}
                              </a>
                            </li>
                          </ul>
                        </nav>
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
