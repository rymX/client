// import React from 'react'

// export default function wishlistContent(props) {
//     return (
//         <div>
// wishlist
// <h5>{props.location.state.wishlistname} </h5>
// {/* {this.state.wishlists.length ? (
//                           <Content list={this.state.wishlists} />
//                         ) : (
//                           <h1 style={{ padding: "auto" }}>
//                             your product appears here{" "}
//                           </h1>
//                         )} */}

            
//         </div>
//     )
// }

import React, { Component } from 'react'

export default class WishlistContent extends Component {
    state = {
        user: null
      }
      componentDidMount () {
      console.log( this.props)
      }
    render() {
       
        return (
            <div>
                <h6>wishlist</h6>
               
            </div>
        )
    }
}

