import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./pages/store/store.js";
//index.js
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { app } from "./fierBase.cofig.js";
//...
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store} app={app}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);
