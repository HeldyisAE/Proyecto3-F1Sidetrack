import "../styles/ShopSpotlightSection.css";

import NorrisHelmet from "../assets/shopProducts/NorrisHelmet_keyring1.png";
import NorrisLego from "../assets/shopProducts/NorrisLego1.png";
import MaxFunko from "../assets/shopProducts/MaxVerstappen_Funko1.png";
import RedbullShirt from "../assets/shopProducts/Redbull_shirt1.png";
import SennaPicture from "../assets/shopProducts/SennaPicture.png";

function ShopSpotLightSection() {
  const products = [
    {
      name: "Norris Helmet Keyring",
      image: NorrisHelmet,
      team: "McLaren",
      color: "#FF8000",
    },
    {
      name: "Norris Lego",
      image: NorrisLego,
      team: "McLaren",
      color: "#FF8000",
    },
    {
      name: "Max Verstappen Funko",
      image: MaxFunko,
      team: "Red Bull",
      color: "#3671C6",
    },
    {
      name: "Red Bull Shirt",
      image: RedbullShirt,
      team: "Red Bull",
      color: "#3671C6",
    },
    {
      name: "Senna Tribute",
      image: SennaPicture,
      team: "Legacy",
      color: "#FFD700",
    },
  ];

  return (
    <div className="shopspot-section">
      <div className="shopspot-header">
        <span className="section-label">Paddock Store</span>

        <span className="shopspot-subtitle">
          Official merchandise and collectibles
        </span>
      </div>

      <div className="shopspot-products">
        {products.map((product) => (
          <div
            key={product.name}
            className="product-card"
            style={{
              "--product-color": product.color,
            }}
          >
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            <span className="product-name">{product.name}</span>

            <div className="product-overlay">
              <span className="overlay-tag">{product.team}</span>

              <span className="overlay-title">{product.name}</span>

              <span className="overlay-description">
                {product.name === "Norris Helmet Keyring" &&
                  "Collectible McLaren keyring"}

                {product.name === "Norris Lego" &&
                  "Limited edition building set"}

                {product.name === "Max Verstappen Funko" && "Official Funko of Max Verstappen"}

                {product.name === "Red Bull Shirt" &&
                  "Official Red Bull apparel"}

                {product.name === "Senna Tribute" &&
                  "Legendary motorsport artwork"}
              </span>

              <button className="overlay-button">View Product →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopSpotLightSection;
