import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./pages/store/store.js";
//index.js
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
//...
let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);
