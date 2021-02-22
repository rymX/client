import axios from "axios";
import React, { Component } from "react";
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


class WishlistContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isModalVisible: false,
      isModalVisible2: false
    };
  }
  formRef = React.createRef();
  componentDidMount() {
    const id = this.props.list["_id"]
    axios.get(`http://localhost:4000/product/wishlist/${id}`)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log({ error });
      });
  }
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  onCancel = () => {
    this.setState({ isModalVisible: false });
    this.formRef.current.resetFields();
  };
  onFinish = (values) => {
    const id = this.props.list["_id"]
    axios.patch(`http://localhost:4000/wishlist`, { id: id, wishlistname: values.wishlistname })
      .then((response) => {
        // component should re-render
        this.forceUpdate();
      })
      .catch((error) => {
        console.log({ error });
      });
    this.setState({ isModalVisible: false });
    this.formRef.current.resetFields();
  };
  showModal2 = () => {
    this.setState({ isModalVisible2: true });
  };
  handleOk = () => {
    const id = this.props.list["_id"]
    axios.delete(`http://localhost:4000/wishlist/id/${id}`)
      .then((response) => {
        this.props.forceReloder();
       // this.forceUpdate();
        this.setState({ isModalVisible2: false });
      })
      .catch((error) => {
        console.log({ error });
      });
  }
  handleCancel2 = () => {
    this.setState({ isModalVisible2: false });
  };
  render() {
    return (
      <div id="body">
        <div className="container">
          {/* header */}

          <ul className="nav">
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
                <h4> {this.props.list["wishlistname"]} </h4>
              </a>
            </li>
            <li className="nav-item ml-auto">
            <button onClick={this.showModal} type="primary" class="btn btn-primary"><i class="fas fa-edit"></i> Edit</button>


              <Modal
                title="Edit wishlist "
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

            </li>
            <li className="nav-item">
      <button style={{border : "none"}} onClick={this.showModal2} class="btn btn-danger"><i class="fas fa-trash-alt"></i>Delete</button>
  
                <Modal title="Are you sure to delete wishlist" visible={this.state.isModalVisible2} onOk={this.handleOk} onCancel={this.handleCancel2}>
                </Modal>
            </li>
          </ul>
          <div className="row">
            <div className="col-md-12">
              {/* navbar  */}
              <div className="card-body">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#tobuy"
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
                      href="#bought"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Bought
                    </a>
                  </li>
                  <li className="nav-item ml-auto">
                    <a className="nav-link active">
                      <i className="fas fa-list" /> List{" "}
                    </a>
                  </li>
                  <li className="nav-item ">
                    <a

                      href="#"
                      className="nav-link"
                    >
                      <i className="fas fa-th" /> Grid{" "}
                    </a>
                  </li>
                </ul>
              </div>
              {/* content */}

              <div className="card-body">
                <div className="tab-content" id="myTabContent">
                  {/* to buy products  */}
                  <div
                    className="tab-pane fade active show"
                    id="tobuy"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="card">
                      <div className="card-body">
                        {/* dynamique data */}
                        <table className="table" style={
                          { width: "100%" }
                        }>
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Name </th>
                              <th>description </th>
                              <th>Status</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              this.state.products.map((product) => {
                                if (product["status"] === "to buy") {
                                  return (
                                    <tr>

                                      <th> <img width="50" height="50" src={product["imageurl"]} /> </th>
                                      <td> {product['productname']} </td>
                                      <td>{product['description']}</td>
                                      <td>{product['status']}</td>
                                      <td> {product['productprice']} </td>
                                    </tr>
                                  );
                                }
                              })
                            }

                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                  {/* bought products */}
                  <div
                    className="tab-pane fade"
                    id="bought"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Name </th>
                                <th>description </th>
                                <th>Status</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>

                              {this.state.products.map((product) => {
                                if (product["status"] === "bought")
                                  return (
                                    <tr>
                                      <th>
                                        {" "}
                                        <img
                                          width="40"
                                          height="40"
                                          src={product["imageurl"]}
                                        />{" "}
                                      </th>
                                      <td> {product["productname"]} </td>
                                      <td>{product["description"]}</td>
                                      <td>{product["status"]}</td>
                                      <td> {product["productprice"]} </td>
                                    </tr>
                                  );
                              })}
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
    );
  }
}

export default WishlistContent;
