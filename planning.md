# Kita App

App für die Kommunikation zwischen Kita, Erziehern und Eltern.

##Must have
- User-Anmeldung
- Kita erstellen
- Gruppen erstellen
- Erzieher einladen und zuordnen
- Kinder anlegen und Gruppen zuordnen
- Eltern mit Kindern verlinken
- Allgemeine Infos
- Gruppen Infos
- Kinder abmelden
- Übersicht aller Verlinkungen für KitaAdmin (User mit Kita, Eltern mit Kindern)

##Should have
- FAQ
- Foren

##Nice to have
- Fundbüro
- Inventarlisten der Gruppen
- Bilder hochladen
- Termine
- Mitbringlisten
- Feedback
- Dokumente hochladen
- Frontend komplett in TS

##Umsetzung
###Woche 1
####Initialisierung
1. Backend aufsetzen
   1. Spring Boot Backend aufsetzen und lauffähig haben
   2. Backend an Mongo DB anbinden
2. Frontend aufsetzen
   1. React Frontend mit TS erstellen
3. Spring Security einrichten
4. Fertigen Build (FE und BE) in Git und Heroku hochladen
5. App bei Heroku mit React Beispiel Form lauffähig haben 
   1. Heroku Systemvariable einrichten
6. Git Main Branch finalisieren

####Userverwaltung aufbauen (BE)
1. User Controller aufbauen
   1. Sign In
   2. Log In
2. User Service aufbauen
   1. Mongo DB Repo
   2. User Adden
   3. User auslesen
3. Security für User anpssen
   1. UserDetails
   2. Sign In und Log In routen
   3. JWT

####Indexpage und Login/Sign in (FE)
1. Main Page erstellen
2. Sign In
3. Log In
4. User Page
5. Logout

####Allgemeine User Page
1. Ansicht eigener User
2. Reiter im Header
   1. Kita
   2. Gruppe
   3. Kinder

####Kitaverwaltung (BE)
1. Controller und Service anlegen
   1. neue Kita anlegen
   2. Kita Infos abfragen
   3. Kita löschen
2. Kita mit User verknüpfen
3. (Andere User für Verwaltung der Kita einladen und berechtigen)

####Kita Page (FE)
1. Form Kita anlegen
2. Kita Reiter in User Page einbinden
3. Kita Page erstellen
   1. Kita Name
   2. Adresse

####Gruppenverwaltung (BE)
1. Gruppencontroller und Service anlegen
   1. neue Gruppe anlegen
   2. Gruppen auslesen
      1. einzelnen Gruppen
      2. alle mit Kita verknüpfte Gruppen
   3. Gruppen editieren
   4. Gruppen Löschen
2. Gruppen mit Kita verknüpfen

####Gruppenansicht in der Kita Ansicht (FE)
1. Gruppen Ansicht
2. Alle Gruppen einer Kita
3. Gruppen Reiter in die Kita Ansicht

####Kinderverwaltung (BE)
1. entsprechende Controller und Services einrichten
   1. Kinder anlegen und Gruppen zuordnen (ohne Gruppen in der Kita nicht möglich)
   2. Kinder editieren
   3. Kinder auslesen mit Gruppen, alle Kinder in einer Kita

####Kinder ansicht im (FE
1. Kinderansicht
2. Alle Kinder einer Gruppe
3. Alle Kinder einer Kita

####Erzieherverwaltung (BE)
1. Erzieher in Kita einladen
2. Link von Kita Richtung Erzieher
3. Link von Erzieher Richtung Kita
4. Erzieher Gruppen zuordnen
5. Erzieher rechte für Gruppen geben

####Erzieher Ansicht (FE)
1. 

####Elternverwaltung (BE)
1. 





##App Aufbau

###Backendaufbau

####User Tabelle
1. Userdaten
   1. First Name
   2. Last Name
   3. Email
   4. Password
2. Rollen
   1. Kita Admin (vorerst nur ein Admin pro Kita)
   2. Erzieher (vorerst nur einer Kita zugeordnet)
   3. Eltern (meherer Kinder)
3. Zuordnung Kita (vorerst nur eine Kita pro User)
4. Zuordnung Gruppen (über Kinder oder Kita)
5. Zuordnung Kinder nur für Eltern

####Kita Tabelle
1. Kiatdaten
   1. Name
   2. Adresse
2. Admin
3. Liste Gruppen
4. Liste Erzieher
5. Liste Kinder
6. Liste Eltern

####Gruppen Tabelle
1. Gruppendaten
   1. Name
   2. (Bereich)
2. Liste mit Kindern
3. Liste mit Erziehern

####Kinder Tabelle
1. Kinder Daten
   1. First Name
   2. Last Name
   3. Kita
   4. Gruppe
   5. Geburtsdatum
