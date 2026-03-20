// ─────────────────────────────────────────────
//  BASE DE DATOS — valores por 100g
//  formato: [kcal, proteína, carbohidratos, grasas, fibra]
// ─────────────────────────────────────────────
const DB = {
    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // VERDURAS 
    "aguacate": [160, 2.0, 8.5, 14.7, 6.7],
    "ajo": [149, 6.4, 33.1, 0.5, 2.1],
    "papa cocida": [87, 1.9, 20.1, 0.1, 1.8],
    "camote": [86, 1.6, 20.1, 0.1, 3.0],
    "betabel": [43, 1.6, 9.6, 0.2, 2.8],
    "elotes": [106, 3.4, 21.0, 1.2, 2.7],
    "espárragos": [20, 2.2, 3.4, 0.1, 2.1],
    "espinaca": [23, 2.9, 3.6, 0.4, 2.2],
    "jícama": [38, 0.7, 8.8, 0.1, 4.9],
    "tomate": [18, 0.9, 3.9, 0.2, 1.2],
    "lechuga": [15, 1.4, 2.9, 0.2, 1.3],
    "nopal": [16, 1.4, 3.3, 0.1, 2.2],
    "pepino": [15, 0.7, 3.6, 0.1, 0.5],
    "pimiento": [26, 1.0, 6.0, 0.3, 2.1],
    "tomatillo": [32, 1.0, 5.8, 1.0, 1.9],
    "zanahoria": [41, 0.9, 9.6, 0.2, 2.8],
    "brocoli": [34, 2.8, 6.6, 0.4, 2.6],
    "calabaza": [17, 1.2, 3.4, 0.2, 1.1],
    "cebolla": [40, 1.1, 9.3, 0.1, 1.7],
    "champiñon": [22, 3.1, 3.3, 0.3, 1.0],
    "chile jalapeño": [29, 0.9, 6.5, 0.4, 2.8],
    "chayote": [19, 0.8, 4.5, 0.1, 1.7],
    "chile serrano": [32, 1.7, 7.0, 0.4, 2.8],
    "chile poblano": [20, 0.9, 4.7, 0.2, 1.8],
    "coliflor": [25, 1.9, 5.0, 0.3, 2.0],
    "ejotes": [31, 1.8, 7.0, 0.2, 2.7],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // FRUTAS 
    "toronja": [42, 0.8, 10.7, 0.1, 1.6],
    "tuna": [41, 0.7, 9.6, 0.5, 3.6],
    "mamey": [124, 1.5, 32.1, 0.5, 3.0],
    "ciruela": [46, 0.7, 11.4, 0.3, 1.4],
    "coco tierno": [354, 3.3, 15.2, 33.5, 9.0],
    "agua de coco": [19, 0.7, 3.7, 0.2, 1.1],
    "arándanos": [46, 0.4, 12.2, 0.1, 4.6],
    "blueberry": [57, 0.7, 14.5, 0.3, 2.4],
    "durazno": [39, 0.9, 9.5, 0.3, 1.5],
    "frambuesa": [52, 1.2, 11.9, 0.7, 6.5],
    "fresa": [32, 0.7, 7.7, 0.3, 2.0],
    "guayaba": [68, 2.6, 14.3, 1.0, 5.4],
    "mango": [60, 0.8, 15.0, 0.4, 1.6],
    "naranja": [47, 0.9, 11.8, 0.1, 2.4],
    "papaya": [43, 0.5, 10.8, 0.3, 1.7],
    "piña": [50, 0.5, 13.1, 0.1, 1.4],
    "mandarina": [53, 0.8, 13.3, 0.3, 1.8],
    "limón": [29, 1.1, 9.3, 0.3, 2.8],
    "kiwi": [61, 1.1, 14.7, 0.5, 3.0],
    "lichis": [66, 0.8, 16.5, 0.4, 1.3],
    "manzana roja": [52, 0.3, 13.8, 0.2, 2.4],
    "manzana verde": [52, 0.3, 13.8, 0.2, 2.8],
    "melón": [34, 0.8, 8.2, 0.2, 0.9],
    "pera": [57, 0.4, 15.2, 0.1, 3.1],
    "plátano": [89, 1.1, 22.8, 0.3, 2.6],
    "pasas": [299, 3.1, 79.2, 0.5, 3.7],
    "sandía": [30, 0.6, 7.6, 0.2, 0.4],
    "uva morada con semillas": [69, 0.7, 18.1, 0.2, 0.9],
    "uva morada sin semilla": [67, 0.6, 17.2, 0.4, 0.9],
    "uva verde con semilla": [69, 0.7, 18.1, 0.2, 0.9],
    "uva verde sin semilla": [67, 0.6, 17.2, 0.4, 0.9],
    "frutos rojos": [50, 1.0, 12.0, 0.3, 4.5],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // CEREALES Y SNACKS 
    "pan integral": [247, 13.0, 41.0, 3.4, 7.0],
    "quinoa cruda": [368, 14.1, 64.2, 6.1, 7.0],
    "palomitas naturales": [387, 12.9, 77.8, 4.5, 14.5],
    "teleras": [274, 9.0, 53.0, 3.0, 2.2],
    "barrita de cereal": [400, 5.0, 75.0, 10.0, 3.0],
    "arroz blanco crudo": [360, 6.6, 79.0, 0.6, 1.3],
    "arroz integral crudo": [370, 7.9, 77.2, 2.9, 3.5],
    "avena cruda": [389, 16.9, 66.3, 6.9, 10.6],
    "bolillo": [277, 9.5, 54.0, 1.5, 2.4],
    "papa": [77, 2.0, 17.5, 0.1, 2.2],
    "corn flakes": [357, 7.1, 82.1, 0.4, 3.3],
    "spaghetti crudo": [371, 13.0, 74.7, 1.5, 3.2],
    "galletas María": [430, 7.0, 78.0, 10.0, 2.0],
    "granola": [471, 10.0, 64.0, 20.0, 5.0],
    "little caesar": [260, 11.5, 29.0, 10.5, 1.5],
    "pan blanco bimbo": [250, 8.5, 47.0, 3.5, 2.5],
    "chia": [486, 16.5, 42.1, 30.7, 34.4],
    "tortilla de maíz": [218, 5.7, 45.0, 2.8, 6.0],
    "tortilla de harina": [310, 8.0, 50.0, 9.0, 2.0],
    "tortilla de nopal": [150, 4.0, 30.0, 1.5, 10.0],
    "tostadas": [450, 7.0, 65.0, 18.0, 8.0],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // GRASAS Y SEMILLAS 
    "almendras": [579, 21.2, 21.7, 49.9, 12.5],
    "cacahuates": [567, 25.8, 16.1, 49.2, 8.5],
    "nuez pecana": [691, 9.2, 13.9, 72.0, 9.6],
    "mantequilla de maní": [588, 25.0, 20.0, 50.0, 6.0],
    "aceite de oliva": [884, 0.0, 0.0, 100.0, 0.0],
    "mayonesa": [680, 1.0, 1.0, 75.0, 0.0],
    "nueces": [654, 15.2, 13.7, 65.2, 6.7],
    "pistaches": [562, 20.2, 27.2, 45.3, 10.6],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // LEGUMINOSAS Y PROTEÍNAS 
    "frijoles negros": [341, 21.6, 62.4, 1.4, 15.5],
    "frijoles bayos": [347, 21.4, 63.3, 1.2, 15.0],
    "soja texturizada": [345, 52.0, 30.0, 1.0, 15.0],
    "carne molida de res": [250, 26.0, 0.0, 15.0, 0.0],
    "jamón de pavo": [105, 17.0, 3.0, 2.5, 0.0],
    "jamón de pierna": [160, 18.0, 1.0, 9.0, 0.0],
    "tocino": [541, 37.0, 1.4, 42.0, 0.0],
    "chorizo": [455, 24.0, 2.0, 38.0, 0.0],
    "garbanzo": [364, 19.3, 60.6, 6.0, 17.4],
    "lentejas": [353, 25.8, 60.1, 1.1, 30.5],
    "atún de sobre": [116, 26.0, 0.0, 0.8, 0.0],
    "atún natural": [116, 26.0, 0.0, 0.8, 0.0],
    "pescado": [100, 20.0, 0.0, 2.0, 0.0],
    "marlin": [110, 24.3, 0.0, 1.4, 0.0],
    "bistec de res": [162, 25.0, 0.0, 6.0, 0.0],
    "carne asada": [220, 26.0, 0.0, 12.0, 0.0],
    "camarón": [99, 24.0, 0.2, 0.3, 0.0],
    "chuleta de cerdo": [220, 20.0, 0.0, 15.0, 0.0],
    "huevo": [143, 12.6, 0.7, 9.5, 0.0],
    "clara de huevo": [52, 10.9, 0.7, 0.2, 0.0],
    "pechuga de pollo sin piel": [165, 31.0, 0.0, 3.6, 0.0],
    "pollo asado": [167, 25.0, 0.0, 7.5, 0.0],
    "muslo de pollo sin piel": [177, 24.0, 0.0, 8.5, 0.0],
    "queso fresco": [230, 17.0, 3.0, 16.0, 0.0],
    "queso oaxaca": [295, 23.5, 1.5, 22.0, 0.0],
    "queso panela": [240, 18.0, 3.5, 17.5, 0.0],
    "salmón": [208, 20.0, 0.0, 13.0, 0.0],
    "rib eye": [290, 24.0, 0.0, 22.0, 0.0],
    "chicharron": [510, 64, 0, 28, 0],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // LÁCTEOS Y BEBIDAS
    "leche entera": [61, 3.2, 4.8, 3.3, 0.0],
    "leche descremada": [34, 3.4, 5.0, 0.1, 0.0],
    "leche deslactosada": [61, 3.2, 4.8, 3.3, 0.0],
    "leche light": [42, 3.4, 5.0, 0.9, 0.0],
    "leche semi descremada": [49, 3.3, 4.9, 1.8, 0.0],
    "leche de almendra": [13, 0.4, 0.1, 1.1, 0.2],
    "leche lala 100": [53, 5.4, 3.4, 2, 0],
    "yogurt natural": [63, 3.5, 5.0, 3.3, 0.0],
    "yogurt griego": [59, 10.0, 3.6, 0.4, 0.0],
    "café negro": [2, 0.1, 0.0, 0.0, 0.0],
    "tés calientes": [1, 0.0, 0.2, 0.0, 0.0],
    "cerveza": [43, 0.5, 3.6, 0.0, 0.0],
    "refresco de cola": [42, 0.0, 10.6, 0.0, 0.0],
    "salsa cátsup": [97, 1.3, 23.0, 0.1, 0.3],
    "miel de abeja": [304, 0.3, 82.4, 0.0, 0.0],
    "gelatina light": [7, 1.6, 0.0, 0.0, 0.0],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // CHUCHERIAS
    "crossantin": [423, 4.8, 43.5, 25.5, 1.77],
    "monster blanco": [4.28, 0.0, 0.9, 0.0, 0.0],
    /*"monster low carbs": [3, 0.0, 1.0, 0.0, 0.0],
    "monster normal": [42, 0.0, 11.0, 0.0, 0.0],
    "monster strawberry dream": [2, 0.0, 0.8, 0.0, 0.0],
    "monster negro zero": [3, 0.0, 1.0, 0.0, 0.0],*/
    "coca cola": [30, 0.0, 7.5, 0.0, 0.0],
    "cafe ole normal": [76, 2.7, 10.4, 2.6, 0.0],
    "doritos nacho": [510, 7.0, 59.0, 26.0, 4.0],
    "chetos bolita": [530, 6.0, 58.0, 31.0, 1.5],
    "doraditas tia rosa": [515, 6.5, 60.0, 27.5, 3.5],
    "empanada julita": [380, 5.5, 52.0, 16.5, 1.8],
    "qé galletas chispas de chocolate": [490, 5.0, 64.0, 23.0, 2.0],

};

const MEALS = [
    { id: "desayuno", label: "Desayuno", icon: "img/naranja.png" },
    { id: "colacion1", label: "Colación", icon: "img/verde.png" },
    { id: "comida", label: "Comida", icon: "img/rojo.png" },
    { id: "colacion2", label: "Colación", icon: "img/verde.png" },
    { id: "cena", label: "Cena", icon: "img/azul.png" },
];

function loadUserDB() {
    try {
        const saved = localStorage.getItem("userDB");
        if (saved) Object.assign(DB, JSON.parse(saved));
    } catch { }
}

function saveToUserDB(name, values) {
    DB[name] = values;
    try {
        const saved = JSON.parse(localStorage.getItem("userDB") || "{}");
        saved[name] = values;
        localStorage.setItem("userDB", JSON.stringify(saved));
    } catch { }
}

function deleteFromUserDB(name) {
    delete DB[name];
    try {
        const saved = JSON.parse(localStorage.getItem("userDB") || "{}");
        delete saved[name];
        localStorage.setItem("userDB", JSON.stringify(saved));
    } catch { }
}