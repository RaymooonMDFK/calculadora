// ─────────────────────────────────────────────
//  BASE DE DATOS — valores por 100g
//  formato: [kcal, proteína, carbohidratos, grasas, fibra]
// ─────────────────────────────────────────────
const DB = {
    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // VERDURAS 
    "aguacate": [160, 2.0, 8.5, 14.7, 6.7, null],
    "ajo": [149, 6.4, 33.1, 0.5, 2.1, null],
    "papa cocida": [87, 1.9, 20.1, 0.1, 1.8, null],
    "camote": [86, 1.6, 20.1, 0.1, 3.0, null],
    "betabel": [43, 1.6, 9.6, 0.2, 2.8, null],
    "elotes": [106, 3.4, 21.0, 1.2, 2.7, null],
    "espárragos": [20, 2.2, 3.4, 0.1, 2.1, null],
    "espinaca": [23, 2.9, 3.6, 0.4, 2.2, null],
    "jícama": [38, 0.7, 8.8, 0.1, 4.9, null],
    "tomate": [18, 0.9, 3.9, 0.2, 1.2, null],
    "lechuga": [15, 1.4, 2.9, 0.2, 1.3, null],
    "nopal": [16, 1.4, 3.3, 0.1, 2.2, null],
    "pepino": [15, 0.7, 3.6, 0.1, 0.5, null],
    "pimiento": [26, 1.0, 6.0, 0.3, 2.1, null],
    "tomatillo": [32, 1.0, 5.8, 1.0, 1.9, null],
    "zanahoria": [41, 0.9, 9.6, 0.2, 2.8, null],
    "brocoli": [34, 2.8, 6.6, 0.4, 2.6, null],
    "calabaza": [17, 1.2, 3.4, 0.2, 1.1, null],
    "cebolla": [40, 1.1, 9.3, 0.1, 1.7, null],
    "champiñon": [22, 3.1, 3.3, 0.3, 1.0, null],
    "chile jalapeño": [29, 0.9, 6.5, 0.4, 2.8, null],
    "chayote": [19, 0.8, 4.5, 0.1, 1.7, null],
    "chile serrano": [32, 1.7, 7.0, 0.4, 2.8, null],
    "chile poblano": [20, 0.9, 4.7, 0.2, 1.8, null],
    "coliflor": [25, 1.9, 5.0, 0.3, 2.0, null],
    "ejotes": [31, 1.8, 7.0, 0.2, 2.7, null],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // FRUTAS 
    "toronja": [42, 0.8, 10.7, 0.1, 1.6, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "tuna": [41, 0.7, 9.6, 0.5, 3.6, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "mamey": [124, 1.5, 32.1, 0.5, 3.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "ciruela": [46, 0.7, 11.4, 0.3, 1.4, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "coco tierno": [354, 3.3, 15.2, 33.5, 9.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "agua de coco": [19, 0.7, 3.7, 0.2, 1.1, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "arándanos": [46, 0.4, 12.2, 0.1, 4.6, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "blueberry": [57, 0.7, 14.5, 0.3, 2.4, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "durazno": [39, 0.9, 9.5, 0.3, 1.5, { cantidad: 1, unidad: "pieza", gramos: 140 }],
    "frambuesa": [52, 1.2, 11.9, 0.7, 6.5, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "fresa": [32, 0.7, 7.7, 0.3, 2.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "guayaba": [68, 2.6, 14.3, 1.0, 5.4, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "mango": [60, 0.8, 15.0, 0.4, 1.6, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "naranja": [47, 0.9, 11.8, 0.1, 2.4, { cantidad: 1, unidad: "pieza", gramos: 200 }],
    "papaya": [43, 0.5, 10.8, 0.3, 1.7, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "piña": [50, 0.5, 13.1, 0.1, 1.4, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "mandarina": [53, 0.8, 13.3, 0.3, 1.8, { cantidad: 1, unidad: "pieza", gramos: 100 }],
    "limón": [29, 1.1, 9.3, 0.3, 2.8, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "kiwi": [61, 1.1, 14.7, 0.5, 3.0, { cantidad: 1, unidad: "pieza", gramos: 80 }],
    "lichis": [66, 0.8, 16.5, 0.4, 1.3, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "manzana roja": [52, 0.3, 13.8, 0.2, 2.4, { cantidad: 1, unidad: "pieza", gramos: 170 }],
    "manzana verde": [52, 0.3, 13.8, 0.2, 2.8, { cantidad: 1, unidad: "pieza", gramos: 170 }],
    "melón": [34, 0.8, 8.2, 0.2, 0.9, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "pera": [57, 0.4, 15.2, 0.1, 3.1, { cantidad: 1, unidad: "pieza", gramos: 150 }],
    "plátano": [89, 1.1, 22.8, 0.3, 2.6, { cantidad: 1, unidad: "pieza", gramos: 80 }],
    "pasas": [299, 3.1, 79.2, 0.5, 3.7, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "sandía": [30, 0.6, 7.6, 0.2, 0.4, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "uva morada con semillas": [69, 0.7, 18.1, 0.2, 0.9, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "uva morada sin semilla": [67, 0.6, 17.2, 0.4, 0.9, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "uva verde con semilla": [69, 0.7, 18.1, 0.2, 0.9, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "uva verde sin semilla": [67, 0.6, 17.2, 0.4, 0.9, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "frutos rojos": [50, 1.0, 12.0, 0.3, 4.5, { cantidad: 1, unidad: "taza", gramos: 250 }],
    

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // CEREALES Y SNACKS 
    "pan integral bimbo": [259, 11.1, 46.5, 3.2, 6.0, { cantidad: 1, unidad: "rebanada", gramos: 30 }],
    "pan blanco bimbo": [244, 7.1, 48.6, 2.4, 1.7, { cantidad: 1, unidad: "rebanada", gramos: 30 }],
    "pan cero bimbo": [218, 15, 36.2, 1.5, 5.8, { cantidad: 1, unidad: "rebanada", gramos: 30 }],
    "quinoa cruda": [368, 14.1, 64.2, 6.1, 7.0, null],
    "palomitas naturales": [387, 12.9, 77.8, 4.5, 14.5, null],
    "teleras": [274, 9.0, 53.0, 3.0, 2.2, null],
    "arroz blanco crudo": [360, 6.6, 79.0, 0.6, 1.3, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "arroz integral crudo": [370, 7.9, 77.2, 2.9, 3.5, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "avena cruda": [389, 16.9, 66.3, 6.9, 10.6, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "bolillo comercial": [277, 9.5, 54.0, 1.5, 2.4, { cantidad: 1, unidad: "pieza", gramos: 60 }],
    "papa": [77, 2.0, 17.5, 0.1, 2.2, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "corn flakes": [357, 7.1, 82.1, 0.4, 3.3, { cantidad: 1, unidad: "porcion", gramos: 30 }],
    "spaghetti crudo": [371, 13.0, 74.7, 1.5, 3.2, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "galletas María": [430, 7.0, 78.0, 10.0, 2.0, { cantidad: 1, unidad: "pieza", gramos: 6 }],
    "granola": [471, 10.0, 64.0, 20.0, 5.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "little caesar": [280, 12, 31, 11, 1, { cantidad: 1, unidad: "rebanada", gramos: 120 }],
    "chia": [486, 16.5, 42.1, 30.7, 34.4, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "tortilla de maíz": [218, 5.7, 45.0, 2.8, 6.0, { cantidad: 1, unidad: "pieza", gramos: 25 }],
    "tortilla de harina": [310, 8.0, 50.0, 9.0, 2.0, { cantidad: 1, unidad: "pieza", gramos: 30 }],
    "tortilla de nopal": [150, 4.0, 30.0, 1.5, 10.0, { cantidad: 1, unidad: "pieza", gramos: 30 }],
    "tostadas sanissimo": [380, 10.5, 85.0, 1.0, 3.0, { cantidad: 1, unidad: "pieza", gramos: 30 }],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // GRASAS Y SEMILLAS 
    "almendras": [579, 21.2, 21.7, 49.9, 12.5, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "cacahuates": [567, 25.8, 16.1, 49.2, 8.5, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "nuez pecana": [691, 9.2, 13.9, 72.0, 9.6, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "mantequilla de maní": [588, 25.0, 20.0, 50.0, 6.0, { cantidad: 1, unidad: "cucharada", gramos: 15 }],
    "aceite de oliva": [884, 0.0, 0.0, 100.0, 0.0, { cantidad: 1, unidad: "cucharada", gramos: 15 }],
    "mayonesa": [680, 1.0, 1.0, 75.0, 0.0, { cantidad: 1, unidad: "cucharada", gramos: 15 }],
    "nueces": [654, 15.2, 13.7, 65.2, 6.7, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "pistaches": [562, 20.2, 27.2, 45.3, 10.6, { cantidad: 1, unidad: "taza", gramos: 250 }],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // LEGUMINOSAS Y PROTEÍNAS 
    "frijoles negros": [341, 21.6, 62.4, 1.4, 15.5, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "frijoles bayos": [347, 21.4, 63.3, 1.2, 15.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "soja texturizada": [345, 52.0, 30.0, 1.0, 15.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "carne molida de res": [250, 26.0, 0.0, 15.0, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "jamón de pavo FUD": [100, 12.5, 1.4, 0.4, 0.0, { cantidad: 1, unidad: "rebanada", gramos: 20.8 }],
    "tocino": [541, 37.0, 1.4, 42.0, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "chorizo de soya": [347, 14.8, 5.9, 29.0, 7.3, { cantidad: 1, unidad: "porcion", gramos: 30 }],
    "garbanzo": [364, 19.3, 60.6, 6.0, 17.4, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "lentejas": [353, 25.8, 60.1, 1.1, 30.5, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "mazatun en agua de sobre": [109, 23.68, 2.6, 0.45, 0.58, { cantidad: 1, unidad: "sobre", gramos: 75 }],
    "atún natural": [116, 26.0, 0.0, 0.8, 0.0, null],
    "pescado": [100, 20.0, 0.0, 2.0, 0.0, null],
    "marlin": [110, 24.3, 0.0, 1.4, 0.0, null],
    "bistec de res": [162, 25.0, 0.0, 6.0, 0.0, null],
    "carne asada": [220, 26.0, 0.0, 12.0, 0.0, null],
    "camarón": [99, 24.0, 0.2, 0.3, 0.0, null],
    "chuleta de cerdo": [220, 20.0, 0.0, 15.0, 0.0, null],
    "huevo": [143, 12.6, 0.7, 9.5, 0.0, { cantidad: 1, unidad: "pieza", gramos: 50 }],
    "clara de huevo": [52, 10.9, 0.7, 0.2, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "pechuga de pollo sin piel": [165, 31.0, 0.0, 3.6, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "pollo asado": [167, 25.0, 0.0, 7.5, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "muslo de pollo sin piel": [177, 24.0, 0.0, 8.5, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "queso fresco": [230, 17.0, 3.0, 16.0, 0.0, { cantidad: 1, unidad: "porcion", gramos: 100 }],
    "queso oaxaca": [295, 23.5, 1.5, 22.0, 0.0, { cantidad: 1, unidad: "porcion", gramos: 100 }],
    "queso panela": [240, 18.0, 3.5, 17.5, 0.0, { cantidad: 1, unidad: "porcion", gramos: 100 }],
    "salmón": [208, 20.0, 0.0, 13.0, 0.0, null],
    "rib eye": [290, 24.0, 0.0, 22.0, 0.0, null],
    "chicharron piel de cerdo": [510, 64, 0, 28, 0, null],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // LÁCTEOS Y BEBIDAS
    "leche entera": [61, 3.2, 4.8, 3.3, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "leche descremada": [34, 3.4, 5.0, 0.1, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "leche deslactosada": [61, 3.2, 4.8, 3.3, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "leche light": [42, 3.4, 5.0, 0.9, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "leche semi descremada": [49, 3.3, 4.9, 1.8, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "leche de almendra": [13, 0.4, 0.1, 1.1, 0.2, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "leche lala 100": [53, 5.4, 3.4, 2, 0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "yogurt natural": [63, 3.5, 5.0, 3.3, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "yogurt griego": [59, 10.0, 3.6, 0.4, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "café negro": [2, 0.1, 0.0, 0.0, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "tés calientes": [1, 0.0, 0.2, 0.0, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],
    "cerveza": [43, 0.5, 3.6, 0.0, 0.0, { cantidad: 1, unidad: "taza", gramos: 250 }],

    //  formato: [kcal, proteína, carbohidratos, grasas, fibra]
    // CHUCHERIAS
    "crossantin": [423, 4.8, 43.5, 25.5, 1.77, { cantidad: 1, unidad: "pieza", gramos: 32 }],
    "monster blanco": [4.28, 0.0, 0.9, 0.0, 0.0, { cantidad: 1, unidad: "lata", gramos: 443 }],
    "monster low carbs": [3, 0.0, 1.0, 0.0, 0.0, { cantidad: 1, unidad: "lata", gramos: 443 }],
    "monster normal": [42, 0.0, 11.0, 0.0, 0.0, { cantidad: 1, unidad: "lata", gramos: 443 }],
    "monster strawberry dream": [2, 0.0, 0.8, 0.0, 0.0, { cantidad: 1, unidad: "lata", gramos: 443 }],
    "monster negro zero": [3, 0.0, 1.0, 0.0, 0.0, { cantidad: 1, unidad: "lata", gramos: 443 }],
    "coca cola": [30, 0.0, 7.5, 0.0, 0.0, { cantidad: 1, unidad: "lata", gramos: 355 }],
    "cafe ole normal": [76, 2.7, 10.4, 2.6, 0.0, { cantidad: 1, unidad: "lata", gramos: 281 }],
    "doritos nacho": [510, 7.0, 59.0, 26.0, 4.0, { cantidad: 1, unidad: "bolsa", gramos: 61 }],
    "chetos bolita": [530, 6.0, 58.0, 31.0, 1.5, { cantidad: 1, unidad: "bolsa", gramos: 46 }],
    "doraditas tia rosa": [515, 6.5, 60.0, 27.5, 3.5, { cantidad: 1, unidad: "bolsa", gramos: 110 }],
    "empanada julita": [380, 5.5, 52.0, 16.5, 1.8, { cantidad: 1, unidad: "pieza", gramos: 40 }],
    "qé galletas chispas de chocolate": [469, 4, 64.2, 21.8, 2.5, { cantidad: 1, unidad: "bolsa", gramos: 81 }],
    "salsa cátsup": [97, 1.3, 23.0, 0.1, 0.3, null],
    "miel de abeja": [304, 0.3, 82.4, 0.0, 0.0, null],
    "gelatina light": [7, 1.6, 0.0, 0.0, 0.0, null],
    "cacahuates japoneses oxxo": [562, 22.2, 6.6, 49.7, 7.3, {cantidad: 1, unidad: "porcion", gramos: 30}],

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