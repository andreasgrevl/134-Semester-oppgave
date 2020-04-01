//Function that presents data in the 'oversikt' part
var OverblikkPopulasjon = function() {

  // finding the ID in html file
  var overblikkTabell = document.getElementsByClassName("oversikt")[0];

  // retrieving the dataset
  var kommunenavn = befolkning.getNames();
  var kommunenummer = befolkning.getIDs();
  var info = befolkning.kommuneinfo;

  // for loop that fills the table with data
  for (var i = 0; i < kommunenavn.length; i++) {
    var row = overblikkTabell.insertRow(0);
    var nameCell = row.insertCell(0);
    var idCell = row.insertCell(1);
    var infoCell = row.insertCell(2);
    var data = (info[kommunenummer[i]].population.Menn[2018]+info[kommunenummer[i]].population.Kvinner[2018])

    nameCell.innerHTML = kommunenavn[i];
    idCell.innerHTML = kommunenummer[i];
    infoCell.innerHTML = data;
  };
}
