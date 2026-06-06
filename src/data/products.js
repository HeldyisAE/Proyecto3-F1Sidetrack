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
        description: "LEGO Editions: McLaren Mastercard F1 Team Lando Norris Helmet",
        image: NorrisLego,
        team: "McLaren",
        color: "#FF8000",
        category: "Collectibles",
        price: 199.99,
        stock: 50,
        featured: true,
        trending: true
    },

    {
        id: 3,
        name: "Max Verstappen Funko",
        description: "Official Funko of Max Verstappen",
        image: MaxFunko,
        team: "Red Bull Racing",
        color: "#1E41FF",
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
        team: "Red Bull Racing",
        color: "#1E41FF",
        category: "Apparel",
        price: 49.99,
        stock: 200,
        featured: true,
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
        trending: true
    },

    {
        id: 6,
        name: "Charles Leclerc Lego Helmet",
        description: "LEGO Editions: Scuderia Ferrari HP Charles Leclerc Helmet",
        image: "https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-hp-f1-charles-leclerc-lego-helmet_ss5_p-204453019+pv-3+u-qhh8ozpsnwifozs7jrom+v-smeervcg1noxsevytkxw.jpg?_hv=2&w=1018",
        team: "Ferrari",
        color: "#DC0000",
        category: "Collectibles",
        price: 90.00,
        stock: 150,
        featured: false,
        trending: false
    },

    {
        id: 7,
        name: "Lewis Hamilton Lego Helmet",
        description: "LEGO Editions: Scuderia Ferrari HP Lewis Hamilton Helmet",
        image: "https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-hp-f1-lewis-hamilton-lego-helmet_ss5_p-204453021+pv-3+u-eiz1divo8lrlnfkjlh4n+v-xw55ucgwn5xeqcunnp17.jpg?_hv=2&w=1018",
        team: "Ferrari", 
        color: "#DC0000",
        category: "Collectibles",
        price: 90.00,
        stock: 150,
        featured: false,
        trending: true
    },

    {
        id: 8,
        name: "Charles Leclerc Driver Racing Jacket",
        description: "Official Scuderia Ferrari HP unisex driver racing jacket - Charles Leclerc edition",
        image: "https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-charles-leclerc-driver-racing-jacket-unisex_ss5_p-203337078+pv-6+u-ans9rida1p2fjepp1r65+v-bx5vb9r0ytsdtb29mmrh.jpg?_hv=2&w=1018",
        team: "Ferrari",
        color: "#DC0000",
        category: "Apparel", 
        price: 135.00,       
        stock: 85,
        featured: false,      
        trending: false
    },

    {
        id: 9,
        name: "Lando Norris Lego Helmet",
        description: "LEGO Editions: McLaren Mastercard F1 Team Lando Norris Helmet",
        image: "https://images.footballfanatics.com/mclaren-f1-team/mclaren-mastercard-f1-team-lando-norris-lego-helmet_ss5_p-204453022+pv-3+u-woltr898f58fi56svqzp+v-7dhruoj858hp2bezeabo.jpg?_hv=2&w=1018",
        team: "McLaren",
        color: "#FF8000", 
        category: "Collectibles",
        price: 90.00,
        stock: 120,
        featured: false,
        trending: true
    },

    {
        id: 10,
        name: "Lando Norris 1000th Race Replica Cap",
        description: "Official McLaren F1 Team unisex replica baseball cap - Lando Norris 1000th Race Special Edition",
        image: "https://images.footballfanatics.com/mclaren-f1-team/mclaren-1000th-race-lando-norris-replica-baseball-cap-unisex_ss5_p-203534148+pv-1+u-z7hopn3m4cecjgjqydfd+v-7diedp25snm4teiwsjrb.jpg?_hv=2&w=1018",
        team: "McLaren",
        color: "#FF8700", 
        category: "Accessories", 
        price: 45.00,             
        stock: 200,
        featured: false,           
        trending: false
    },

    {
        id: 11,
        name: "Lando Norris Driver T-Shirt",
        description: "Official McLaren F1 Team unisex driver t-shirt - Lando Norris edition",
        image: "https://images.footballfanatics.com/mclaren-f1-team/mclaren-lando-norris-driver-t-shirt-black-unisex_ss5_p-203337120+pv-3+u-jxrenuuuefio5o7hjdta+v-vq6vuxfdlqeg67e5kjvk.jpg?_hv=2&w=1018",
        team: "McLaren",
        color: "#FF8700",
        category: "Apparel",
        price: 55.00,
        stock: 250,
        featured: false,
        trending: false
    },

    {
        id: 12,
        name: "Oracle Red Bull Racing Logo Relaxed Hoodie",
        description: "Official Oracle Red Bull Racing unisex relaxed fit hoodie with team logo",
        image: "https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-logo-relaxed-hoodie-unisex_ss5_p-203284869+pv-5+u-i43krjdkw80ihnbf3tli+v-z4spvav8ey2nzzayvnfq.jpg?_hv=2&w=1018",
        team: "Red Bull Racing",
        color: "#1E41FF",
        category: "Apparel",
        price: 95.00,
        stock: 180,
        featured: false,
        trending: false
    },

    {
        id: 13,
        name: "Mercedes-AMG Petronas Adidas DNA Cap",
        description: "Official Mercedes-AMG Petronas F1 Team Adidas DNA baseball cap in black",
        image: "https://images.footballfanatics.com/mercedes-amg-petronas-f1-team/mercedes-amg-petronas-adidas-dna-cap-black_ss5_p-203336905+pv-1+u-qps2iivxomjmhd26boax+v-pd7whjdcfw2gqojotzvv.png?_hv=2&w=1018",
        team: "Mercedes-AMG Petronas",
        color: "#00A19C",
        category: "Accessories",
        price: 45.00,
        stock: 140,
        featured: false,
        trending: false
    },

    {
        id: 14,
        name: "Kimi Antonelli Adidas Graphic T-Shirt",
        description: "Official Mercedes-AMG Petronas F1 Team Adidas Kimi Antonelli graphic t-shirt for kids",
        image: "https://images.footballfanatics.com/mercedes-amg-petronas-f1-team/mercedes-amg-petronas-adidas-f1-kimi-antonelli-graphic-t-shirt-kids_ss5_p-203336894+pv-2+u-dwak6o1w74einp4tfy7b+v-0aasyfm47px1tkj8dc6j.jpg?_hv=2&w=1018",
        team: "Mercedes-AMG Petronas",
        color: "#00A19C",
        category: "Apparel",
        price: 40.00,
        stock: 95,
        featured: false,
        trending: true
    },

    {
        id: 15,
        name: "Mercedes-AMG Petronas Adidas F1 2026 Team Hoodie",
        description: "Official Mercedes-AMG Petronas F1 Team Adidas 2026 team hoodie for kids",
        image: "https://images.footballfanatics.com/mercedes-amg-petronas-f1-team/mercedes-amg-petronas-adidas-f1-2026-team-hoodie-black-kids_ss5_p-203336930+pv-2+u-cf2b6obpfc0yrzambsaw+v-sms67z9pz9a5a5zq8yl1.png?_hv=2&w=1018",
        team: "Mercedes-AMG Petronas",
        color: "#000000",
        category: "Apparel",
        price: 85.00,
        stock: 110,
        featured: false,
        trending: false
    },

    {
        id: 16,
        name: "Mercedes-AMG F1 W15 LEGO Race Car",
        description: "LEGO Editions: Mercedes-AMG Petronas F1 Team W15 racing car building set",
        image: "https://images.footballfanatics.com/mercedes-amg-petronas-f1-team/mercedes-amg-f1%C2%AE-lego%C2%AE-w15-race-car_ss5_p-202284778+pv-2+u-riksnkqkctchbixoiz5w+v-xduzkx4vvpi1vftzookt.png?_hv=2&w=1018",
        team: "Mercedes-AMG Petronas",
        color: "#00A19C",
        category: "Collectibles",
        price: 219.99,
        stock: 75,
        featured: false,
        trending: true
    },

    {
        id: 18,
        name: "Cadillac Tommy Hilfiger Big Logo T-Shirt",
        description: "Official Cadillac F1 Team Tommy Hilfiger collaboration t-shirt in black with large logo",
        image: "https://images.footballfanatics.com/cadillac-f1-team/cadillac-tommy-hilfiger-big-logo-t-shirt-black_ss5_p-203721314+pv-4+u-6yddwa5bjwunevpc85oi+v-ufuuvipfybny1axg00iz.jpg?_hv=2&w=1018",
        team: "Cadillac F1 Team",
        color: "#000000",
        category: "Apparel",
        price: 65.00,
        stock: 130,
        featured: false,
        trending: false
    },

    {
        id: 19,
        name: "Audi F1 Adidas Special Edition Miami Cap",
        description: "Official Audi F1 Team Adidas special edition baseball cap - Miami Grand Prix design",
        image: "https://images.footballfanatics.com/audi/audi-f1-adidas-special-edition-miami-cap_ss5_p-203336864+pv-1+u-2dkhvtwzqm6slkdihyfu+v-nkiqo11gzkca8dbmvjc7.jpg?_hv=2&w=1018",
        team: "Audi F1 Team",
        color: "#E2001A",
        category: "Accessories",
        price: 50.00,
        stock: 160,
        featured: false,
        trending: false
    },

    {
        id: 20,
        name: "BWT Alpine F1 Team A524 LEGO Race Car",
        description: "LEGO Editions: BWT Alpine F1 Team A524 racing car building set",
        image: "https://images.footballfanatics.com/alpine/bwt-alpine-f1%C2%AE-team-lego%C2%AE-a524-race-car_ss5_p-202284782+pv-2+u-oqs8d8zgpezqma4rhhgm+v-rgnneyvo86xia1dal92l.png?_hv=2&w=1018",
        team: "Alpine",
        color: "#005AAA",
        category: "Collectibles",
        price: 219.99,
        stock: 65,
        featured: false,
        trending: false
    },

    {
        id: 21,
        name: "Fernando Alonso Driver T-Shirt",
        description: "Official Aston Martin Aramco F1 Team 2025 youth driver t-shirt - Fernando Alonso edition",
        image: "https://images.footballfanatics.com/aston-martin/aston-martin-aramco-cognizant-f1-2025-fernando-alonso-team-driver-t-shirt-kids_ss5_p-202359061+pv-2+u-m5ugmyhklzlj4dxtc5c4+v-dcik1ehdsktfalwfczlw.jpg?_hv=2&w=1018",
        team: "Aston Martin",
        color: "#006F62",
        category: "Apparel",
        price: 45.00,
        stock: 110,
        featured: false,
        trending: false
    },

    {
        id: 22,
        name: "Fernando Alonso Team Cap",
        description: "Official Aston Martin Aramco F1 Team 2026 youth baseball cap - Fernando Alonso edition",
        image: "https://images.footballfanatics.com/aston-martin/aston-martin-aramco-cognizant-f1-2026-fernando-alonso-team-cap-green-kids_ss5_p-203337010+pv-1+u-lzaa46psekwojhvnbkgr+v-sbutbkzmwmiefvpncn8h.jpg?_hv=2&w=1018",
        team: "Aston Martin",
        color: "#006F62",
        category: "Accessories",
        price: 40.00,
        stock: 150,
        featured: false,
        trending: false
    },

    {
        id: 23,
        name: "Haas F1 Team 2026 Set-Up T-Shirt",
        description: "Official Haas F1 Team 2026 youth set-up t-shirt in black with team logo",
        image: "https://images.footballfanatics.com/haas-f1-team/haas-2026-team-set-up-t-shirt-kids_ss5_p-203284827+pv-2+u-2qhf0e70e7hj00mhp1xa+v-f4zfez6y9xmeshza3pxx.jpg?_hv=2&w=1018",
        team: "Haas",
        color: "#000000",
        category: "Apparel",
        price: 45.00,
        stock: 90,
        featured: false,
        trending: false
    },

    {
        id: 24,
        name: "Carlos Sainz Graphic Hoodie",
        description: "Official Williams Racing x Reflo unisex graphic hoodie - Carlos Sainz edition",
        image: "https://images.footballfanatics.com/williams-racing/rokit-williams-racing-x-reflo-carlos-sainz-graphic-hoodie-unisex_ss5_p-203843344+pv-3+u-qbfmzzqibomip8zsfsge+v-aw4h9dxg5ybr6wuia7q7.jpg?_hv=2&w=1018",
        team: "Williams",
        color: "#00A0DE",
        category: "Apparel",
        price: 95.00,
        stock: 110,
        featured: false,
        trending: false
    },

    {
        id: 25,
        name: "McLaren SunGod Team Miras Sunglasses",
        description: "Official McLaren F1 Team SunGod collaboration Miras lifestyle sunglasses",
        image: "https://images.footballfanatics.com/mclaren-f1-team/mclaren-sungod-team-miras-sunglasses_ss5_p-203598615+pv-1+u-puyp6vb60gwxzqkvfgbd+v-johw8pf8krzvhd530e34.png?_hv=2&w=1018",
        team: "McLaren",
        color: "#FF8700",
        category: "Accessories",
        price: 120.00,
        stock: 85,
        featured: false,
        trending: false
    },

    {
        id: 26,
        name: "Oracle Red Bull Racing New Era Seasonal Bucket Hat",
        description: "Official Oracle Red Bull Racing unisex tapered bucket hat by New Era in red",
        image: "https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-new-era-seasonal-tapered-bucket-hat-red-unisex_ss5_p-203342225+pv-1+u-dk9vqm7fljxwr0zc05ec+v-80om4xmpecbxhqfztjnp.jpg?_hv=2&w=1018",
        team: "Red Bull Racing",
        color: "#E10600",
        category: "Accessories",
        price: 48.00,
        stock: 120,
        featured: false,
        trending: false
    },

    {
        id: 27,
        name: "Oracle Red Bull Racing RB22 2026 Poster",
        description: "Official Oracle Red Bull Racing 2026 season wall poster featuring the RB22 race car",
        image: "https://images.footballfanatics.com/red-bull-racing/oracle-red-bull-racing-rb22-2026-poster_ss5_p-203828285+pv-4+u-pcfk3vrrhs5tqktxrbbs+v-o0vbyrs7eq20bg8jsrg6.jpg?_hv=2&w=1018",
        team: "Red Bull Racing",
        color: "#0B2F61",
        category: "Collectibles",
        price: 25.00,
        stock: 200,
        featured: false,
        trending: true
    },

    {
        id: 28,
        name: "Red Bull Racing Japan Special Edition Replica Track Polo",
        description: "Official Red Bull Racing special edition replica track polo shirt - Japan Grand Prix design",
        image: "https://images.footballfanatics.com/red-bull-racing/red-bull-racing-japan-special-edition-replica-track-polo_ss5_p-202681566+pv-2+u-udzltpmydkseqjr3113n+v-lcwp3pbf4ixspl8fdqof.jpg?_hv=2&w=1018",
        team: "Red Bull Racing",
        color: "#FFFFFF",
        category: "Apparel",
        price: 75.00,
        stock: 105,
        featured: false,
        trending: false
    },

    {
        id: 29,
        name: "Scuderia Ferrari Puma Trucker Cap",
        description: "Official Scuderia Ferrari Puma trucker-style lifestyle cap in light pink",
        image: "https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-puma-trucker-cap-light-pink_ss5_p-203555966+pv-3+u-9yztcwi8qeambucfnqag+v-7gqrjq4exzabr19n5hl5.jpg?_hv=2&w=1018",
        team: "Scuderia Ferrari",
        color: "#FFC0CB",
        category: "Accessories",
        price: 45.00,
        stock: 140,
        featured: false,
        trending: false
    },

    {
        id: 30,
        name: "Scuderia Ferrari Baseball Jersey by Puma",
        description: "Official Scuderia Ferrari lifestyle baseball jersey shirt designed by Puma in black",
        image: "https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-baseball-jersey-by-puma-black_ss5_p-203337017+pv-1+u-tf6wbekrroilxmx0frgt+v-rox8zoimkggdwbztbzyx.jpg?_hv=2&w=1018",
        team: "Scuderia Ferrari",
        color: "#000000",
        category: "Apparel",
        price: 90.00,
        stock: 95,
        featured: false,
        trending: false
    },

    {
        id: 31,
        name: "Scuderia Ferrari Thermal Mug",
        description: "Official Scuderia Ferrari insulated stainless steel thermal travel mug with team branding",
        image: "https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-thermal-mug_ss5_p-203337071+pv-1+u-f5jficonsqembvkonoc7+v-9bsiktrs3cn0evfoyoky.png?_hv=2&w=1018",
        team: "Scuderia Ferrari",
        color: "#E10600",
        category: "Accessories",
        price: 35.00,
        stock: 150,
        featured: false,
        trending: false
    },

    {
        id: 32,
        name: "Michael Schumacher Tribute",
        description: "Historic collector's edition wall poster capturing Michael Schumacher's iconic pit stop at the 2000 Japanese Grand Prix",
        image: "https://images.footballfanatics.com/scuderia-ferrari/scuderia-ferrari-michael-schumacher-japanese-gp-pit-stop-2000-collectors-edition-poster_ss5_p-203164490+pv-2+u-ge8uz8et6odr8kodayhh+v-jbdnnemjimqgaoz1k3ok.jpg?_hv=2&w=1018",
        team: "Legacy",
        color: "#E10600",
        category: "Collectibles",
        price: 45.00,
        stock: 75,
        featured: false,
        trending: false
    },

    {
        id: 33,
        name: "Ayrton Senna Brazil Track Jacket",
        description: "Official Ayrton Senna historic tribute apparel - Brazil national edition track jacket",
        image: "https://images.footballfanatics.com/ayrton-senna/ayrton-senna-brazil-track-jacket_ss5_p-203687411+pv-2+u-jwntaznanbzd7ok0s1st+v-zz4neytdjuwrhwqkqceh.jpg?_hv=2&w=1018",
        team: "Legacy",
        color: "#FED100",
        category: "Apparel",
        price: 110.00,
        stock: 80,
        featured: false,
        trending: false
    }
];