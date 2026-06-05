import NorrisHelmet from "../assets/shopProducts/NorrisHelmet_keyring1.png";
import NorrisLego from "../assets/shopProducts/NorrisLego1.png";
import MaxFunko from "../assets/shopProducts/MaxVerstappen_Funko1.png";
import RedbullShirt from "../assets/shopProducts/Redbull_shirt1.png";
import SennaPicture from "../assets/shopProducts/SennaPicture.png";

export const products = [
    {
        id: 1,
        name: "Norris Helmet Keyring",
        description: "Collectible McLaren keyring",
        image: NorrisHelmet,
        team: "McLaren",
        color: "#FF8000",
        category: "Accessories",
        price: 14.99,
        stock: 100,
        featured: true,
        trending: true
    },

    {
        id: 2,
        name: "Norris Lego",
        description: "Limited edition building set",
        image: NorrisLego,
        team: "McLaren",
        color: "#FF8000",
        category: "Collectibles",
        price: 39.99,
        stock: 50,
        featured: true,
        trending: true
    },

    {
        id: 3,
        name: "Max Verstappen Funko",
        description: "Official Funko of Max Verstappen",
        image: MaxFunko,
        team: "Red Bull",
        color: "#3671C6",
        category: "Collectibles",
        price: 24.99,
        stock: 20,
        featured: true,
        trending: true
    },

    {
        id: 4,
        name: "Red Bull Shirt",
        description: "Official Red Bull apparel",
        image: RedbullShirt,
        team: "Red Bull",
        color: "#3671C6",
        category: "Apparel",
        price: 49.99,
        stock: 200,
        featured: false,
        trending: true
    },

    {
        id: 5,
        name: "Senna Tribute",
        description: "Legendary motorsport artwork",
        image: SennaPicture,
        team: "Legacy",
        color: "#FFD700",
        category: "Art",
        price: 89.99,
        stock: 15,
        featured: true,
        trending: false
    }
];