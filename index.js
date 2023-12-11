/* Calculer et afficher via la chart de votre choix le revenu moyen d’un professionnel en
fonction de son nombre d’années d’expérience. L’utilisateur pourra choisir un
continent, un pays, et la valeur des revenus moyens devra toujours être affichée en
euros.*/

//Fonction permettant de convertir en euro un salaire
//type correspond a la monnaie correspondnat au salaire
function convertEnEuro(type, value) {
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
    euro = dict[type] * Number(value);
    return euro;
}

//FONCTION RECUPERATION DE DONNEES DU JSON DATA

//Récupère toutes les pays présents dans le json data
function getCountry(jsonData) {
    let countries = []
    for (let i = 0; i < jsonData.length; i++) {
        if (!countries.includes(jsonData[i]["Country"])) {
            countries.push(jsonData[i]["Country"])
        }
    }
    return countries
}

//Récupère toute les types de monnaies du json data
function getCurrency(jsonData) {
    let currency = []
    for (let i = 0; i < jsonData.length; i++) {
        if (!currency.includes(jsonData[i]["Currency"])) {
            currency.push(jsonData[i]["Currency"])
        }
    }
    return currency
}

//Récupère toutes les années d'expérience présente dans le json data
function getWorkExp(jsonData) {
    let workExps = [];
    for (let i = 0; i < jsonData.length; i++) {
        if (!workExps.includes(Number(jsonData[i]["WorkExp"])) && jsonData[i]["WorkExp"] != 'NA') {
            workExps.push(Number(jsonData[i]["WorkExp"]))
        }
    }
    return workExps;
}

//récupère tous les niveau d'études présent dans le json data
function getEdLevel(jsonData) {
    let edLevel = [];
    for (let i = 0; i < jsonData.length; i++) {
        if (!edLevel.includes((jsonData[i]["EdLevel"])) && jsonData[i]["EdLevel"] != 'NA') {
            edLevel.push(jsonData[i]["EdLevel"])
        }
    }
    return edLevel;
}

//récupère les différentes platformes
function getPlatformWork(jsonData) {
    let platformeWork = [];
    for (let i = 0; i < jsonData.length; i++) {
        //si des platformes sont renseignées
        if (jsonData[i]["PlatformHaveWorkedWith"] != 'NA') {
            let platformes = (jsonData[i]["PlatformHaveWorkedWith"]).split(";");
            //pour chaque platformes renseigné
            for (let j = 0; j < platformes.length; j++) {
                if (!platformeWork.includes(platformes[j])) {
                    platformeWork.push(platformes[j]);
                }
            }
        }
    }
    return platformeWork;
}

//Récupère les données correspondant au pays "country" du json data
function getDataCountry(country, jsonData) {
    let data = [];
    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]["Country"] === country) {
            data.push(jsonData[i]);
        }
    }
    return data;
}

//Récupère les données correspondant au pays "country" du json data
function getDataCountryWorkExp(country, workExp, jsonData) {
    let datas = getDataCountry(country,jsonData);
    let data = [];
    for (let i = 0; i < jsonData.length; i++) {
        if (datas[i]["WorkExp"] === workExp) {
            data.push(datas[i]);
        }
    } 
    return data;
}


//FONCTION POUR LE PREMIER GRAPHES
//renvoie le salaire moyen par année d'expérience 
function calculMoyenneSalaireParAnneeExp(jsonData, workExps) {
    let dict = {};
    let compteur = {};
    for (let i = 0; i < workExps.length; i++) {
        dict[workExps[i]] = 0;
        compteur[workExps[i]] = 0;
    }
    //somme des salaire
    for (let j = 0; j < jsonData.length; j++) {
        if (workExps.includes(Number(jsonData[j]["WorkExp"])) && jsonData[j]["CompTotal"] != 'NA') {
            valeurConverti = convertEnEuro(jsonData[j]["Currency"], jsonData[j]["CompTotal"]);
            dict[Number(jsonData[j]["WorkExp"])] += valeurConverti;
            compteur[Number(jsonData[j]["WorkExp"])] += 1;
        }
    }
    //diviser pour optenir la moyenne
    for (let k = 0; k < Object.keys(dict).length; k++) {
        dict[workExps[k]] = dict[workExps[k]] / compteur[workExps[k]];
    }

    return dict;
}

