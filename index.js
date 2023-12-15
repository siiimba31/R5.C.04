//Fonction permettant de convertir en euro un salaire
function convertEnEuro (type,value) {
    //valeur du 20/11/2023 (2022)
    dict = {
        "AED United Arab Emirates dirham": 0.25,
        "AFN\tAfghan afghani": 0.013,
        "ALL\tAlbanian lek": 0.0096,
        "AMD\tArmenian dram": 0.0023,
        "ANG Netherlands Antillean guilder": 0.51,
        "ARS\tArgentine peso": 0.0026,
        "AUD\tAustralian dollar": 0.60,
        "AWG\tAruban florin": 0.51,
        "AZN\tAzerbaijan manat": 0.54,
        "BAM\tBosnia and Herzegovina convertible mark": 0.51,
        "BGN Bulgarian lev": 0.51,
        "BIF\tBurundi franc": 0.00032,
        "BOB Bolivian boliviano": 0.13,
        "BRL\tBrazilian real": 0.19,
        "CAD\tCanadian dollar": 0.67,
        "CHF\tSwiss franc": 1.03,
        "CLP\tChilean peso": 0.0010,
        "CNY Chinese Yuan Renminbi": 0.13,
        "COP\tColombian peso": 0.00023,
        "CRC Costa Rican colon": 0.0017,
        "CUP\tCuban peso": 0.038,
        "CDF\tCongolese franc": 0.00037,
        "DJF\tDjiboutian franc": 0.0052,
        "EUR European Euro": 1,
        "FJD\tFijian dollar": 0.41,
        "FKP\tFalkland Islands pound": 1.141,
        "GBP\tPound sterling": 1.14,
        "GHS\tGhanaian cedi": 0.077,
        "GIP\tGibraltar pound": 1.14240,
        "HKD Hong Kong dollar": 0.12,
        "HUF\tHungarian forint": 0.0026,
        "IDR\tIndonesian rupiah": 0.00006,
        "ILS Israeli new shekel": 0.25,
        "INR Indian rupee": 0.011,
        "IRR\tIranian rial": 0.000022,
        "JPY Japanese yen": 0.0062,
        "LAK\tLao kip": 0.000044,
        "MYR Malaysian ringgit": 0.20,
        "NOK\tNorwegian krone": 0.085,
        "NZD New Zealand dollar": 0.55,
        "PEN\tPeruvian sol": 0.24,
        "PLN\tPolish zloty": 0.23,
        "QAR\tQatari riyal": 0.25,
        "SAR Saudi Arabian riyal": 0.24,
        "SLL\tSierra Leonean leone": 0.000046,
        "THB\tThai baht": 0.026,
        "TWD\tNew Taiwan dollar": 0.029,
        "UAH\tUkrainian hryvnia": 0.025,
        "UGX Ugandan shilling": 0.00024,
        "USD\tUnited States dollar": 0.91,
        "UZS Uzbekistani som": 0.000075,
        "XPF\tCFP franc": 0.0083,
        "YER\tYemeni rial": 0.0037,
        "ZAR\tSouth African rand": 0.050,
        "ZMW Zambian kwacha": 0.040
    };
    euro=dict[type]*Number(value);
    return euro;
}

//FONCTION RECUPERATION DE DONNEES DU JSON DATA

//Récupère toutes les pays présents dans le json data
function getCountry (jsonData) {
    let countries=[]
    for (let i = 0; i < jsonData.length; i++){
        if (!countries.includes(jsonData[i]["Country"])){
            countries.push(jsonData[i]["Country"])
        }
    } 
    return countries
}

//Récupère toute les types de monnaies du json data
function getCurrency (jsonData) {
    let currency=[]
    for (let i = 0; i < jsonData.length; i++){
        if (!currency.includes(jsonData[i]["Currency"])){
            currency.push(jsonData[i]["Currency"])
        }
    } 
    return currency
}

