import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
const Body = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        dispatch(addUser({ uid, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoute>
          <Browse />
        </ProtectedRoute>
      ),
    },
  ]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <RouterProvider router={appRouter} />;
};

export default Body;
