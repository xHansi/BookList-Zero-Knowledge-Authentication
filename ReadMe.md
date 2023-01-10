# Zero-Knowledge Proofs und deren Einsatz für Web-Authentifizierungen | Bachelorarbeit

## Johannes Erhard - Ostbayerische Technische Hochschule Regensburg

### BookList
BookList ist eine simple Webanwendung, die deren Usern ermöglicht, Daten über Bücher zu Speichern. Die Besonderheit der Anwendung ist, dass sie für das Login-Feature für User, eine Passwort-Authentifizierung und eine Zero-Knowledge-Authentifizierung verfügt. Diese Anwendung wurde zur Zero-Knowledge Demonstration für eine Bachelorarbeit implementiert.

### Installation und Ausführung 
#### Installation von Node.js
- Lade den für dein Betriebssystem geeigneten Installer von der [Node.js Webseite](https://nodejs.org/en/download/) herunter.
- Führe den Installer aus und folge den Anweisungen, um die Installation abzuschließen.
- Überprüfe, ob Node.js und npm (Node Package Manager) erfolgreich installiert wurden, indem du die folgenden Befehle in deiner Kommandozeile ausführst:

```bash
 node -v
 ```
```
bash npm -v
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
- Die API kann unterfolgenden link mit Swagger testen: ***http://localhost:3000/documentation***