//Récupère toutes les années d'expérience présente dans le json data
function getWorkExp(jsonData){
    let workExps=[];
    for (let i = 0; i < jsonData.length; i++){
        if (!workExps.includes(Number(jsonData[i]["WorkExp"])) && jsonData[i]["WorkExp"]!='NA'){
            workExps.push(Number(jsonData[i]["WorkExp"]))
        }
    }
    return workExps;
}

//récupère tous les niveau d'études présent dans le json data
function getEdLevel(jsonData){
    let edLevel=[];
    for (let i = 0; i < jsonData.length; i++){
        if (!edLevel.includes((jsonData[i]["EdLevel"])) && jsonData[i]["EdLevel"]!='NA'){
            edLevel.push(jsonData[i]["EdLevel"])
        }
    }
    return edLevel;
}

//récupère tous les metiers présent dans le json data
function getDevType(jsonData){
    let devType=[];
    for (let i = 0; i < jsonData.length; i++){
        if (!devType.includes((jsonData[i]["DevType"])) 
                && jsonData[i]["DevType"]!='NA' 
                && jsonData[i]["DevType"]!='Other (please specify):'){
            devType.push(jsonData[i]["DevType"])
        }
    }
    devType.sort();
    return devType;
}

function getOpSys(jsondata) {
    var opSysValues = [];
    for (var i = 0; i < jsondata.length; i++) {
      if (jsondata[i]["OpSysProfessionaluse"]) {
        var values = jsondata[i]["OpSysProfessionaluse"].split(';');
        values.forEach(function(value) {
          if (!opSysValues.includes(value.trim())) {
            opSysValues.push(value.trim());
          }
        });
      }
    }
    return opSysValues;
  }

  function getToolComm(jsondata) {
    var toolCommValues = [];
    for (var i = 0; i < jsondata.length; i++) {
      if (jsondata[i]["OfficeStackSyncHaveWorkedWith"]) {
        var values = jsondata[i]["OfficeStackSyncHaveWorkedWith"].split(';');
        values.forEach(function(value) {
          if (!toolCommValues.includes(value.trim())) {
            toolCommValues.push(value.trim());
          }
        });
      }
    }
    return toolCommValues;
  }


//Récupère les données correspondant au pays "country" du json data
function getDataCountry (country,jsonData) {
    let data=[];
    for (let i = 0; i < jsonData.length; i++){
        if (jsonData[i]["Country"] === country){
            data.push(jsonData[i]);
        }
    }
    return data;
}



//FONCTION POUR LE PREMIER GRAPHES
//renvoie le salaire moyen par année d'expérience 
function calculMoyenneSalaireParAnneeExp(jsonData,workExps){
    let dict={};
    let compteur={};
    for (let i = 0; i < workExps.length; i++) {
        dict[workExps[i]]=0;
        compteur[workExps[i]]=0;
    }
    //somme des salaire
    for (let j = 0; j < jsonData.length; j++){
        if (workExps.includes(Number(jsonData[j]["WorkExp"])) && jsonData[j]["CompTotal"]!='NA'){
            valeurConverti=convertEnEuro(jsonData[j]["Currency"],jsonData[j]["CompTotal"]);
            dict[Number(jsonData[j]["WorkExp"])]+=valeurConverti;
            compteur[Number(jsonData[j]["WorkExp"])]+=1;
        }
    }
    //diviser pour optenir la moyenne
    for (let k = 0; k < Object.keys(dict).length; k++){
        dict[workExps[k]]=dict[workExps[k]]/compteur[workExps[k]];
    }

    return dict;
}

//mise en forme des données pour le chart
function salaireMoyenParAnneeExp (country,jsonData) {
    datas = getDataCountry(country,jsonData);
    workExps = getWorkExp(jsonData);
    moyennesSalaires = calculMoyenneSalaireParAnneeExp(datas,workExps);
    workExps=workExps.sort(function(a, b) {
        return a - b;
      });
    values=[];
    for (let i = 0; i < workExps.length; i++){
        values.push(moyennesSalaires[workExps[i]]);
    }
    return {"tableauAnnees":workExps,"tableauSalaires":values};
}

