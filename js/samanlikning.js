// percent calculator
var getpercentchange = function(nyVerdi, gammelVerdi) {
  return (nyVerdi - gammelVerdi) / gammelVerdi * 100;
}

// function that creates the compare table
var opprettTabell = function(utvikling, sammenlignendeUtvikling, knr) {
  // retrieving data
  var kommunenavn = befolkning.getNames();
  var kommunenummer = befolkning.getIDs();

  // creating the table
  var tabell = document.createElement('table');
  tabell.classList.add("flex");
  tabell.style.width = '100%';
  tabell.setAttribute('border', '1');
  var tabellHeader = document.createElement('thead');

  tabell.insertRow();
  tabell.insertRow();
  tabell.insertRow();

  var headercell1 = tabell.rows[0].insertCell();
  var headercell2 = tabell.rows[0].insertCell();


  for (var x = 0; x < kommunenummer.length; x++){
    if (knr == kommunenummer[x]) {
      headercell1.innerHTML = kommunenavn[x];
      headercell2.innerHTML = "K.nr: " + kommunenummer[x];
    }
  }
  // for loop that fills the table with data
  for (var i = 0; i < utvikling.length; i++) {
    var aar = utvikling[i].aar;
    var aarCell = tabell.rows[1].insertCell();
    aarCell.innerHTML = aar;

    var mCell = tabell.rows[1].insertCell();
    mCell.innerHTML = "Menn: \n" + utvikling[i].menn;
    aarCell.appendChild(mCell);

    var kCell = tabell.rows[1].insertCell();
    kCell.innerHTML = "Kvinner: \n" + utvikling[i].kvinner;
    aarCell.appendChild(kCell);

    var kvinnerMaxChange = utvikling[i].kvinnerprosentChange > sammenlignendeUtvikling[i].kvinnerprosentChange;
    var mennMaxChange = utvikling[i].mennprosentChange > sammenlignendeUtvikling[i].mennprosentChange;

    // Highest percental increase get allocated into class
    if (kvinnerMaxChange) {
      kCell.classList.add('best-category')
    }
    if (mennMaxChange) {
      mCell.classList.add('best-category');
    }
  }
  tabell.classList.add("samanlikning")
  return tabell;
}

// function that shows the development of 'sysselsetting'
var getutviklingSysselsetting = function(kommunenummer) {
  var sysselsetting = syssel.getInfo(kommunenummer);
  var aarstall = Object.keys(sysselsetting.population.Kvinner);
  var fyrsteAar = aarstall[0];
  var utvikling = [
    {
      aar: fyrsteAar,
      menn: sysselsetting.population.Menn[fyrsteAar],
      kvinner: sysselsetting.population.Kvinner[fyrsteAar],
      mennprosentChange: 0,
      kvinnerprosentChange: 0
    }
  ];

  for (var i = 1; i < aarstall.length; i++) {
    var aar = aarstall[i];
    var fjoraar = aarstall[i - 1];

    var sysselsettingMenn = sysselsetting.population.Menn[aar];
    var sysselsettingKvinner = sysselsetting.population.Kvinner[aar];

    var tidligeresysselsettingMenn = sysselsetting.population.Menn[fjoraar];
    var tidligeresysselsettingKvinner = sysselsetting.population.Kvinner[fjoraar];
    // using the percent calculator
    mennprosentChange = getpercentchange(sysselsettingMenn, tidligeresysselsettingMenn);
    kvinnerprosentChange = getpercentchange(sysselsettingKvinner, tidligeresysselsettingKvinner);
    // pushing data to the list 'utvikling'
    utvikling.push({
      aar: aar,
      menn: sysselsettingMenn,
      kvinner: sysselsettingKvinner,
      mennprosentChange: mennprosentChange,
      kvinnerprosentChange: kvinnerprosentChange,
    });
  }
  // returns the list 'utvikling'
  return utvikling;
}


// creating table with the help function
var compareSysselsetting = function(kommunenummer1, kommunenummer2) {
  var utviklingKommune1 = getutviklingSysselsetting(kommunenummer1);
  var utviklingKommune2 = getutviklingSysselsetting(kommunenummer2);

  var kommune1Tabell = opprettTabell(utviklingKommune1, utviklingKommune2, kommunenummer1);
  var kommune2Tabell = opprettTabell(utviklingKommune2, utviklingKommune1, kommunenummer2);

  var samanlikning = document.getElementById("Sammenligning");
  samanlikning.appendChild(kommune1Tabell);
  samanlikning.appendChild(kommune2Tabell);
}