2. Abwesend

   
   
 
###Frontendaufbau
1. Nav im Header
   1. Link auf zu User gehörende Sektionen
      1. Kita
      2. Gruppe
      3. Kinder
      4. Eltern
2. Nav am linken rand
   1. Links für verschiedene Ansichten je nach Userstatus
   2. Beispiel Kita
      1. Stammdaten
      2. Infos
      3. Mitarbeiter
      4. Gruppen
      5. Kinder
      6. Eltern
3. 





##BrainStorming

User Anmeldung:
- jeder kann sich einen User erstellen

Neue Kita erstellen: (ggf. Berechtigung Kita-Erstellung über Link)
- Erstellen einer neuen Kita
  - Berechtigungen zu Verwaltung vergeben 
  - Gruppen erstellen
  - Kinder anlegen und Gruppen zuordnen
    - Eltern per Link Kindern zuordnen
  - Erzieher einladen und Gruppen zuordnen

##Features

Allgemeine Kommunikation zwischen Kita, Erziehern und Eltern
- Infos der Kita (1)
- Essenspläne (1)
- Krankmeldung der Kinder durch Eltern (1)
- Infos zu den einzelnen Gruppen (2)
- FAQ
- Foren
- (Direkt Chat)

##Rollen
1. User
2. Kita Admin
3. Kita Mitarbeiter
4. Erzieher
5. Eltern

##Elemente
1. Kita
   1. Gruppen
      1. Erzieher
      2. Kinder
         1. Eltern

##Pages
1. Sign, Login
2. Useransicht
   1. zugehörige Kitas
   2. zugehörige Kita Gruppen
   3. zugehörige Kinder
   4. zugehörige Erzieher
3. Gruppenansicht
   1. Informationen zu Aktivitäten
   2. zu Veranstaltungen
4. Kita-Ansicht
   1. Essenspaln
   2. Allgemeine Informationen
5. Elternansicht
   1. Abmelden der Kinder
   2. Weitere Informationen
6. Kinder Ansicht
   1. Elternsicht
   2. Erzieher-Sicht
   3. Kita-Sicht
7. Erzieher-Ansicht
   1. Gruppen
   2. Kinder

##Funktionen
1. anlegen einer Kita
   1. Gruppen anlegen
      1. Kinder anlegen
         1. Eltern einladen
      2. Erzieher einladen
2. Eltern verlinken
3. Erzieher verlinken
### Funktionen Eltern
1. Kind abmelden
### Funktionen Kita
1. Essenspläne hochladen
2. Allgemeine Infos raus geben
### Funktionen Erzieher
1. Infos raus geben


##Rollen
1. User
Jeder kann sich einen User anlegen
2. Kita Admin
Durch das Anlegen einer Kita wird man zum Admin dieser Kita (ggf. mehrere Kitas)
Der Kita Admin kann weitere Mitarbeiter einladen und deren Rechte vergeben, auch Admin recht
3. Kita Mitarbeiter
Werden durch den Admin eingeladen, und verwaltet
4. Erzieher
Werden per Link einer Kiat zugeordenet. Der Linkt wird von einem Kitamitarbeiter vergeben
5. Eltern
Werden per Link mit ihren Kindern verknüpft. Der Linkt wird von einem Kitamitarbeiter vergeben 

##Elemente
1. Kita
- Adresse
- Kontaktdaten
- hat Gruppen
  - hat Erzieher
  - hat Kinder
  1. Gruppen
  
      1. Erzieher
      2. Kinder
          1. Eltern

##Pages
1. Sign, Login
2. Useransicht
    1. zughörige Kitas
    2. zugehörige Kita Gruppen
    3. zugehörige Kinder
    4. zugehörige Erzieher
3. Gruppenansicht
    1. Informationen zu Aktivitäten
    2. zu Veranstaltungen
4. Kita-Ansicht
    1. Essenspaln
    2. Allgemeine Informationen
5. Elternansicht
    1. Abmelden der Kinder
    2. Weitere Informationen
6. Kinder Ansicht
    1. Elternsicht
    2. Erzieher-Sicht
    3. Kita-Sicht
7. Erzieheransicht
    1. Gruppen
    2. Kinder

##Funktionen
1. anlegen einer Kita
    1. Gruppen anlegen
        1. Kinder anlegen
            1. Eltern einladen
        2. Erzieher einladen
2. Eltern verlinken
3. Erzieher verlinken
### Funktionen Eltern
1. Kind abmelden
### Funktionen Kita
1. Essenspläne hochladen
2. Allgemeine Infos raus geben
### Funktionen Erzieher
1. Infos raus geben


Brainstorming für die Zukunft:
1. Gruppeninventarlisten
2. Bewerbungen
3. Foren
4. FAQ
5. Direkt Chat


