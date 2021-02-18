import React from "react";

const Sidebar = (props) => {
  return (
    <div>
      {props.list.map((element) => {
        return (
          <div>
            <ul
              style={{ padding: "15px" }}
              className="list-unstyled components text-secondary"
            >
              <li>
                <a href="dashboard.html">
                  <i className="fas fa-" /> {element['wishlistname']}{" "}
                </a>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
