import React, { Component } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import 'antd/dist/antd.css';

import { Modal, Button, Form, Input, } from 'antd';

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
      wishlists: [],
      profucts: {},
      isModalVisible: false
    }
  }
  getActualuserid = (cookies) => {
    return cookies.split("; ").reduce((r, v) => {
      const parts = v.split("=");
      return parts[0] === 'newuser' ? decodeURIComponent(parts[1]) : r;
    }, "");
  };
  getWishlists = (id) => {
    axios
      .get(
        `http://localhost:4000/wishlist/user/${id}`
      )
      .then((response) => {
        this.setState({ wishlists: response.data })
      })
      .catch((error) => {
        console.log({ " error": error });
      });
  }
  componentDidMount() {
    const id = this.getActualuserid(document.cookie);
    this.setState({ actualUserid: id });
    this.getWishlists(id)
  }
  showModal = () => {
    this.setState({ isModalVisible: true })
  };

  onFinish = (values) => {
    console.log(values);
    this.setState({ isModalVisible: false })
  };


  onCancel = () => {
    this.setState({ isModalVisible: false })
  };

  render() {
    console.log('in state : ', this.state.isModalVisible);
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
                        <i className="fas fa-heart" /> {this.state.actualUserid}
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
                    <li className="nav-item dropdown ml-auto">
                      <div className="nav-dropdown">
                        <a
                          href
                          className="nav-item nav-link dropdown-toggle text-secondary"
                          data-toggle="dropdown"
                        >
                          <i className="fas fa-user-circle" />{" "}
                          <i
                            style={{ fontSize: ".8em" }}
                            className="fas fa-caret-down"
                          />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right nav-link-menu">
                          <ul className="nav-list">
                            <li>
                              <a href className="dropdown-item">
                                <i className="fas fa-sign-out-alt" /> Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li className="nav-item dropdown ">
                      <div className="nav-dropdown">
                        <a
                          href
                          className="nav-item nav-link dropdown-toggle text-secondary"
                          data-toggle="dropdown"
                        >
                          {" "}
                          <span>TND</span>{" "}
                          <i
                            style={{ fontSize: ".8em" }}
                            className="fas fa-caret-down"
                          />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right nav-link-menu">
                          <ul className="nav-list">
                            <li>
                              <a href className="dropdown-item">
                                <i className="fas fa-" />€{" "}
                              </a>
                            </li>
                            <li>
                              <a href className="dropdown-item">
                                <i className="fas fa-" />€{" "}
                              </a>
                            </li>
                            <li>
                              <a href className="dropdown-item">
                                <i className="fas fa-" />€{" "}
                              </a>
                            </li>
                            <div className="dropdown-divider" />
                          </ul>
                        </div>
                      </div>
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
                              {/* <a style={{ color: "#22a1f9" }} href>
                                <i
                                  style={{ marginRight: "40px" }}
                                  className="fas fa-plus"
                                />{" "}
                                Add wishlist
                              </a> */}

                              <Button onClick={this.showModal} type="primary">
                                Add Wishlist
      </Button>
                            </li>
                          </div>

                          <Modal title="Add wishlist "
                            visible={this.state.isModalVisible}
                            footer={null}
                           >
                            <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                              <Form.Item name="wishlistname" label="wishlist name" rules={[{ required: true , message: 'Please input your wishlist name!'}]}>
                                <Input />
                              </Form.Item>
                             
                              <Form.Item {...tailLayout}>
                              <Button htmlType="button" onClick={this.onCancel}>
                                  Cancel
          </Button>
                                <Button type="primary" htmlType="submit">
                                  Done
          </Button>
                            
                              </Form.Item>
                            </Form>


                          </Modal>
                          {/* <div>

                          <ul
                            style={{ padding: "15px" }}
                            className="list-unstyled components text-secondary"
                          >
                            <li>
                              <a href="dashboard.html">
                                <i className="fas fa-" />  hello{" "}
                              </a>
                            </li>
                            <li>
                              <a href="forms.html">
                                <i className="fas fa-file-" /> wishlist 2{" "}
                              </a>
                            </li>
                          </ul>
                          
                          </div> */}
                          {/* { this.state.wishlists.length ? <ul> <li> hello</li> </ul> : <ul> <li > hello</li> </ul> } */}

                          {
                            this.state.wishlists.length ? <Sidebar list={this.state.wishlists} /> : <ul className="list-unstyled components text-secondary"> <li style={{ padding: "50px 25px" }}>
                              <b> there are no Wishlists yet</b> <br />Add your first wishlist <i className="fas fa-heart" /> </li></ul>
                          }
                        </nav>
                        <div id="body" className>
                          <div className>
                            <div className="container">
                              <div className>
                                <div className>
                                  <ul className="nav ">
                                    <li className="nav-item">
                                      <a
                                        className="nav-link active"
                                        id="home-tab"
                                        data-toggle="tab"
                                        href="#home"
                                        role="tab"
                                        aria-controls="home"
                                        aria-selected="false"
                                      >
                                        {" "}
                                        <h4>wishlist 1</h4>
                                      </a>
                                    </li>
                                    <li className="nav-item ml-auto">
                                      <a href="#" className="nav-link ">
                                        {" "}
                                        <i className="fas fa-edit" /> Edit
                                      </a>
                                    </li>
                                    <li className="nav-item">
                                      <a
                                        href="#"
                                        style={{ color: "red" }}
                                        className="nav-link active"
                                      >
                                        {" "}
                                        <i className="fas fa-trash-alt" />{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 col-lg-12">
                                  <div className>
                                    <div className="card-body">
                                      <ul
                                        className="nav nav-tabs"
                                        id="myTab"
                                        role="tablist"
                                      >
                                        <li className="nav-item">
                                          <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="false"
                                          >
                                            To buy
                                          </a>
                                        </li>
                                        <li className="nav-item">
                                          <a
                                            className="nav-link"
                                            id="profile-tab"
                                            data-toggle="tab"
                                            href="#profile"
                                            role="tab"
                                            aria-controls="profile"
                                            aria-selected="false"
                                          >
                                            Bought
                                          </a>
                                        </li>
                                        <li className="nav-item ml-auto">
                                          <a href="#" className="nav-link ">
                                            {" "}
                                            <i className="fas fa-th" /> Grid{" "}
                                          </a>
                                        </li>
                                        <li className="nav-item">
                                          <a
                                            href="#"
                                            className="nav-link active"
                                          >
                                            {" "}
                                            <i className="fas fa-list" /> List{" "}
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className>
                                    <div className="card-body">
                                      <div
                                        className="tab-content"
                                        id="myTabContent"
                                      >
                                        <div
                                          className="tab-pane fade active show"
                                          id="home"
                                          role="tabpanel"
                                          aria-labelledby="home-tab"
                                        >
                                          <table
                                            width="100%"
                                            className="table table-hover"
                                            id="dataTables-example"
                                          >
                                            <thead>
                                              <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                                <th />
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>Philip Chaney</td>
                                                <td>philip.chaney@gmail.com</td>
                                                <td>Manager</td>
                                                <td>Admin</td>
                                                <td>Active</td>
                                                <td className="text-right">
                                                  <a
                                                    href
                                                    className="btn btn-outline-info btn-rounded"
                                                  >
                                                    <i className="fas fa-pen" />
                                                  </a>
                                                  <a
                                                    href
                                                    className="btn btn-outline-danger btn-rounded"
                                                  >
                                                    <i className="fas fa-trash" />
                                                  </a>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Doris Greene</td>
                                                <td>ms.greene@outlook.com</td>
                                                <td>Writer</td>
                                                <td>Staff</td>
                                                <td>Active</td>
                                                <td className="text-right">
                                                  <a
                                                    href
                                                    className="btn btn-outline-info btn-rounded"
                                                  >
                                                    <i className="fas fa-pen" />
                                                  </a>
                                                  <a
                                                    href
                                                    className="btn btn-outline-danger btn-rounded"
                                                  >
                                                    <i className="fas fa-trash" />
                                                  </a>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Mason Porter</td>
                                                <td>mason_porter@gmail.com</td>
                                                <td>Contributor</td>
                                                <td>Staff</td>
                                                <td>Active</td>
                                                <td className="text-right">
                                                  <a
                                                    href
                                                    className="btn btn-outline-info btn-rounded"
                                                  >
                                                    <i className="fas fa-pen" />
                                                  </a>
                                                  <a
                                                    href
                                                    className="btn btn-outline-danger btn-rounded"
                                                  >
                                                    <i className="fas fa-trash" />
                                                  </a>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Minerva Hooper</td>
                                                <td>
                                                  minerva.hooper@gmail.com
                                                </td>
                                                <td>Administrator</td>
                                                <td>Admin</td>
                                                <td>Disabled</td>
                                                <td className="text-right">
                                                  <a
                                                    href
                                                    className="btn btn-outline-info btn-rounded"
                                                  >
                                                    <i className="fas fa-pen" />
                                                  </a>
                                                  <a
                                                    href
                                                    className="btn btn-outline-danger btn-rounded"
                                                  >
                                                    <i className="fas fa-trash" />
                                                  </a>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Jessie Williams</td>
                                                <td>jessie@gmail.com</td>
                                                <td>Administrator</td>
                                                <td>Admin</td>
                                                <td>Active</td>
                                                <td className="text-right">
                                                  <a
                                                    href
                                                    className="btn btn-outline-info btn-rounded"
                                                  >
                                                    <i className="fas fa-pen" />
                                                  </a>
                                                  <a
                                                    href
                                                    className="btn btn-outline-danger btn-rounded"
                                                  >
                                                    <i className="fas fa-trash" />
                                                  </a>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Peter Benhams</td>
                                                <td>pette@gmail.com</td>
                                                <td>Editor</td>
                                                <td>Staff</td>
                                                <td>Active</td>
                                                <td className="text-right">
                                                  <a
                                                    href
                                                    className="btn btn-outline-info btn-rounded"
                                                  >
                                                    <i className="fas fa-pen" />
                                                  </a>
                                                  <a
                                                    href
                                                    className="btn btn-outline-danger btn-rounded"
                                                  >
                                                    <i className="fas fa-trash" />
                                                  </a>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>Jose Rodriguez</td>
                                                <td>jose.rodz@gmail.com</td>
                                                <td>Author</td>
                                                <td>Staff</td>
                                                <td>Active</td>
                                                <td className="text-right">
                                                  <a
                                                    href
                                                    className="btn btn-outline-info btn-rounded"
                                                  >
                                                    <i className="fas fa-pen" />
                                                  </a>
                                                  <a
                                                    href
                                                    className="btn btn-outline-danger btn-rounded"
                                                  >
                                                    <i className="fas fa-trash" />
                                                  </a>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div
                                          className="tab-pane fade"
                                          id="profile"
                                          role="tabpanel"
                                          aria-labelledby="profile-tab"
                                        >
                                          <div className="card">
                                            <div className="card-body">
                                              <div className="table-responsive">
                                                <table className="table">
                                                  <thead>
                                                    <tr>
                                                      <th>ID</th>
                                                      <th>First Name</th>
                                                      <th>Last Name</th>
                                                      <th>Username</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                      <th scope="row">1</th>
                                                      <td>Mark</td>
                                                      <td>Otto</td>
                                                      <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">2</th>
                                                      <td>Jacob</td>
                                                      <td>Thornton</td>
                                                      <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                      <th scope="row">3</th>
                                                      <td>Larry</td>
                                                      <td>the Bird</td>
                                                      <td>@twitter</td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                          </div>
                          <ul
                            style={{ padding: "15px" }}
                            className="list-unstyled components text-secondary"
                          >
                            <li>
                              <a href="dashboard.html">
                                <i className="fas fa-" /> Product 1{" "}
                              </a>
                            </li>
                            <li>
                              <a href="forms.html">
                                <i className="fas fa-file-" /> product 2{" "}
                              </a>
                            </li>
                          </ul>
                        </nav>
                        <div id="body" className>
                          <div className>
                            <div className="container">
                              <div className>
                                <div className>
                                  <ul className="nav ">
                                    <li className="nav-item">
                                      <a
                                        className="nav-link active"
                                        id="home-tab"
                                        data-toggle="tab"
                                        href="#home"
                                        role="tab"
                                        aria-controls="home"
                                        aria-selected="false"
                                      >
                                        {" "}
                                        <h4>product 1</h4>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td
                                          className="col-sm-10"
                                          style={{ border: "2px solid red" }}
                                        >
                                          <div className="card">
                                            <div className="card-body">
                                              <div className="row">
                                                <div
                                                  style={{ height: "200px" }}
                                                  className="col-6"
                                                >
                                                  <img
                                                    style={{
                                                      border: "2px solid black",
                                                      height: "60px",
                                                    }}
                                                    src="./assets/img/bootstraper-logo.png"
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="col-6">
                                                  <label htmlFor="tex">
                                                    description
                                                  </label>
                                                  <input type="text" />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td
                                          className="col-sm-10"
                                          style={{ border: "2px solid red" }}
                                        ></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
