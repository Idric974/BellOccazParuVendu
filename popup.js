//! Les variables.

let copyInfo;
let infoVehicule;
let infoCyndree;
let prixVehiculeBrut;
let prixVehicule;
let anneeVehiculeBrut;
let anneeVehicule;

//!------------------------------------------------------------------------

//! 1 ) Récupération des informations sur le véhucule.

copyInfo = document.getElementById('copyInfo');

copyInfo.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setCopyInfo,
  });
});

function setCopyInfo() {
  //
  //! Collecte des informations.

  infoVehicule = document.getElementsByClassName('clearPhone')[0].innerText;

  prixVehiculeBrut = document.getElementsByClassName('clearPhone')[2].innerText;

  infoCyndree = document.getElementsByClassName(
    'sizeC clear txtGrey7C sizeC'
  )[0].innerText;

  let pv = prixVehiculeBrut.split(' ');
  let pv1 = pv[0];
  let pv2 = pv[1];
  let prixVehicule = pv1 + pv2;

  anneeVehiculeBrut = document.getElementsByClassName(
    'cbm-title--section sizeD'
  )[2].innerText;
  let an = anneeVehiculeBrut.split(' ');
  let anneeVehicule = an[5];

  console.log('Designation du véhicule :' + infoVehicule);
  // console.log('Type : Designation du véhicule : ' + typeof infoVehicule);

  console.log('info Cyndrée du véhicule :' + infoCyndree);
  // console.log('Type : info Cyndrée du véhicule :        ' + typeof infoCyndree);

  console.log('Prix du véhicule :' + prixVehicule);
  // console.log('Type : Prix du véhicule :        ' + typeof prixVehicule);

  console.log('Année du véhicule :' + anneeVehicule);
  // console.log('Type : Année du véhicule :        ' + typeof anneeVehicule);

  //! ------------------------------------------------------

  //*! Poste des informations à la base de données.

  const headers = new Headers();
  headers.append(
    'Content-Type',
    'application/json',
    'Access-Control-Allow-Origin: *'
  );

  const values = {
    infoVehicule: infoVehicule,
    infoCyndree: infoCyndree,
    prixVehicule: prixVehicule,
    anneeVehicule: anneeVehicule,
  };

  const body = JSON.stringify(values);

  const parametresDeRequete = {
    method: 'POST',
    headers: headers,
    body: body,
  };

  let url =
    'https://rocky-temple-30433.herokuapp.com/api/dataFromExtensionRoute/infoVehicule/';

  fetch(url, parametresDeRequete)
    .then(function (r) {
      return r.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(
        "Il y a eu un problème avec l'opération fetch : " + error.message
      );
    });

  //! ------------------------------------------------------
}
