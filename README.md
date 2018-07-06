# feher-laszlo-basicexam
# Alapozó képzés, záróvizsga gyakorló

## Indulás

Tanulmányozd az objektumok felépítését.  Nézd meg a tárolt adatokat.

Az img mappákban találhatók az űrhajók képei. Az az _image_
tulajdonság tartalmazza az űrhajó képének nevét.

## HTML,CSS,JS
__Az index.html file-ba nem szabad beleírnod manuálisan semmit. 
(Erre majd a következő héten lesz szükséged)

__A style.css__ file-t módosíthatod, az alkalmazás kinézetét testre szabhatod, csak azt tartsd szem előtt, hogy esztétikus, és logikus elrendezésű maradjon az oldal.

### Feladatok

1. A kapott adatokat rendezd ár(cost_in_credits) szerint növekvő sorrendbe. (advanced bubble)

2. Töröld az összes olyan adatot (tehát az objektumot a tömbből), ahol a consumables értéke NULL. Fontos, hogy ne csak undefined-ra állítsd a tömbelemet!!!

3. Az összes NULL értéket (minden objektum minden tulajdonságánál) módosítsd "unknown"-ra

4. Írasd ki így kapott hajók adatait.

5. Készítened kell egy statisztikát, mely kiírja a következő statisztikai adatokat: 

* Egy fős (crew = 1) legénységgel rendelkező hajók darabszáma.
* A legnagyobb cargo_capacity-vel rendelkező hajó neve (model)
* Az összes hajó utasainak (passengers) összesített száma
* A leghosszabb(lengthiness) hajó képének a neve

6. Legyen lehetőség a hajókra rákeresni _model_ szerint. (logaritmikus/binary sort)

* A keresett nevet paraméterként kapja a függvényed.
* A keresés nem case sensitive
* Nem csak teljes egyezést vizsgálunk, tehát ha a keresett szöveg szerepel a hajó nevében már az is találat
* Ha több találatunk is lenne, azt a hajót adjuk vissza, amelyiknek a neve ABC sorrendben a legelső lenne.
* Írasd ki a hajó adatait.

## Git
Az ekészült munkádat tedd fel egy git repo-ba githubra. A repo neve az alábbi formátum szerint legyen megadva: vezeteknev-keresztnev-basicexam.
Értelemszerűen a saját vezeték és keresztneved add meg.