//mise a jour du chart en fonction de la country
function updateCountryRMAE (chart,jsonData,country) {
    chart.data.datasets=[{
            label:'Moyenne des salaires par années d\'expérience pour :'+country,
            data:salaireMoyenParAnneeExp(country,jsonData)["tableauSalaires"]
        }]
    chart.update();
}

//créer le selecteur de country
function createCountriesDropDownRMAE(divSelector,countries,myChart,jsonData){
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }

    let dropDown = document.createElement("select")
    for (let country of countries){
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);
    dropDown.addEventListener("change", (event) => {
        country=dropDown.options[dropDown.selectedIndex].value
        updateCountryRMAE(myChart,jsonData,country);
    });
}

//renvoie la configuration du chart pour le créer 
function loadChartRMAE(years,values,country){
    const data = {
        labels: years,
        datasets:[{
            label:'Moyenne des salaires par années d\'expérience pour : '+country,
            data:values
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    }
    return config;
}

//FONCTION POUR LE DEUXIEME GRAPHE
//rencoie le salaire moyen par niveau d'expérience
function calculMoyenneSalaireParNiveauEtude(jsonData,edLevel){
    let dict={};
    let compteur={};
    for (let i = 0; i < edLevel.length; i++) {
        dict[edLevel[i]]=0;
        compteur[edLevel[i]]=0;
    }
    //somme des salaire
    for (let j = 0; j < jsonData.length; j++){
        if (edLevel.includes(jsonData[j]["EdLevel"]) && jsonData[j]["CompTotal"]!='NA'){
            valeurConverti=convertEnEuro(jsonData[j]["Currency"],jsonData[j]["CompTotal"]);
            dict[jsonData[j]["EdLevel"]]+=valeurConverti;
            compteur[jsonData[j]["EdLevel"]]+=1;
        }
    }
    //diviser pour optenir la moyenne
    for (let k = 0; k < Object.keys(dict).length; k++){
        dict[edLevel[k]]=dict[edLevel[k]]/compteur[edLevel[k]];
    }
    return dict;
}

//mise ne forme des données pour le chart
function salaireMoyenParNiveauEtude (country,jsonData) {
    datas = getDataCountry(country,jsonData);
    edLevel = getEdLevel(jsonData);
    moyennesSalaires = calculMoyenneSalaireParNiveauEtude(datas,edLevel);
    values=[];
    for (let i = 0; i < edLevel.length; i++){
        values.push(moyennesSalaires[edLevel[i]]);
    }
    return {"tableauNiveau":edLevel,"tableauSalaires":values};
}

//mise a jour du chart en fonction de la country
function updateCountryRMNE (chart,jsonData,country) {
    chart.data.datasets=[{
            label:'Moyenne des salaires par niveau d\'étude pour :'+country,
            data:salaireMoyenParAnneeExp(country,jsonData)["tableauSalaires"]
        }]
    chart.update();
}

//créer le selecteur de country
function createCountriesDropDownRMNE(divSelector,countries,myChart,jsonData){
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }

    let dropDown = document.createElement("select")
    for (let country of countries){
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);
    dropDown.addEventListener("change", (event) => {
        country=dropDown.options[dropDown.selectedIndex].value
        updateCountryRMNE(myChart,jsonData,country);
    });
}

//rencoie la configuration du chart pour le créer 
function loadChartRMNE(years,values,country){
    const data = {
        labels: years,
        datasets:[{
            label:'Moyenne des salaires par niveau d\'étude pour : '+country,
            data:values
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    }
    return config;
}

//FONCTION POUR LE GRAPH SUR LES SYSTEME D'EXP

//mise en forme des données pour le chart
function topSystExpParMetier (devType,jsonData,nbTop) {
    //compter chaque systeme d'exp
    let compteur={};
    let total=0;
    opSys = getOpSys(jsonData);
    for (let i = 0; i < opSys.length; i++) {
        compteur[opSys[i]]=0;
    }
    for (let i = 0; i < jsonData.length; i++) {
        if (devType.includes(jsonData[i]["DevType"])){
            var responsesArray = jsonData[i]["OpSysProfessionaluse"].split(';');
            for (let j = 0; j < responsesArray.length; j++) {
                compteur[responsesArray[j].trim()]+=1;
                total+=1;
            }
        }
    }
    
    let compteurArray = Object.entries(compteur).map(([key, value]) => ({ key, value }));
    compteurArray.sort((a, b) => b.value - a.value);

    let topSystems = compteurArray.slice(0, nbTop);

    let topLabels = topSystems.map((item, index) => `Top ${index + 1} : ${item.key}`);
    let topValues = topSystems.map(item => item.value/total);

    return {"tableauLabels":topLabels,"tableauValues":topValues};
}

//mise a jour du chart en fonction du metier
function updateMetierTUSE (chart,jsonData,metier,nbTop,colors) {
    chart.data = {
            labels: topSystExpParMetier(metier,jsonData,nbTop)["tableauLabels"],
            datasets:[{
                label:'Probabilité qu\'un \"'+metier+'\" l\'utilise ',
                data:topSystExpParMetier(metier,jsonData,nbTop)["tableauValues"],
                backgroundColor: colors
            }]
        }
    chart.update();
}

//créer les selecteurs TUSE
function createMetiersDropDownTUSE(divSelector,divNbTop,metiers,myChart,jsonData,nbTop,colors){
    // Selecteur métier
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }
    let dropDown = document.createElement("select")
    for (let metier of metiers){
        let option = document.createElement('option');
        option.value = metier;
        option.text = metier;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);

    // Selecteur nbTop
    var existingDropDown2 = divNbTop.querySelector("select");
    if (existingDropDown2) {
        divNbTop.removeChild(existingDropDown2);
    }
    let dropDown2 = document.createElement("select")
    for (let nbTop of [5,6,7,8]){
        let option = document.createElement('option');
        option.value = nbTop;
        option.text = nbTop;
        // On ajoute l'option au dropDown
        dropDown2.appendChild(option);
    }
    divNbTop.appendChild(dropDown2);

    dropDown.addEventListener("change", (event) => {
        metier=dropDown.options[dropDown.selectedIndex].value;
        nbTop=dropDown2.options[dropDown2.selectedIndex].value;
        updateMetierTUSE(myChart,jsonData,metier,nbTop,colors);
    });
    dropDown2.addEventListener("change", (event) => {
        metier=dropDown.options[dropDown.selectedIndex].value;
        nbTop=dropDown2.options[dropDown2.selectedIndex].value;
        updateMetierTUSE(myChart,jsonData,metier,nbTop,colors);
    });
}

//rencoie la configuration du chart pour le créer 
function loadChartTUSE(systExps,values,metier,colors){
    const data = {
        labels: systExps,
        datasets:[{
            label:'Probabilité qu\'un \"'+metier+'\" l\'utilise ',
            data:values,
            backgroundColor: colors
        }]
    }
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            rotation: -90, // Pour positionner le debut a l'horizontale gauche
            circumference: 180, // demi-cercle
            responsive: true, //adaptation à la taille du canva
            maintainAspectRatio: false,
        }
    };
    return config;
}

