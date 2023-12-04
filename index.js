/* Calculer et afficher via la chart de votre choix le revenu moyen d’un professionnel en
fonction de son nombre d’années d’expérience. L’utilisateur pourra choisir un
continent, un pays, et la valeur des revenus moyens devra toujours être affichée en
euros.*/

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

//Récupère les donneé correspondant au pays "country" du json data
function getDataCountry (country,jsonData) {
    let data=[];
    for (let i = 0; i < jsonData.length; i++){
        if (jsonData[i]["Country"] === country){
            data.push(jsonData[i]);
        }
    }
    return data;
}

//Fonction permettant de convertir en euro un salaire
//type correspond a la monnaie correspondnat au salaire
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
    euro=dict[type]*Number(value)
    return euro;
}

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
    for (let k = 0; k < dict.length; k++){
        dict[workExps[k]]=dict[workExps[k]]/compteur[workExps[k]];
        //console.log(dict[workExps[k]]);
    }

    return dict;
}

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
        if (edLevel.includes(jsonData[j]["WorkExp"]) && jsonData[j]["CompTotal"]!='NA'){
            valeurConverti=convertEnEuro(jsonData[j]["Currency"],jsonData[j]["CompTotal"]);
            dict[jsonData[j]["WorkExp"]]+=valeurConverti;
            compteur[jsonData[j]["WorkExp"]]+=1;
        }
    }
    //diviser pour optenir la moyenne
    for (let k = 0; k < dict.length; k++){
        dict[edLevel[k]]=dict[edLevel[k]]/compteur[edLevel[k]];
        //console.log(dict[workExps[k]]);
    }

    return dict;
}

//mise ne forme des données pour le chart
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
function updateCountry (chart,jsonData,country) {
    chart.data.datasets=[{
            label:'Moyenne des salaires par années d\'expérience pour :'+country,
            data:salaireMoyenParAnneeExp(country,jsonData)["tableauSalaires"]
        }]
    chart.update();
}

//rencoie la configuration du chart pour le créer 
function loadChart(years,values,country){
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

//créer le selecteur de country
function createCountriesDropDown(divSelector,countries,myChart,jsonData){
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
        updateCountry(myChart,jsonData,country);
    });

}

function execussionPage(request) {
    request.done(function(output){
        let dataString = JSON.stringify(output);
        let jsonData = JSON.parse(dataString);
        let countries = getCountry(jsonData);
        country=countries[0];
        workExps=salaireMoyenParAnneeExp(country,jsonData)["tableauAnnees"];
        values=salaireMoyenParAnneeExp(country,jsonData)["tableauSalaires"];
        config=loadChart(workExps,values,country);

        var canvas = document.getElementById("ChartRMAE");
        if (canvas) {
            var ctx = canvas.getContext('2d');
            var existingChart = Chart.getChart(ctx);

            if (existingChart) {
                existingChart.destroy();
            }

            myChart = new Chart(ctx, config);
        }

        //var myChart = new Chart(canvas, config);

        //Selecteur de pays
        const divSelector = document.getElementById("selectorRMAE"); 
        createCountriesDropDown(divSelector,countries,myChart,jsonData);
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