//mise ne forme des données pour le chart
function salaireMoyenParAnneeExp(country, jsonData) {
    datas = getDataCountry(country, jsonData);
    workExps = getWorkExp(jsonData);
    moyennesSalaires = calculMoyenneSalaireParAnneeExp(datas, workExps);
    workExps = workExps.sort(function (a, b) {
        return a - b;
    });
    values = [];
    for (let i = 0; i < workExps.length; i++) {
        values.push(moyennesSalaires[workExps[i]]);
    }
    return { "tableauAnnees": workExps, "tableauSalaires": values };
}

//mise a jour du chart en fonction de la country
function updateCountryRMAE(chart, jsonData, country) {
    chart.data.datasets = [{
        label: 'Moyenne des salaires par années d\'expérience pour :' + country,
        data: salaireMoyenParAnneeExp(country, jsonData)["tableauSalaires"]
    }]
    chart.update();
}

//créer le selecteur de country
function createCountriesDropDownRMAE(divSelector, countries, myChart, jsonData) {
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }

    let dropDown = document.createElement("select")
    for (let country of countries) {
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);
    dropDown.addEventListener("change", (event) => {
        country = dropDown.options[dropDown.selectedIndex].value
        updateCountryRMAE(myChart, jsonData, country);
    });
}

//renvoie la configuration du chart pour le créer 
function loadChartRMAE(years, values, country) {
    const data = {
        labels: years,
        datasets: [{
            label: 'Moyenne des salaires par années d\'expérience pour : ' + country,
            data: values
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    return config;
}

//FONCTION POUR LE DEUXIEME GRAPHE
//rencoie le salaire moyen par niveau d'expérience
function calculMoyenneSalaireParNiveauEtude(jsonData, edLevel) {
    let dict = {};
    let compteur = {};
    for (let i = 0; i < edLevel.length; i++) {
        dict[edLevel[i]] = 0;
        compteur[edLevel[i]] = 0;
    }
    //somme des salaire
    for (let j = 0; j < jsonData.length; j++) {
        if (edLevel.includes(jsonData[j]["EdLevel"]) && jsonData[j]["CompTotal"] != 'NA') {
            valeurConverti = convertEnEuro(jsonData[j]["Currency"], jsonData[j]["CompTotal"]);
            dict[jsonData[j]["EdLevel"]] += valeurConverti;
            compteur[jsonData[j]["EdLevel"]] += 1;
        }
    }
    //diviser pour optenir la moyenne
    for (let k = 0; k < Object.keys(dict).length; k++) {
        dict[edLevel[k]] = dict[edLevel[k]] / compteur[edLevel[k]];
    }
    return dict;
}

//mise ne forme des données pour le chart
function salaireMoyenParNiveauEtude(country, jsonData) {
    datas = getDataCountry(country, jsonData);
    edLevel = getEdLevel(jsonData);
    moyennesSalaires = calculMoyenneSalaireParNiveauEtude(datas, edLevel);
    values = [];
    for (let i = 0; i < edLevel.length; i++) {
        values.push(moyennesSalaires[edLevel[i]]);
    }
    return { "tableauNiveau": edLevel, "tableauSalaires": values };
}

//mise a jour du chart en fonction de la country
function updateCountryRMNE(chart, jsonData, country) {
    chart.data.datasets = [{
        label: 'Moyenne des salaires par niveau d\'étude pour :' + country,
        data: salaireMoyenParNiveauEtude(country, jsonData)["tableauSalaires"]
    }]
    chart.update();
}

//créer le selecteur de country
function createCountriesDropDownRMNE(divSelector, countries, myChart, jsonData) {
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }

    let dropDown = document.createElement("select")
    for (let country of countries) {
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);
    dropDown.addEventListener("change", (event) => {
        country = dropDown.options[dropDown.selectedIndex].value
        updateCountryRMNE(myChart, jsonData, country);
    });
}

//rencoie la configuration du chart pour le créer 
function loadChartRMNE(years, values, country) {
    const data = {
        labels: years,
        datasets: [{
            label: 'Moyenne des salaires par niveau d\'étude pour : ' + country,
            data: values
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    return config;
}

//FONCTION POUR LE TROISIEME GRAPHE
//renvoie le salaire moyen par année d'expérience 
function calculMoyenneSalaireParPlatforme(jsonData, platformeWork) {
    let dict = {};
    let compteur = {};
    for (let i = 0; i < workExps.length; i++) {
        dict[platformeWork[i]] = 0;
        compteur[platformeWork[i]] = 0;
    }
    //somme des salaire
    for (let j = 0; j < jsonData.length; j++) {
        if (jsonData[j]["PlatformHaveWorkedWith"] != 'NA') {
            let platformes = (jsonData[j]["PlatformHaveWorkedWith"]).split(";");
            //pour chaque platformes renseigné
            for (let l = 0; l < platformes.length; l++) {
                if (platformeWork.includes(platformes[l])) {
                    valeurConverti = convertEnEuro(jsonData[j]["Currency"], jsonData[j]["CompTotal"]);
                    dict[platformes[l]] += valeurConverti;
                    compteur[platformes[l]] += 1;
                }
            }
        }
    }
    //diviser pour optenir la moyenne
    for (let k = 0; k < Object.keys(dict).length; k++) {
        dict[workExps[k]] = dict[workExps[k]] / compteur[workExps[k]];
    }
    return dict;
}

//mise ne forme des données pour le chart
function revenueMoyenParCloud(country, jsonData) {
    datas = getDataCountry(country, jsonData);
    platformeWork = getPlatformWork(jsonData);
    moyennesSalaires = calculMoyenneSalaireParPlatforme(datas, platformeWork);
    values = [];
    for (let i = 0; i < edLevel.length; i++) {
        values.push(moyennesSalaires[platformeWork[i]]);
    }
    return { "tableauNiveau": platformeWork, "tableauSalaires": values };
}

//mise a jour du chart en fonction de la country
function updateCountryRMPC(chart, jsonData, country) {

    chart.data.datasets = [{
        label: 'Moyenne des salaires par niveau d\'étude pour :' + country,
        data: revenueMoyenParCloud(country, jsonData)["tableauSalaires"]
    }]
    chart.update();
}

//créer le selecteur de country
function createCountriesDropDownRMPC(divSelector, countries, myChart, jsonData) {
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }

    let dropDown = document.createElement("select")
    for (let country of countries) {
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);
    dropDown.addEventListener("change", (event) => {
        country = dropDown.options[dropDown.selectedIndex].value
        updateCountryRMPC(myChart, jsonData, country);
    });
}

//créer le selecteur de country
function createCountriesDropDownWorkExpRMPC(divSelector, workExps, myChart, jsonData) {
    var existingDropDown = divSelector.querySelector("select");
    if (existingDropDown) {
        divSelector.removeChild(existingDropDown);
    }

    let dropDown = document.createElement("select")
    for (let workExp of workExps) {
        let option = document.createElement('option');
        option.value = workExp;
        option.text = workExp;
        // On ajoute l'option au dropDown
        dropDown.appendChild(option);
    }
    divSelector.appendChild(dropDown);
    dropDown.addEventListener("change", (event) => {
        country = dropDown.options[dropDown.selectedIndex].value
        updateCountryRMNE(myChart, jsonData, country);
    });
}

//PAGE
function execussionPage(request) {
    request.done(function (output) {
        let dataString = JSON.stringify(output);
        let jsonData = JSON.parse(dataString);
        let countries = getCountry(jsonData);
        country = countries[0];
        //PREMIER CHART
        workExps = salaireMoyenParAnneeExp(country, jsonData)["tableauAnnees"];
        valuesRMAE = salaireMoyenParAnneeExp(country, jsonData)["tableauSalaires"];
        configRMAE = loadChartRMAE(workExps, valuesRMAE, country);

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
        createCountriesDropDownRMAE(divSelector, countries, ChartRMAE, jsonData);


        //DEUXIEME CHART
        edLevel = salaireMoyenParNiveauEtude(country, jsonData)["tableauNiveau"];
        valuesRMNE = salaireMoyenParNiveauEtude(country, jsonData)["tableauSalaires"];
        configRMNE = loadChartRMNE(edLevel, valuesRMNE, country);

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
        createCountriesDropDownRMNE(divSelectorRMNE, countries, ChartRMNE, jsonData);

        console.log(getPlatformWork(jsonData));

    })
}

// Fonction de chargement du bon JSON choisi
function chargerJSON() {
    var selectElement = document.getElementById("selectRegion");
    var selectedValue = selectElement.value;
    var cheminFichierJSON = "jeuDeDonnees/survey_results_" + selectedValue + ".json";

    let request = $.ajax({
        type: "GET",
        url: cheminFichierJSON
    })

    execussionPage(request)
}

// Premier chargement de page
$(document).ready(function () {
    var selectElement = document.getElementById("selectRegion");
    var selectedValue = selectElement.value;
    var cheminFichierJSON = "jeuDeDonnees/survey_results_" + selectedValue + ".json";

    let request = $.ajax({
        type: "GET",
        url: cheminFichierJSON
    })

    execussionPage(request)
})