import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ListPage from './routes/list/listPage';
import { Layout, RequiredAuth } from "./routes/layout/layout";
import HomePage from "./routes/home/homePage";
import Login from "./routes/login/login";
import SinglePage from "./routes/singlePage/singlePage";
import Profile from "./routes/profile/profile";
import Signup from "./routes/signup/signup";
import ProfileUpdate from "./routes/profileUpdate/profileUpdate";
import CreatePost from "./routes/createPost/createPost";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import UpdatePost from "./routes/listUpdate/listUpdate";
// import ViewProfile from "./routes/viewProfile/viewProfile";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element:<HomePage></HomePage>
          },
        {
          path: "/list",
          element: <ListPage></ListPage>,
          loader: listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage></SinglePage>,
          loader: singlePageLoader
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/signup",
          element: <Signup></Signup>
        },
      ]
    },
    {
      path:"/",
      element: <RequiredAuth></RequiredAuth>,
      children:[
        {
          path: "/profile",
          element: <Profile></Profile>,
          loader: profilePageLoader
        },
        {
          path: "/profile-update",
          element: <ProfileUpdate></ProfileUpdate>
        },
        {
          path: "/list/add",
          element: <CreatePost></CreatePost>
        },
        {
          path: "/:id/update",
          element: <UpdatePost></UpdatePost>,
          loader: singlePageLoader
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App;