//FONCTION POUR LE GRAPH SUR LES Outils de comm

//mise en forme des données pour le chart
function topToolCommsParMetier (devType,jsonData,nbTop) {
    //compter chaque systeme d'exp
    let compteur={};
    let total=0;
    toolComm = getToolComm(jsonData);
    for (let i = 0; i < toolComm.length; i++) {
        compteur[toolComm[i]]=0;
    }
    for (let i = 0; i < jsonData.length; i++) {
        if (devType.includes(jsonData[i]["DevType"])){
            var responsesArray = jsonData[i]["OfficeStackSyncHaveWorkedWith"].split(';');
            for (let j = 0; j < responsesArray.length; j++) {
                compteur[responsesArray[j].trim()]+=1;
                total+=1;
            }
        }
    }
    let compteurArray = Object.entries(compteur).map(([key, value]) => ({ key, value }));
    compteurArray.sort((a, b) => b.value - a.value);

    let topToolComms = compteurArray.slice(0, nbTop);

    let topLabels = topToolComms.map((item, index) => `Top ${index + 1} : ${item.key}`);
    let topValues = topToolComms.map(item => item.value/total);

    return {"tableauLabels":topLabels,"tableauValues":topValues};
}

//mise a jour du chart en fonction du metier
function updateMetierTUOC (chart,jsonData,metier,nbTop,colors) {
    chart.data = {
        labels: topToolCommsParMetier(metier,jsonData,nbTop)["tableauLabels"],
        datasets:[{
            label:'Probabilité qu\'un \"'+metier+'\" l\'utilise ',
            data:topToolCommsParMetier(metier,jsonData,nbTop)["tableauValues"],
            backgroundColor: colors
        }]
    }
    chart.update();
}

