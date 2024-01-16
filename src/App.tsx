import "./App.css";
import { ChipSelector } from "./selector/ChipSelector";
import { data } from "./demo-data";

function App() {
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-1/3">
                <ChipSelector data={data} />
            </div>
        </div>
    );
}

export default App;
