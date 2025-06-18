import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import { useSelector } from "react-redux";
import GroupDetails from "./components/GroupDetails.jsx";
import { ToastContainer } from "react-toastify";
import Chat from "./pages/Chat.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  const username = useSelector((state) => state.user.username);
  return (
    <BrowserRouter>
      <Routes>
        {username != "" && (
          <Route path="/u">
            <Route path="" element={<Index />}></Route>
            <Route path="chat" element={<Chat />} />
            <Route path="details/:groupID" element={<GroupDetails />}></Route>
          </Route>
        )}
        <Route
          path="/signin"
          element={<AuthForm isLogin={true}></AuthForm>}
        ></Route>
        <Route
          path="/signup"
          element={<AuthForm isLogin={false}></AuthForm>}
        ></Route>
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
