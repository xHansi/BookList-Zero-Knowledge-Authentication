//n als Modulu um die ByteNumeber zu begrenzen -> sollte in der Praxis zufällig generiert werden
const großeZahl = 8269845634;

//funktion zuer erstellung von zufälligen Primzahlen
function getRandomPrime(range) {
   
    function isPrime(num) {
      for(let i = 2, s = Math.sqrt(num); i <= s; i++)
          if(num % i === 0) return false; 
      return num !== 1;
    }
    
    let randomNum = Math.floor(Math.random() * range) + 1;
    
    while (!isPrime(randomNum)) {
      randomNum++;
    }
    
    return randomNum;
  }

//Funktion um das Passwort von String in eine Dezimal Zahl umwandeln.
function bytes_to_long(text,n){
    let text_encoder = new TextEncoder();
    let text_to_byteArray = text_encoder.encode(text);
    let text_to_byteString = text_to_byteArray.join('');
    let text_to_byteNumber = parseFloat(text_to_byteString)%großeZahl;
    return text_to_byteNumber;
}

//Orientiert an die Pyhton Funktion Random.randint(min, max)
function randomint(min, max) {
    let random = Math.round(Math.random() * (max - min) + min);
    return random;
}

//Orientiert an die Pyhton Funktion pow(base, exp, mod)
function powMod( base, exp, mod ){
    if (exp == 0) return 1;
    if (exp % 2 == 0){
      return Math.pow( powMod( base, (exp / 2), mod), 2) % mod;
    }
    else {
      return (base * powMod( base, (exp - 1), mod)) % mod;
    }
  }

   

export const zero_knowledge_proof = {
    //Eerzeugen des Zero Knowledge Keys -> wird in der Datenbank gespeichert
    async password_to_zero_knowledge_key(passwort) {
        
        let p = getRandomPrime(10000);
        let q = getRandomPrime(10000);
        let n = p * q;
        let passwort_to_byteNumber = bytes_to_long(passwort);
        let zero_knowledge_number = powMod(passwort_to_byteNumber, 2, n);
        
        //create object zero_knowledge_key
        let zero_knowledge_key = {
            y: zero_knowledge_number,
            n: n
        }
        console.log("Zero Knowledge Key: " + zero_knowledge_key);

        return zero_knowledge_key;
    },
    

    //Überprüfung ob das eingegebene Passwort den gespeicherten Zero Knowledge Key entschlüsseln kann
    //Ja -> Passwort ist richtig ->return true
    //Nein -> Passwort ist falsch -> return false
    async check_zero_knowledge_key(entered_passwort, saved_zero_knowledge_key) {

        let eingegebenesPasswortInZahlen = bytes_to_long(entered_passwort);
        
        let zähler = 0
        let anzahl_der_iterationen = 16;

        for(let i=0; i<anzahl_der_iterationen; i++){

            let randomBasis = randomint(1, saved_zero_knowledge_key.n-1);
            let commitment = powMod(randomBasis, 2, saved_zero_knowledge_key.n);

            let challange = randomint(0, 1);

            let response = (randomBasis*Math.pow(eingegebenesPasswortInZahlen,challange))%saved_zero_knowledge_key.n;

            let bedingung1 = powMod(response, 2, saved_zero_knowledge_key.n);
            
            let bedingung2 = (commitment*Math.pow(saved_zero_knowledge_key.y,challange)) %saved_zero_knowledge_key.n; 
            

            if( bedingung1 == bedingung2) {

                zähler += 1
                console.log("Passed");
            }
            else {
                console.log("Failed");
                break;
            }
        }

        if(zähler == anzahl_der_iterationen){
            console.log("Beweisrunde erfolgreich")
            return true;
        }

        else {
            console.log("Beweisrunde NICHT erfolgreich")
            return false;
        }

    }

}


