import "./App.css";
import Login from "./Components/Login/Login";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;
