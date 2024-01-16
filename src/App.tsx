import "./App.css";
import { ChipSelector } from "./selector/ChipSelector";
import { data } from "./demo-data";

function App() {
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="w-1/3">
                <h1>Chip selector, search between 4 users</h1>
                <h2>built using react and vite</h2>
                <ChipSelector data={data} />
            </div>
        </div>
    );
}

export default App;