//créer les selecteurs TUOC
function createMetiersDropDownTUOC(divSelector,divNbTop,metiers,myChart,jsonData,nbTop,colors){
    // Selecteur metier
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }
    let dropDown = document.createElement("select")
    for (let metier of metiers){
        let option = document.createElement('option');
        option.value = metier;
        option.text = metier;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);
    
    // Selecteur nbTop
    var existingDropDown2 = divNbTop.querySelector("select");
    if (existingDropDown2) {
        divNbTop.removeChild(existingDropDown2);
    }
    let dropDown2 = document.createElement("select")
    for (let nbTop of [5,6,7,8]){
        let option = document.createElement('option');
        option.value = nbTop;
        option.text = nbTop;
        // On ajoute l'option au dropDown
        dropDown2.appendChild(option);
    }
    divNbTop.appendChild(dropDown2);

    dropDown.addEventListener("change", (event) => {
        metier=dropDown.options[dropDown.selectedIndex].value;
        nbTop=dropDown2.options[dropDown2.selectedIndex].value;
        updateMetierTUOC(myChart,jsonData,metier,nbTop,colors);
    });
    dropDown2.addEventListener("change", (event) => {
        metier=dropDown.options[dropDown.selectedIndex].value;
        nbTop=dropDown2.options[dropDown2.selectedIndex].value;
        updateMetierTUOC(myChart,jsonData,metier,nbTop,colors);
    });
}

//rencoie la configuration du chart pour le créer 
function loadChartTUOC(toolComms,values,metier,colors){
    const data = {
        labels: toolComms,
        datasets:[{
            label:'Probabilité qu\'un \"'+metier+'\" l\'utilise ',
            data:values,
            backgroundColor: colors
        }]
    }
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            rotation: -90, // Pour positionner le debut a l'horizontale gauche
            circumference: 180, // demi-cercle
            responsive: true, //adaptation à la taille du canva
            maintainAspectRatio: false,
            /*animation: {
                animateRotate: false,
                animateScale: true
            }*/
        }
    };
    return config;
}

