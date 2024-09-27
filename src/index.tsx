import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./services/store";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
