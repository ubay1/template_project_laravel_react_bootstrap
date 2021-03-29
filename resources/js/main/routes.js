/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
// import { Slide, toast } from 'react-toastify';

import Home from '../pages/Home';
import Login from '../pages/login/login';
import PageNotFound from '../pages/404/404';
import Loading from '../pages/loading/loading'

import { useDispatch, useSelector } from 'react-redux';
import { setAuth, setUsersProfile } from '../store/user';
import { RESTORE_TOKEN,SIGN_IN,SIGN_OUT } from '../store/auth';
import { AuthContext } from '../context/AuthContext';

// toast.configure()

// const Routes = () => {
//   const dispatches = useDispatch()
//   const loading = useSelector((state) => state.loading)
//   const user = useSelector((state) => state.user)
//   const auth = useSelector((state) => state.auth)

//   const emptyRedux = () => {
//     dispatches(setUsersProfile({
//       name: '',
//       address: '',
//       email: '',
//       foto: '',
//       phone_number: ''
//     }))
//     dispatches(setAuth({
//       gotek: 'null',
//       loginWith: '',
//       tuya_user_id: ''
//     })) 
//   }

//   const storeToRedux = (profile, auth) => {
//     dispatches(setUsersProfile(profile))
//     dispatches(setAuth(auth)) 
//   }

//   React.useEffect(() => {
//     const bootstrapAsync = async () => {
//       let tokenWakaf;

//       try {
//         tokenWakaf = await localStorage.getItem('tokenWakaf');

//         if (tokenWakaf === null) {
//           emptyRedux()
//         } else {
//           const dataProfil = {
//             name: 'ubay',
//             address: 'buaran',
//             email: 'tomdelonge976@gmail.com',
//             foto: '',
//             phone_number: '089653674186'
//           }
//           const dataAuth = {
//             // gotek: `${tokenWakaf}`,
//             loginWith: 'not_google',
//             tuya_user_id: 'asadaafa'
//           }

//           storeToRedux(dataProfil, dataAuth)
//         }
//       } catch (e) {
//         // Restoring token failed
//       }

//       dispatches(RESTORE_TOKEN({tokenWakaf: `${tokenWakaf}`}))
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = React.useMemo(() => ({
//     signIn: async (data) => {
//       localStorage.setItem('tokenWakaf', 'eyajasasadjahdjahjdhajd')
//       dispatches(SIGN_IN({ tokenWakaf: 'eyajasasadjahdjahjdhajd' }))

//       const dataProfil = {
//         name: 'ubay',
//         address: 'buaran',
//         email: data.email,
//         foto: '',
//         phone_number: '089653674186'
//       }
//       const dataAuth = {
//         loginWith: 'not_google',
//         tuya_user_id: 'asadaafa'
//       }

//       storeToRedux(dataProfil, dataAuth)
//     },
//     signOut: () => {
//       AsyncStorage.removeItem('gotek')
//       emptyRedux()

      
//       dispatches(SIGN_OUT)
//     },
//     signUp: async (data) => {
//     },
//   }),
//     []
//   );

//   const handleSignIn = (data) => {
//     authContext.signIn(data)
//   };

//   const handleSignOut = () => {
//     authContext.signOut()
//   };

//   return (
//   <AuthContext.Provider value={authContext}>
//     {
//       auth.isLoading ?
//         <Loading />
//       :
//         auth.tokenWakaf === 'null' ? 
//         <>
//           <Redirect
//             to={{
//               pathname: "/login"
//             }}
//           />
//           <Login />
//         </>
//         :
//         <>
//           <Redirect
//             to={{
//               pathname: "/home"
//             }}
//           />
//           <Home />
//         </>
//     }
//   </AuthContext.Provider>
//   )
// }

// export default Routes;

const ROUTES = [
  { path: "/login", 
    key: "APP_LOGIN", 
    exact: true, 
    component: (props) => {
      // console.log(props)
      if (!Cookies.get("tokenWakaf")) {
        return <Login />;
      } else {
        alert('anda masih memiliki akses.')
        return <Redirect to={"/"} />;
      }
    }
  },
  { path: "/", 
    key: "APP_HOME", 
    exact: true, 
    component: Home 
  },
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        return(<route.component {...props} routes={route.routes} />)
      }}
    />
  );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <PageNotFound />} />
    </Switch>
  );
}