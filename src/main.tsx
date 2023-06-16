import ReactDOM from "react-dom/client";
import { App } from "./components/common/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

const root: HTMLElement = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
