// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthForm from "./pages/AuthForm.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import GroupDetails from "./components/GroupDetails.jsx";
const queryClient = new QueryClient();
let persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <TooltipProvider> */}
      {/* <Toaster /> */}
      {/* <Sonner /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/u">
            <Route path="" element={<Index />}></Route>
            <Route path=":groupID" element={<GroupDetails />}></Route>
          </Route>
          <Route
            path="/signin"
            element={<AuthForm isLogin={true}></AuthForm>}
          ></Route>
          <Route
            path="/signup"
            element={<AuthForm isLogin={false}></AuthForm>}
          ></Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {/* </TooltipProvider> */}
      {/* </QueryClientProvider> */}
    </PersistGate>
  </Provider>
);

export default App;
