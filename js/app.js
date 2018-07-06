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
  deleteConsumablesNullValuedObjects(userDatas);
  setNullToUnknownToAllObjectProperties(userDatas);
  showStatistics(userDatas);
  showShipProperties(userDatas);
  searchForShip(userDatas, 'star');
  // console.log(userDatas);
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
  var result;
  for (var i = 0; i < inputArray.length; i++) {
    result += '<div class="spaceship-item">';
    for (var k in inputArray[i]) {
      if (inputArray[i].hasOwnProperty(k)) {
        result += `${k} : ${inputArray[i][k]} `;
      }
    }
    result += '</div>';
  }
  return result;
}
/*
function displayObjectProperties(inputObject) {return resultToTarget('.spaceship-list', result, 'append');
  var result;
  for (var k in inputObject) {
    if (inputObject.hasOwnProperty(k)) {
      result += `${k} : ${inputObject[k]} `;
    }
  }
  return result;
}
*/
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
/*
function valueIsNumber(value) {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return true;
  }
}
*/

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
  var results = [];
  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i].model.toUpperCase().indexOf(value.toUpperCase()) > -1) {
      results.push(inputArray[i]);
    }
  }
  var result;
  if (results.length > 1) {
    result = resultToTarget('.spaceship-list', `<p>A keresett hajó: ${showObjectProperties(advencedBubbleToDescorderByValue(results, 'model')[0])}</p>`, 'append');
  } else {
    result = resultToTarget('.spaceship-list', results, 'append');
  }
  return result;
}

function advencedBubbleToDescorderByValue(inputArray) {
  var i = inputArray.length;
  var csere;
  while (i > 0) {
    csere = 0;
    for (var j = 0; j < i - 1; j++) {
      if (inputArray[j].model.localeCompare(inputArray[j + 1].model) > 0) {
        [inputArray[j], inputArray[j + 1]] = [inputArray[j + 1], inputArray[j]];
        csere = j;
      }
    }
    i = csere;
  }
  console.log(inputArray);
  return inputArray;
}

function showObjectProperties(inputObject) {
  var result = '';
  for (var k in inputObject) {
    if (inputObject.hasOwnProperty(k)) {
      result += `${k} : ${inputObject[k]} `;
    }
  }
  return result;
}
