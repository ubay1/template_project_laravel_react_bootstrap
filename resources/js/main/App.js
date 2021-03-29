import React, { useEffect, useState, useContext, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ROUTES, { RenderRoutes } from "./routes";
// import Routes from "./routes";

import { Provider } from 'react-redux';
import { store } from '../store/index';

const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <RenderRoutes routes={ROUTES}/>
        {/* <Routes /> */}
      </Router>
    </Provider>
  )
}

//Render a nested hierarchy of route configs with unknown depth/breadth
function displayRouteMenu(routes) {
  // Render a single route as a list item link to the config's pathname
  // function singleRoute(route: any) {
  //   return (
  //     <li key={route.key} className=" p-2">
  //       <Link 
  //          to={route.path} 
  //          className="underline bg-blue-500 p-1 m-2 shadow-sm rounded-md
  //       ">
  //        goto {route.key} ({route.path})
  //       </Link>
  //     </li>
  //   );
  // }

  // looping array dari routes dan generated menjadi list
  return (
    <ul>
      {routes.map((route) => {
        // jika dia ada nested routes (route.routes), maka lempar ke function 
        // dicontoh ini displayRouteMenu(route.routes)
        if (route.routes) {
          return (
            <React.Fragment key={route.key}>
              {/* {singleRoute(route)} */}
              {displayRouteMenu(route.routes)}
            </React.Fragment>
          );
        }

        // jika tidak ada nested routes, maka langsung lempar ke singleRoute(route)
        // return singleRoute(route);
      })}
    </ul>
  );
}

export default App;