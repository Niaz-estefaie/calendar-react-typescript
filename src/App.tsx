import reactLogo from "./assets/react.svg";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented, amountAdded } from "./features/counter/counter-slice";
import { DatePicker } from "./components/DatePicker";
import "./App.css";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(amountAdded(20));
  };

  return (
    <div className="App">
      <DatePicker />
    </div>
  );
}

export default App;
