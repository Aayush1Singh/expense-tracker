import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import persistStore from "redux-persist/es/persistStore";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <>
    {" "}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);
