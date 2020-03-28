// diverse URL'er for datasettene
let dataBeskrivelser = "http://wildboy.uib.no/~tpe056/folk/";
let dataBefolkning = "http://wildboy.uib.no/~tpe056/folk/104857.json";
let dataUtdanning = "http://wildboy.uib.no/~tpe056/folk/85432.json";
let dataSysselsatte = "http://wildboy.uib.no/~tpe056/folk/100145.json";


// HTTP call request
function performGetRequest(url, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    // om readyState == 4 er det operasjonen utført
    if (request.readyState == 4 && request.status == 200) {
      callback(request.response);
    }
  }
  request.open("GET", url, true);
  request.send();
}

// vise-og-skjule-knapp
function visBoks(id) {
  var boksene = document.getElementsByClassName("infoboks");
  var boks = document.getElementById(id);
  for (var i = 0; i < boksene.length; i++) {
    boksene[i].classList.replace("vis", "skjul");
  }

  if (boks.classList.contains("vis")) {
    boks.classList.replace("vis", "skjul");
  }

  else if (boks.classList.contains !== "vis") {
    boks.classList.replace("skjul", "vis");
  }
};


// konstruktoeren
function befolkningFunksjon(url) {
  this.url = url;
  this.kommuner = [];
  this.onload = null;

  // oppretting av arrays og en dictionary
  this.kommunenavn = [];
  this.kommunenummer = [];
  this.kommuneinfo = {} ;

  this.getNames = function() {
    return this.kommunenavn;
  }

  this.getIDs = function() {
    return this.kommunenummer;
  }

  this.getInfo = function(kommunenummer) {
    return this.kommuneinfo[kommunenummer];
  }

  this.getSyssel = function(kommunenummer) {
    return this.kommuneinfo[kommunenummer];
  }

  this.getUtdanning = function(kommunenummer) {
    return this.kommuneinfo[kommunenummer];
  }
  // parsing:
  this.load = function() {
    var self = this;
    performGetRequest(this.url, function(response) {
      var data = JSON.parse(response);
      for (var navn in data.elementer) {
        var kommuneData = data.elementer[navn];

        self.kommunenavn.push(navn);
        self.kommunenummer.push(kommuneData.kommunenummer);
        self.kommuneinfo[kommuneData.kommunenummer] = { population: kommuneData };
      };

      if (self.onload) {
        self.onload();
        // test for rekkefølge på datainnlasting
        console.log("Ready");
      }
    });
  }
};

// initialisering av objektene
var befolkning = new befolkningFunksjon(dataBefolkning);
var utdanning = new befolkningFunksjon(dataUtdanning);
var syssel = new befolkningFunksjon(dataSysselsatte);

befolkning.onload = function() {
  OverblikkPopulasjon();
  console.log("dataBefolkning lastes")
}

utdanning.onload = function() {
  console.log("dataUtdanning lastes")
}

syssel.onload = function() {
  console.log("dataSysselsatte lastes")
};
// sender en forespørsel hver om å laste ned datasettet
// og laster de ned
befolkning.load();
utdanning.load();
syssel.load();