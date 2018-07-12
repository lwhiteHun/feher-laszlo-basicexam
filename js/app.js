// ide deklaráljátok a függvényeket.
/*
1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble)
*/
function advencedBubbleToOrderByPrice(inputArray) {
  var i = inputArray.length;
  var csere;
  while (i > 0) {
    csere = 0;
    for (var j = 0; j < i - 1; j++) {
      if (stringToInt(inputArray[j].cost_in_credits) > stringToInt(inputArray[j + 1].cost_in_credits)) {
        [inputArray[j], inputArray[j + 1]] = [inputArray[j + 1], inputArray[j]];
        csere = j;
      }
    }
    i = csere;
  }
}

/*
2. Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!
*/
function deleteConsumablesNullValuedObjects(inputArray) {
  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i].consumables === null) {
      // delete inputArray[i];
      // myArray.splice(start, deleteCount) actually removes the element, reindexes the array, and changes its length.
      inputArray.splice(i, 1);
    }
  }
}

/*
3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra
*/
function setNullToUnknownToAllObjectProperties(inputArray) {
  for (var i = 0; i < inputArray.length; i++) {
    for (var k in inputArray[i]) {
      if (inputArray[i].hasOwnProperty(k)) {
        if (inputArray[i][k] === null) {
          inputArray[i][k] = 'unknown';
        }
      }
    }
  }
}

/*
4. Írasd ki így kapott hajók adatait.
*/
function showShipProperties(inputArray) {
  var result = '<h3>A szűrt hajók adatai</h3>';
  for (var i = 0; i < inputArray.length; i++) {
    result += `<div class="spaceship-item">${showObjectProperties(inputArray[i])}</div>`;
  }
  return resultToTarget('.spaceship-list', result, 'append');
}

function resultToTarget(target, value, type) {
  switch (type) {
  case 'new':
    document.querySelector(target).innerHTML = value;
    break;
  case 'append':
    document.querySelector(target).innerHTML += value;
    break;
  default:
    document.querySelector(target).innerHTML += value;
  }
}

/*
5. Készítened kell egy statisztikát, mely kiírja a következő statisztikai adatokat:

* Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
* A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
* Az összes hajó utasainak (passengers) összesített száma
* A leghosszabb(lengthiness) hajó képének a neve
*/
function showStatistics(inputArray) {
  var result = `Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma: ${statisticsOneCrew(inputArray)} db<br>
  A legnagyobb cargo_capacity-vel rendelkező hajó neve (model): ${statisticsMaxCargo(inputArray)}<br>
  Az összes hajó utasainak (passengers) összesített száma: ${statisticsSumPassengers(inputArray)}<br>
  A leghosszabb (lengthiness) hajó képének a neve: ${statisticsMaxLengthShip(inputArray)}`;
  resultToTarget('.spaceship-list', result, 'append');
}
function statisticsOneCrew(inputArray) {
  var count = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (parseInt(inputArray[i].crew, 10) === 1) {
      count++;
    }
  }
  return count;
}
function statisticsMaxCargo(inputArray) {
  var max = stringToInt(inputArray[0].cargo_capacity);
  var shipNumber = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (stringToInt(inputArray[i].cargo_capacity) > max) {
      max = stringToInt(inputArray[i].cargo_capacity);
      shipNumber = i;
    }
  }
  return inputArray[shipNumber].model;
}
function statisticsSumPassengers(inputArray) {
  var sum = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (stringToInt(inputArray[i].passengers)) {
      sum += stringToInt(inputArray[i].passengers);
    }
  }
  return sum;
}

function stringToInt(value) {
  return parseInt(value, 10);
}

function statisticsMaxLengthShip(inputArray) {
  var max = stringToInt(inputArray[0].lengthiness);
  var shipNumber = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (stringToInt(inputArray[i].lengthiness) > max) {
      max = stringToInt(inputArray[i].lengthiness);
      shipNumber = i;
    }
  }
  return `${inputArray[shipNumber].image} ${showImg(inputArray[shipNumber].image)}  `;
}

function showImg(imgSource) {
  return `<div class="img-inline"><img src="/img/${imgSource}" alt=""></div>`;
}

/*
6. Legyen lehetőség a hajókra rákeresni _model_ szerint. (logaritmikus/binary sort)

* A keresett nevet paraméterként kapja a függvényed.
* A keresés nem case sensitive
* Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
* Ha több találatunk is lenne, azt a hajót adjuk vissza, amelyiknek a neve ABC sorrendben a legelső lenne.
* Írasd ki a hajó adatait.
*/


function searchForShip(inputArray, value) {
  // document.querySelector('.one-spaceship').innerHTML = '';
  var results = [];
  // console.log(newArray);
  /*
  var newArray = descOrderByModel(inputArray.slice());
  var firstindex = 0;
  var lastindex = inputArray.length - 1;
  var middleindex;
  var found = false;

  while (firstindex <= lastindex && !found) {
    middleindex = Math.floor((firstindex + lastindex) / 2);
    if (inputArray[middleindex].model.toUpperCase().indexOf(value.toUpperCase()) > -1) {
      results.push(newArray[middleindex]);
      found = true;
    } else if (newArray[middleindex].model.localeCompare(value) > -1) {
      lastindex = middleindex - 1;
    } else  {
      firstindex = middleindex + 1;
    }
  }

*/

  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i].model.toUpperCase().indexOf(value.toUpperCase()) > -1) {
      results.push(inputArray[i]);
    }
  }


  if (results.length > 1) {
    return resultToTarget('.one-spaceship',
      searchForShipShowFormat(showObjectProperties(descOrderByModel(results, 'model')[0])), 'append');
  }
  return resultToTarget('.one-spaceship', searchForShipShowFormat(showObjectProperties(results[0])), 'append');
}

function searchForShipShowFormat(value) {
  if (value.length > 0) {
    return `<div class="one-spaceship-result">
  <h3>A keresett hajó:</h3>
  <p>${value}</p>
  </div>`;
  }
  return `<div class="one-spaceship-result">
  <h3>Nincs találat a keresésre.</h3>
  </div>`;
}

function descOrderByModel(inputArray) {
  var newInputArray = inputArray.slice();
  for (var i = 0; i < inputArray.length - 1; i++) {
    for (var j = i + 1; j < inputArray.length; j++) {
      if (inputArray[i].model.localeCompare(inputArray[j].model) > 0) {
        [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
      }
    }
  }
  return newInputArray;
}


function showObjectProperties(inputObject) {
  var result = '';
  for (var k in inputObject) {
    if (inputObject.hasOwnProperty(k)) {
      result += `${k} : ${inputObject[k]}<br> `;
      // az img mappában nem volt minden kép hivatkozáshoz fizikai fájl
      // ezért 404 errorok jelentek meg a console-ban, ezért ezt kivettem.

      if (k === 'image') {
        result += showImg(inputObject[k]);
      }
    }
  }
  return result;
}


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
  deleteConsumablesNullValuedObjects(userDatas);
  setNullToUnknownToAllObjectProperties(userDatas);

  showStatistics(userDatas);

  showShipProperties(userDatas);

  var search = document.querySelector('#search-button');
  search.addEventListener('click', function () {
    console.log(document.querySelector('#search-text').value);
    searchForShip(userDatas, document.querySelector('#search-text').value);
  });
  // searchForShip(userDatas, 'star');
}
getData('/json/spaceships.json', successAjax);