function execussionPage(request) {
    request.done(function(output){
        let dataString = JSON.stringify(output);
        let jsonData = JSON.parse(dataString);
        let countries = getCountry(jsonData);
        country=countries[0];
        //PREMIER CHART
        workExps=salaireMoyenParAnneeExp(country,jsonData)["tableauAnnees"];
        valuesRMAE=salaireMoyenParAnneeExp(country,jsonData)["tableauSalaires"];
        configRMAE=loadChartRMAE(workExps,valuesRMAE,country);

        var canvasRMAE = document.getElementById("ChartRMAE");
        if (canvasRMAE) {
            var ctx = canvasRMAE.getContext('2d');
            var existingChart = Chart.getChart(ctx);

            if (existingChart) {
                existingChart.destroy();
            }
            ChartRMAE = new Chart(ctx, configRMAE);
        }

        //Selecteur de pays
        const divSelector = document.getElementById("selectorRMAE"); 
        createCountriesDropDownRMAE(divSelector,countries,ChartRMAE,jsonData);
 

        //DEUXIEME CHART
        edLevel=salaireMoyenParNiveauEtude(country,jsonData)["tableauNiveau"];
        valuesRMNE=salaireMoyenParNiveauEtude(country,jsonData)["tableauSalaires"];
        configRMNE=loadChartRMNE(edLevel,valuesRMNE,country);

        var canvasRMNE = document.getElementById("ChartRMNE");
        if (canvasRMNE) {
            var ctx2 = canvasRMNE.getContext('2d');
            var existingChart2 = Chart.getChart(ctx2);

            if (existingChart2) {
                existingChart2.destroy();
            }
            ChartRMNE = new Chart(ctx2, configRMNE);
        }
        const divSelectorRMNE = document.getElementById("selectorRMNE"); 
        createCountriesDropDownRMNE(divSelectorRMNE,countries,ChartRMNE,jsonData);

        //Chart sur les tech utilisées
        let devTypes = getDevType(jsonData);
        let devType=devTypes[0];
        var colors = [
            'rgba(255, 51, 51, 0.7)',      // Rouge
            'rgba(255, 128, 51, 0.7)',     // Orange
            'rgba(255, 255, 102, 0.7)',    // Jaune
            'rgba(102, 153, 102, 0.7)',    // Vert
            'rgba(30,  144, 255, 0.7)',    // Cyan
            'rgba(102, 102, 204, 0.7)',    // Bleu
            'rgba(153, 102, 153, 0.7)',    // Violet
            'rgba(255, 77, 148, 0.7)'      // Rose
        ];

        //CHART SYSTEME D'EXP
        let nbTopTUSE=5;
        systExps=topSystExpParMetier(devType,jsonData,nbTopTUSE)["tableauLabels"];
        valuesTUSE=topSystExpParMetier(devType,jsonData,nbTopTUSE)["tableauValues"];
        configTUSE=loadChartTUSE(systExps,valuesTUSE,devType,colors);

        var canvasTUSE = document.getElementById("ChartTUSE");
        if (canvasTUSE) {
            var ctx5 = canvasTUSE.getContext('2d');
            var existingChart5 = Chart.getChart(ctx5);

            if (existingChart5) {
                existingChart5.destroy();
            }
            ChartTUSE = new Chart(ctx5, configTUSE);
        }

        const divSelectorTUSE = document.getElementById("selectorTUSE")
        const divNbTopTUSE = document.getElementById("nbTopTUSE")
        createMetiersDropDownTUSE(divSelectorTUSE,divNbTopTUSE,devTypes,ChartTUSE,
                                    jsonData,nbTopTUSE,colors);

        //CHART OUTILS COMM
        let nbTopTUOC=5;
        toolComms=topToolCommsParMetier(devType,jsonData,nbTopTUOC)["tableauLabels"];
        valuesTUOC=topToolCommsParMetier(devType,jsonData,nbTopTUOC)["tableauValues"];
        configTUOC=loadChartTUOC(toolComms,valuesTUOC,devType,colors);

        var canvasTUOC = document.getElementById("ChartTUOC");
        if (canvasTUOC) {
            var ctx6 = canvasTUOC.getContext('2d');
            var existingChart6 = Chart.getChart(ctx6);

            if (existingChart6) {
                existingChart6.destroy();
            }
            ChartTUOC = new Chart(ctx6, configTUOC);
        }

        const divSelectorTUOC = document.getElementById("selectorTUOC")
        const divNbTopTUOC = document.getElementById("nbTopTUOC")
        createMetiersDropDownTUOC(divSelectorTUOC,divNbTopTUOC,devTypes,ChartTUOC,
                                    jsonData,nbTopTUOC,colors);
    })
}

// Fonction de chargement du bon JSON choisi
function chargerJSON() {
    var selectElement = document.getElementById("selectRegion");
    var selectedValue = selectElement.value;
    var cheminFichierJSON = "jeuDeDonnees/survey_results_"+ selectedValue + ".json";

    let request= $.ajax({
        type: "GET",
        url: cheminFichierJSON
    })

    execussionPage(request)
}

// Premier chargement de page
$(document).ready(function () {
    var selectElement = document.getElementById("selectRegion");
    var selectedValue = selectElement.value;
    var cheminFichierJSON = "jeuDeDonnees/survey_results_"+ selectedValue + ".json";

    let request= $.ajax({
        type: "GET",
        url: cheminFichierJSON
    })

    execussionPage(request)
})