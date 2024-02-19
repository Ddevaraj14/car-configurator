import { useCustomization } from "../contexts/Customization";
import "./Config.css";

const Configurator = () => {
  const { material, setMaterial } = useCustomization();
  console.log("material", material);

  return (
    <div className="configuration">
      <div className="configurator_section">
        <div className="configurator_section_title">Chair Material</div>
        <div className="configurator_section_values">
          <div
            className={'item ${material === "leather" ? "item--active": ""}'}
            onClick={() => setMaterial("leather")}
          >
            <div className="item_label">Leather</div>
          </div>
          <div
            className={'item ${material === "fabric" ? "item--active": ""}'}
            onClick={() => setMaterial("fabric")}
          >
            <div className="item_label">Fabric</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
