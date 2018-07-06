// ide deklaráljátok a függvényeket.

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file t{artalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  advencedBubbleToOrderByPrice(userDatas);
  console.log(userDatas);
}
getData('/json/spaceships.json', successAjax);

/*
1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble)
*/
function advencedBubbleToOrderByPrice(inputArray) {
  var i = inputArray.length;
  var csere;
  while (i > 0) {
    csere = 0;
    for (var j = 0; j < i - 1; j++) {
      if (parseInt(inputArray[j].cost_in_credits, 10) > parseInt(inputArray[j + 1].cost_in_credits, 10)) {
        [inputArray[j], inputArray[j + 1]] = [inputArray[j + 1], inputArray[j]];
        csere = j;
      }
    }
    i = csere;
  }
}

/*
2. Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!


3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra

4. Írasd ki így kapott hajók adatait.
*/
