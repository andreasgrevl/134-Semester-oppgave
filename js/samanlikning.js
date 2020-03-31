// utrekning av prosent
var getpercentchange = function(nyVerdi, gammelVerdi) {
  return (nyVerdi - gammelVerdi) / gammelVerdi * 100;
}

// funksjon for utvikling av sysselsetting
var getutviklingSysselsetting = function(kommunenummer) {
  var sysselsetting = syssel.getInfo(kommunenummer);
  var aarstall = Object.keys(sysselsetting.population.Kvinner);
  // variabelen som skal brukast som utgangspunkt
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
    // bruker hjelpefunksjonen frå toppen
    mennprosentChange = getpercentchange(sysselsettingMenn, tidligeresysselsettingMenn);
    kvinnerprosentChange = getpercentchange(sysselsettingKvinner, tidligeresysselsettingKvinner);
    // data til lista utvikling
    utvikling.push({
      aar: aar,
      menn: sysselsettingMenn,
      kvinner: sysselsettingKvinner,
      mennprosentChange: mennprosentChange,
      kvinnerprosentChange: kvinnerprosentChange,
    });
  }
  // returnerer lista utvikling
  return utvikling;
}

// funksjon for å opprette sammenligne-tabellen
var opprettTabell = function(utvikling, sammenlignendeUtvikling, knr) {
  // henting av data
  var kommunenavn = befolkning.getNames();
  var kommunenummer = befolkning.getIDs();

  // Oppretting av tabellen
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
  // Løkke som fyller tabell med data
  for (var i = 0; i < utvikling.length; i++) {
    var aar = utvikling[i].aar;
    var aarCell = tabell.rows[1].insertCell();
    aarCell.innerHTML = aar;

    var mennCell = tabell.rows[1].insertCell();
    mennCell.innerHTML = "Menn: \n" + utvikling[i].menn;
    aarCell.appendChild(mennCell);

    var kvinnerCell = tabell.rows[1].insertCell();
    kvinnerCell.innerHTML = "Kvinner: \n" + utvikling[i].kvinner;
    aarCell.appendChild(kvinnerCell);

    var kvinnerMaxChange = utvikling[i].kvinnerprosentChange > sammenlignendeUtvikling[i].kvinnerprosentChange;
    var mennMaxChange = utvikling[i].mennprosentChange > sammenlignendeUtvikling[i].mennprosentChange;

    // tilegner klasse for høgaste auke i prosentpoeng
    if (kvinnerMaxChange) {
      kvinnerCell.classList.add('best-category')
    }
    if (mennMaxChange) {
      mennCell.classList.add('best-category');
    }
  }
  tabell.classList.add("samanlikning")
  return tabell;
}

// funksjon for å bruke resultat frå hjelpefunksjoner i opppretting av tabell
var compareSysselsetting = function(kommunenummer1, kommunenummer2) {
  var utviklingKommune1 = getutviklingSysselsetting(kommunenummer1);
  var utviklingKommune2 = getutviklingSysselsetting(kommunenummer2);

  var kommune1Tabell = opprettTabell(utviklingKommune1, utviklingKommune2, kommunenummer1);
  var kommune2Tabell = opprettTabell(utviklingKommune2, utviklingKommune1, kommunenummer2);

  var samanlikning = document.getElementById("Sammenligning");
  samanlikning.appendChild(kommune1Tabell);
  samanlikning.appendChild(kommune2Tabell);
}
