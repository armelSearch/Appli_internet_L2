var mots = null;

window.addEventListener("load", function() {

  abonnements();

  charger();
});

function abonnements(){
  let submitElt = document.getElementById("bouton");
  submitElt.addEventListener("click", traduire);
}

function charger(){

    if (localStorage.getItem('mots')!==null){
        mots = JSON.parse(localStorage.getItem('mots'));
        console.log(mots);
    }
    else
        mots = [];
}

function traduire() {
    let texte = document.getElementById("texte").value;

    let langueSource = 'fr';
    let langueDest = 'en';

    let traduction = null;

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx";
            url += "&sl=" + langueSource;
            url += "&tl=" + langueDest;
            url += "&dt=t";
            url += "&q=" + escape(texte);
    $.get(url, function (data, status) {
        traduction = data[0][0][0];

        let obj = {
            'depuis': langueSource,
            'texte': texte,
            'vers': langueDest,
            'traduction': traduction
        }

        mots.push(obj);

        localStorage.setItem('mots', JSON.stringify(mots));

        document.getElementById("traduction").innerHTML = traduction;
    });

}
