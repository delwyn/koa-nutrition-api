'use strict';

var fs   = require('fs');
var csv  = require('ya-csv');
var file = __dirname + '/foods.csv';
var db   = require('../app/db');

var foodsCollection = db.get('foods');

var reader = csv.createCsvFileReader(file, {
  columnsFromHeader: true,
  separator: ',',
  quote: '"',
  escape: '"',
  comment: ''
});

function float(value) {
  return parseFloat(value) || 0;
}

reader.addListener('data', function(data) {
  var name = data.Shrt_Desc;

  // Carbs
  var totalCarbs = float(data.Carbohydrt);
  var fibre      = float(data.Fiber_TD);
  var sugar      = float(data.Sugar_Tot);
  var carbs      = totalCarbs - fibre;

  // Fat
  var totalFat = float(data.Lipid_Tot);
  var mufa     = float(data.FA_Mono);
  var pufa     = float(data.FA_Poly);
  var sfa      = float(data.FA_Sat);
  var chol     = float(data.Cholestrl);
  // Trans fats ???

  var food = {
    id: data.NDB_No,
    name: name,

    totalCarbs: totalCarbs,
    fibre: fibre,
    sugar: sugar,
    carbs: carbs,

    totalFat: totalFat,
    mufa: mufa,
    pufa: pufa,
    sfa: sfa,
    chol: chol,

    protein: float(data.Protein),

    sodium: float(data.Sodium),
    potassium: float(data.Potassium),

    water: float(data.Water),
    kcal: float(data.Energ_Kcal),
    ash: float(data.Ash),
    calcium: float(data.Calcium),
    iron: float(data.Iron),
    magnesium: float(data.Magnesium),
    phosphorus: float(data.Phosphorus),
    zinc: float(data.Zinc),
    copper: float(data.Copper),
    manganese: float(data.Manganese),
    selenium: float(data.Selenium),
    vitaminC: float(data.Vit_C),
    thiamin: float(data.Thiamin),
    riboflavin: float(data.Riboflavin),
    niacin: float(data.Niacin),
    pantoAcid: float(data.Panto_Acid),
    vitaminB6: float(data.Vit_B6),
    totalFolate: float(data.Folate_Tot),
    folicAcid: float(data.Folic_Acid),
    foodFolate: float(data.Food_Folate),
    folateDFE: float(data.Folate_DFE),
    totalCholine: float(data.Choline_Tot),
    vitaminB12: float(data.Vit_B12),
    vitaminAIU: float(data.Vit_A_IU),
    vitaminARAE: float(data.Vit_A_RAE),
    retinol: float(data.Retinol),
    alphaCarot: float(data.Alpha_Carot),
    betaCarot: float(data.Beta_Carot),
    betaCrypt: float(data.Beta_Crypt),
    Lycopene: float(data.Lycopene),
    lutZea: float(data['Lut+Zea']),
    vitaminE: float(data.Vit_E),
    vitaminDMGC: float(data.Vit_D_mcg),
    vitaminDIU: float(data.ViVit_D_IU),
    vitaminK: float(data.Vit_K),
  };

  foodsCollection.insert(food, function (err, doc) {
    if (err) throw err;
  });
});
