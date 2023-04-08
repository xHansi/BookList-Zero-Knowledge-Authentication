# Zero-Knowledge Proofs und deren Einsatz für Web-Authentifizierungen | Bachelorarbeit

## Johannes Erhard - Ostbayerische Technische Hochschule Regensburg

### BookList
Dies ist eine Beispiel-Webanwendung zur Verwendung von Zero-Knowledge-Authentifizierung für Online-Services. Sie wurde mit JavaScript, HTML und CSS sowie verschiedenen Frameworks und Bibliotheken erstellt, darunter Node.js, Hapi.js, Handlebars und JWT.

Das Authentifizierungsprotokoll dieser Anwendung gewährleistet, dass Benutzerdaten sogar vor dem Server geschützt bleiben. Die Anwendung bietet verschiedene Funktionen wie Benutzerregistrierung, Kontoverwaltung und Zero-Knowledge-Authentifizierung, die es den Benutzern ermöglicht, sich einzuloggen, ohne ihr Passwort oder andere vertrauliche Informationen preiszugeben. Zusätzlich ermöglicht die Anwendung das Speichern von Buchdaten und verfügt über ein Login-Feature, das sowohl Passwort-Authentifizierung als auch Zero-Knowledge-Authentifizierung unterstützt.

Diese Webanwendung wurde als Teil einer Bachelorarbeit zur Demonstration von Zero-Knowledge-Authentifizierung entwickelt und implementiert. Der Code ist gut strukturiert und dokumentiert.

### Verwendete Frameworks und Bibliotheken
- Hapi.js
- bcrypt
- Handlebars
- JWT
- Joi
- uuid
- dotenv
- Hapi-auth-jwt2
- Hapi-swagger
- Inert
- Vision
- Boom
- Cookie
### Installation und Ausführung 
#### Installation von Node.js
- Lade den für dein Betriebssystem geeigneten Installer von der [Node.js Webseite](https://nodejs.org/en/download/) herunter.
- Führe den Installer aus und folge den Anweisungen, um die Installation abzuschließen.
- Überprüfe, ob Node.js und npm (Node Package Manager) erfolgreich installiert wurden, indem du die folgenden Befehle in deiner Kommandozeile ausführst:

```bash
node -v
 ```
```bash 
npm -v
```

Die Ausgabe sollten die Versionsnummern von Node.js und npm sein, entsprechend.

Verwendung von npm um ein Projekt auszuführen
- Sobald Node.js und npm erfolgreich installiert sind, kannst du npm verwenden, um Projektabhängigkeiten zu installieren und Skripte auszuführen.
- Wechsle in das Stammverzeichnis von diesem Projekt in der Kommandozeile.
- Führe den folgenden Befehl aus, um alle Abhängigkeiten, die in diesem package.json-Datei deines Projekts aufgelistet sind, zu installieren:

```bash 
npm install
```

#### Ausführung
- Sobald die Abhängigkeiten installiert sind, kannst du folgenden Befehl verwenden um den Entwicklungsserver zu starten und das Projekt auszuführen:

```bash 
npm run start
```

- Danach öffne folgenden link um die Anwendung zu verwenden: ***http://localhost:3000***  
- Die API kann unter folgenden link mit Swagger getest werden: ***http://localhost:3000/documentation***