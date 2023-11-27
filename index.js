/* Calculer et afficher via la chart de votre choix le revenu moyen d’un professionnel en
fonction de son nombre d’années d’expérience. L’utilisateur pourra choisir un
continent, un pays, et la valeur des revenus moyens devra toujours être affichée en
euros.*/

function getCountry (jsonData) {
    let countries=[]
    for (let i = 0; i < jsonData.length; i++){
        if (!countries.includes(jsonData[i]["Country"])){
            countries.push(jsonData[i]["Country"])
        }
    } 
    return countries
}

function getWorkExp(jsonData){
    let workExps=[];
    for (let i = 0; i < jsonData.length; i++){
        if (!workExps.includes(jsonData[i]["WorkExp"])){
            workExps.push(jsonData[i]["WorkExp"])
        }
    } 
    return workExps;
}

function getDataCountry (country,jsonData) {
    let data=[];
    for (let i = 0; i < jsonData.length; i++){
        if (jsonData[i]["Country"] === country){
            data.push(jsonData[i]);
        }
    }
    return data;
}

function convertEnEuro (type,value) {
    //valeur du 20/11/2023 (2022)
    dict = {
        "AED United Arab Emirates dirham": 0.25,
        "AFN Afghan afghani": 0.013,
        "ALL Albanian lek": 0.0096,
        "AMD Armenian dram": 0.0023,
        "ANG Netherlands Antillean guilder": 0.51,
        "ARS Argentine peso": 0.0026,
        "AUD Australian dollar": 0.60,
        "AWG Aruban florin": 0.51,
        "AZN Azerbaijan manat": 0.54,
        "BAM Bosnia and Herzegovina convertible mark": 0.51,
        "BGN Bulgarian lev": 0.51,
        "BIF Burundi franc": 0.00032,
        "BOB Bolivian boliviano": 0.13,
        "BRL Brazilian real": 0.19,
        "CAD Canadian dollar": 0.67,
        "CHF Swiss franc": 1,03,
        "CLP Chilean peso": 0.0010,
        "CNY Chinese Yuan Renminbi": 0.13,
        "COP Colombian peso": 0.00023,
        "CRC Costa Rican colon": 0.0017,
        "CUP Cuban peso": 0.038,
        "CDF Congolese franc": 0.00037,
        "DJF Djiboutian franc": 0.0052,
        "EUR European Euro": 1,
        "FJD Fijian dollar": 0.41,
        "FKP Falkland Islands pound": 1.141,
        "GBP Pound sterling": 1.14,
        "GHS Ghanaian cedi": 0.077,
        "GIP Gibraltar pound": 1.14240,
        "HKD Hong Kong dollar": 0.12,
        "HUF Hungarian forint": 0.0026,
        "IDR Indonesian rupiah": 0.00006,
        "ILS Israeli new shekel": 0.25,
        "INR Indian rupee": 0.011,
        "IRR Iranian rial": 0.000022,
        "JPY Japanese yen": 0.0062,
        "LAK Lao kip": 0.000044,
        "MYR Malaysian ringgit": 0.20,
        "NOK Norwegian krone": 0.085,
        "NZD New Zealand dollar": 0.55,
        "PEN Peruvian sol": 0.24,
        "PLN Polish zloty": 0.23,
        "QAR Qatari riyal": 0.25,
        "SAR Saudi Arabian riyal": 0.24,
        "SLL Sierra Leonean leone": 0.000046,
        "THB Thai baht": 0.026,
        "TWD New Taiwan dollar": 0.029,
        "UAH Ukrainian hryvnia": 0.025,
        "UGX Ugandan shilling": 0.00024,
        "USD United States dollar": 0.91,
        "UZS Uzbekistani som": 0.000075,
        "XPF CFP franc": 0.0083,
        "YER Yemeni rial": 0.0037,
        "ZAR South African rand": 0.050,
        "ZMW Zambian kwacha": 0.040,
        "NA":0
    };

    return dict[type]*value;
}

//
function calculMoyenneSalaireParAnneeExp(jsonData,workExps){
    let dict={};
    let compteur={};
    for (let i = 0; i < workExps.length; i++) {
        dict[workExps[i]]=0;
        compteur[workExps[i]]=0;
    }
    //somme des salaire
    for (let j = 0; j < jsonData.length; j++){
        if (workExps.includes(jsonData[j]["WorkExp"])){
            valeurConverti=convertEnEuro(jsonData[j]["Currency"],jsonData[j]["CompTotal"]);
            dict[jsonData[j]["WorkExp"]]+=valeurConverti;
            compteur[jsonData[j]["WorkExp"]]+=1;
        }
    }
    //diviser pour optenir la moyenne
    for (let k = 0; k < dict.length; k++){
        dict[jsonData[k]["WorkExp"]]=dict[jsonData[k]["WorkExp"]]/compteur[jsonData[k]["WorkExp"]];
    }

    return dict;
}

function salaireMoyenParAnneeExp (country,jsonData) {
    datas = getDataCountry(country,jsonData);
    workExps = getWorkExp(jsonData);
    moyennesSalaires = calculMoyenneSalaireParAnneeExp(jsonData,workExps);
    workExps=workExps.sort();
    values=[];
    for (let i = 0; i < workExps.length; i++){
        values.push(moyennesSalaires[workExps[i]]);
    }
    return {"tableauAnnees":workExps,"tableauSalaires":values};
}

function updateCountry (chart,jsonData,country) {
    chart.data.datasets=[{
            label:'Moyenne des salaires par années d\'expérience pour :'+country,
            data:salaireMoyenParAnneeExp(country,jsonData)["tableauSalaires"]
        }]
    chart.update();
}

function loadChart(years,values,country){
    const data = {
        labels: years,
        datasets:[{
            label:'Moyenne des salaires par années d\'expérience pour : '+country,
            data:values
        }]
    }
    const config = {
        type: 'line',
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

function createCountriesDropDown(divSelector,countries,myChart,jsonData){
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
        var canvas = document.getElementById("myChart");
        var myChart = new Chart(canvas, config);

        //Selecteur de pays
        const divSelector = document.getElementById("selector"); 
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