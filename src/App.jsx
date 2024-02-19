import { Canvas } from "@react-three/fiber";
import "./App.css";
import Experience from "./components/Experience";
import Configurator from "./components/Configurator";
import { CustomizationProvider } from "./contexts/Customization";

function App() {
  return (
    <div className="App">
      <CustomizationProvider>
        <Canvas>
          <color attach="background" args={["#191920"]} />
          <fog attach="fog" args={["#191920", 0, 15]} />
          <Experience />
        </Canvas>
        <Configurator />
      </CustomizationProvider>
    </div>
  );
}

export default App;
