import axios from "axios";
import React, { Component } from "react";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:4000/product/wishlist/602daab37cde2937419232e5`)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log({ error });
      });
  }
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
              <a href="#" className="nav-link ">
                {" "}
                <i className="fas fa-edit" /> Edit
              </a>
            </li>
            <li className="nav-item">
              <a href="#" style={{ color: "red" }} className="nav-link active">
                {" "}
                <i className="fas fa-trash-alt" /> Delete
              </a>
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
                    <a href="#" className="nav-link ">
                      {" "}
                      <i className="fas fa-th" /> Grid{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link active">
                      {" "}
                      <i className="fas fa-list" /> List{" "}
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
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th> Image </th>
                                <th>Name </th>
                                <th>Description </th>
                                <th>Status</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* dynamique data */}

                              {this.state.products.map((product)=>{
                                if( product['status'] ==="to buy" ){
                                return(

                                 <tr>
                                  
                                <th> <img width="50" height="50" src=""/> </th>
                                <td> {product['productname']} </td>
                                <td>{product['description']}</td>
                                <td>{product['status']}</td>
                                <td> {product['productprice']} </td>
                              </tr>
                                )
                              }
                              })}
                            </tbody>
                          </table>
                        </div>
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
                              {/* dynamique data  */}
                              {this.state.products.map((product)=>{
                                if( product['status'] ==="bought" )
                                return(

                                 <tr>
                                  
                                <th> <img width="40" height="40" src={product['imageurl']} /> </th>
                                <td> {product['productname']} </td>
                                <td>{product['description']}</td>
                                <td>{product['status']}</td>
                                <td> {product['productprice']} </td>
                              </tr>
                                )
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

export default Content;
