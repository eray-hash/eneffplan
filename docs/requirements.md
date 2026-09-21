# Lastenheft (Entwurf) – CRM/ERP-System für Energieeffizienz-Planungsbüro

Stand: 2026-09-21, destilliert aus dem Transkript des Kundengesprächs (Kickoff-Call).
Dies ist eine Arbeitsgrundlage zur Freigabe – bitte gegenlesen und korrigieren.

## 1. Kunde / Kontext

- Planungsbüro für Energieeffizienz/Bauphysik (u. a. Wärmeschutznachweise, Gebäudesimulationen, energetische Sanierungsplanung, BAFA-Anträge/Vollmachten).
- Team: 6 aktiv operative Personen (5 Fachkräfte + Geschäftsführer selbst), plus Buchhaltung (Teilzugriff) und 1 Geschäftsentwickler für Akquise (Schweiz) = 8 Personen gesamt. Vormals auch Standort Türkei, aktuell reduziert.
- Volumen: ca. 80–100 Projekte/Jahr; aktuell ca. 450 Projekte im Bestand (aktiv, stand-by, abgeschlossen gemischt). Projektlaufzeiten von wenigen Wochen bis mehreren Jahren.

## 2. Zielbild: vollständige Tool-Konsolidierung

Ausdrücklich bestätigtes Ziel: **alle vier aktuell aktiv genutzten Tools werden vollständig durch das neue CRM abgelöst**, nicht nur ergänzt:

- Crewmeister (Zeiterfassung) – Ablösegrund ist Tool-Fragmentierung, nicht ein funktionaler Mangel.
- Lexware (Angebote/Rechnungen) – vollständige Ablösung möglich, da aktuell ohnehin keine Steuerberater-/DATEV-Schnittstelle besteht.
- Excel (Projektübersicht + Controlling/Kosten) – wird durch Dashboard ersetzt.
- OneDrive (Dokumentenablage) – Dokumente werden ins CRM migriert; macht eigenes (DSGVO-konformes) Hosting nötig, z. B. Hetzner.
- Microsoft Planner (Aufgabenverteilung) – zwar aktuell nicht mehr aktiv genutzt (siehe 2.1), zählt aber ebenfalls zu den abzulösenden Systemen, damit dessen Schwachstellen (fehlende Automatisierung bei Remote-Mitarbeitenden) im neuen System nicht wiederholt werden.

Insgesamt also 5 Systeme, die im Zielbild vollständig im neuen CRM aufgehen: Crewmeister, Lexware, Excel (2 Tabellen), OneDrive, Microsoft Planner.

## 2.1 Ist-Zustand (aktuelle Tool-Landschaft)

| Tool | Zweck | Status |
|---|---|---|
| Crewmeister | Zeiterfassung (Ein-/Ausstempeln, Pausen, Projektauswahl, Urlaub) | funktioniert grundsätzlich, aber isoliert von allem anderen |
| Microsoft Planner | Aufgabenverteilung (Kanban) | aufgegeben – manuelle Pflege bei Remote-Mitarbeitenden hat nicht mehr funktioniert |
| Excel „Projektübersicht" | Projektstatus (offen / wartet auf Kundenrückmeldung / abgeschlossen / Rechnung raus) | manuell, fehleranfällig |
| Excel „Controlling/Kosten" | Stunden je Mitarbeiter, individueller interner Stundensatz, Gesamtkosten, Verkaufspreis, Marge je Projekt | manuell, getrennt von Projektübersicht |
| Lexware | Angebots- und Rechnungserstellung | keine Bank-Anbindung, keine Steuerberater-Schnittstelle |
| OneDrive | Dokumentenablage je Kunde/Projekt | gut strukturiert, soll ins neue System migriert werden |
| Odoo | seit Sommer 2026 getestet (Demo) | kein Vertrag, zu generisch/komplex für die konkreten Bedürfnisse |

## 3. Kernprobleme

1. Rechnungsstellung nach Meilenstein läuft komplett manuell → fehleranfällig (konkreter Vorfall: eine Rechnung aus 2024 wurde vergessen, weil das Projekt nicht getrackt war).
2. Kein einheitlicher Blick, welche Projekte gerade auf Kundenrückmeldung warten und nachgefasst werden müssen.
3. Aufgabenverteilung/Ressourcenplanung ist seit dem Planner-Ausstieg nicht mehr sauber abgebildet, läuft über wöchentliche Absprache – funktioniert nur für Vor-Ort-Mitarbeitende, nicht für Homeoffice.
4. Zwei getrennte Excel-Tabellen mit Redundanzen, kein Dashboard, keine Filterfunktion, kein Self-Service für Mitarbeitende.
5. Kein automatisches Mahnwesen.
6. Keine Pipeline-/Forecast-Übersicht für erwartete Einnahmen und keine Kapazitätsplanung bei neuen Projektanfragen.

## 4. Funktionale Anforderungen an das neue System

### 4.1 Kunden- & Projektstruktur
- Neuanlage Kunde → automatisch neues Projekt/neue Kostenstelle (fortlaufende Nummer).
- Hierarchie: Kunde → Projekt → Teilaufgaben → Meilensteine.
- Standard-Aufgabenkatalog (ca. 30 Unteraufgaben) als Vorlage, wird bei jedem Neuprojekt automatisch angelegt.
- Anpassbar über Vorlagen-Varianten/"Kundenprofile" (z. B. nicht alle 30 Aufgaben nötig, oder zusätzliche Aufgaben bei Sonderfällen) – Ziel: 80–90 % der Fälle mit Standardvorlage abdecken, Rest manuell anpassen.
- Jede Aufgabe ist mit einer Angebotsposition verknüpft (Stundenschätzung fließt gleichzeitig ins Angebot und wird zum Stundenbudget der zugewiesenen Person).

### 4.2 Angebotserstellung
- Angebot wird intern auf Basis von Stundenschätzungen je Position kalkuliert, dem Kunden aber pauschal/verkürzt dargestellt (keine Offenlegung von Stundensätzen).
- Bei Angebotsfreigabe: automatische Anlage der zugehörigen Aufgaben inkl. Stundenbudget.
- Vorlagen/Textbausteine je Standardposition (z. B. "Wärmeschutznachweis" = 3 Teilschritte mit Stunden).
- Einheitliche Briefvorlage (Kopf-/Fußzeile) für Angebote, Rechnungen, Mahnungen.
- Digitale Vollmacht-Unterschrift per Link (Signatur auf dem Smartphone), z. B. für BAFA-Vollmachten.

### 4.3 Zeiterfassung
- Ein-/Ausstempeln, Pausenfunktion (manuell; Auto-Lock nach Inaktivität wurde als Option genannt).
- Zwei Modelle wurden diskutiert, **Entscheidung noch offen**:
  - (a) Grobmodell: Tagesstempel (z. B. 8 Std.), aktive Projektauswahl bei Bearbeitung, Rest-Zeit fällt automatisch auf interne Kosten.
  - (b) Feinmodell: jede Arbeitsminute wird direkt einem Projekt/einer Aufgabe zugeordnet.
- Zuordnung von Minderstunden (z. B. Aufgabe in 4 statt 8 Std. erledigt) zur internen Kostenstelle soll **nicht automatisch** erfolgen, sondern von Geschäftsführung/Projektleitung entschieden werden (bewusste Anforderung, kein Bug).
- Mitarbeitende sehen nur ihr eigenes Stundenbudget je Aufgabe, keine Stundensätze/Kosten/Margen.
- Geschäftsführung/Buchhaltung sehen zusätzlich: individuellen internen Stundensatz je Mitarbeiter (zeitlich versioniert – Änderungen gelten nur ab dem Änderungsdatum, nicht rückwirkend), Verkaufspreis, Marge je Projekt.
- Zugewiesene Aufgaben mit Stundenbudget erscheinen automatisch im Kalender der zuständigen Person (geblockte Zeit bis Fälligkeitsdatum).
- Urlaubs-/Abwesenheitsverwaltung wie bisher in Crewmeister.

### 4.4 Meilenstein- & Rechnungsautomatisierung
- Definierbare Meilensteine pro Aufgabenblock (z. B. 3 Teilaufgaben abgeschlossen = Meilenstein 1).
- Bei Abschluss aller Aufgaben eines Meilensteins: automatische Benachrichtigung/Freigabe an Buchhaltung zur (Teil-)Rechnungsstellung, prozentual gemäß Angebot.
- Ziel: Lexware ablösen oder zumindest eng anbinden (Bankkonto-Sync für Zahlungsabgleich; DATEV/Steuerberater-Schnittstelle existiert aktuell nicht).
- Automatisches Mahnwesen mit Eskalationsstufen (freundliche Erinnerung → 1./2./3. Mahnung), gekoppelt an Zahlungsabgleich über das Bankkonto.

### 4.5 Projekt-Tracking & Follow-up
- Filterbare Übersicht: Projekte mit offener Kundenrückmeldung (Blocker), Projekte ohne Aktivität seit X Zeit (Follow-up-Kandidaten für Anruf), abgeschlossene Projekte, Projekte mit fälliger aber nicht gestellter Rechnung.
- Ziel: keine vergessenen Meilensteine/Rechnungen mehr.

### 4.6 Controlling & Pipeline
- Ablösung der zwei Excel-Tabellen durch ein Dashboard mit Filtern und Export (Excel/PDF).
- Kosten- vs. Umsatz-/Margenübersicht je Projekt, je Mitarbeiter, je Zeitraum.
- Pipeline/Forecast erwarteter Einnahmen anhand geplanter Meilenstein-Termine (für Liquiditätsplanung).
- Kapazitätsplanung: aktuelle Auslastung vs. Aufnahme neuer Projekte.

### 4.7 Rollenbasierte Dashboards
- Mitarbeitende: eigene Aufgaben, Stundenbudgets, Zeiterfassung, Kalender.
- Geschäftsführung/Buchhaltung: alle Projekte, Kosten, Margen, Rechnungen, Mahnwesen, Pipeline.
- Admin-Bereich: Mitarbeitende anlegen/bearbeiten inkl. individuellem, zeitlich versioniertem Stundensatz.

### 4.8 Dokumentenverwaltung
- Migration/Anbindung der bestehenden OneDrive-Ordnerstruktur pro Kunde/Projekt in das neue System.

### 4.9 Sonstiges
- Mobile Nutzung (App/Web) für unterwegs.
- Hilfebereich/Onboarding-Dokumentation im System für neue Mitarbeitende.
- Hosting: DSGVO-konform; Hetzner (Nürnberg) wurde als Vorschlag genannt.

### 4.10 Explizit NICHT gewünscht
- Keine KI, die Telefonate/Meetings mitschneidet oder E-Mails automatisch zusammenfasst – bewusste Entscheidung des Kunden, eigene Notizen werden bevorzugt.
- Sprachassistent-Feature ("Jarvis"-artig: Projektstatus per Sprache abfragen, Aufgaben per Sprachbefehl verteilen) **ist explizit nicht Teil des ersten Bauabschnitts** (Entscheidung 2026-09-21). Es taucht im Angebot für den Kunden nur als optionaler Zusatzposten auf, nicht als Teil der Kernkalkulation/des Kernaufwands.
- Kein Leistungsverzeichnis-Modul nötig (Kunde arbeitet nicht mit klassischen LVs, sondern individuellen Angeboten je Bauvorhaben).
- Keine automatische Stundenschätzung/Konfigurator für Angebote (z. B. nach Gebäudetyp) – Schätzung bleibt bewusst manuell pro Projekt.

## 5. Priorisierung (vom Kunden genannt, alle vier als etwa gleich wichtig)

1. Automatisierte Meilenstein-→-Rechnungs-Pipeline (aktuell größter Schmerzpunkt).
2. Projekt-Tracking-Übersicht (Blocker/Follow-up-Kandidaten erkennen).
3. Aufgaben-/Ressourcenverteilung (Ersatz für den gescheiterten Planner-Ansatz).
4. Zusammenführung der zwei Controlling-Excel-Tabellen in ein Dashboard.

## 6. Offene Punkte (Klärung erforderlich)

- Exaktes Zeiterfassungsmodell: Grobmodell (Tagesstempel) vs. granulare Live-Zuordnung je Aufgabe.
- Umgang mit Minder-/Überstunden und deren Zuordnung zur internen Kostenstelle (bewusst kein Automatismus – Regel muss definiert werden).
- Umfang der Lexware-Ablösung vs. reiner Anbindung (Bankkonto-Sync, ggf. spätere Steuerberater-Schnittstelle).
- Vertragsstatus mit Odoo (kein Vertrag unterschrieben – ggf. als Vergleichsangebot relevant).
- Detailausgestaltung der Vorlagen-Varianten je Kundentyp (Einfamilienhaus vs. Mehrfamilienhaus vs. Sonderkunde).

## 6.1 Liefergegenstand dieser Angebotsphase (Klärung 2026-09-21)

Wichtig: In dieser Phase wird noch **kein** funktionierendes System gebaut, sondern:

1. **Mockup** – klickbares Look-and-Feel des CRM (UI/UX), keine echte Backend-Funktionalität. So im Transkript bestätigt.
2. **Aufwandsabschätzung / Angebot** – was kostet der tatsächliche Bau des Systems (einmalig)?
3. **Laufende monatliche Kosten** – Hosting/Betrieb (z. B. Hetzner) und ggf. weitere laufende Posten.
4. **ROI-Rechnung** – Gegenüberstellung von Kosten und Nutzen (z. B. eingesparte manuelle Aufwände, vermiedene verpasste Rechnungen) für die Entscheidung des Kunden.

Punkte 3 und 4 sind eine bewusste Ergänzung zum Gesprächsstand (im Transkript war nur allgemein von einer "groben Preisschätzung" die Rede) und wurden am 2026-09-21 zusätzlich als Scope für dieses Angebot festgelegt.

**Angebotsstruktur (Entscheidung 2026-09-21):** Das Angebot bekommt zwei Ebenen — Kernaufwand (alles aus Abschnitt 4 außer 4.10) für die Kalkulation, plus einen separat ausgewiesenen **optionalen Zusatzposten "Sprachassistent"**, den der Kunde bei Bedarf zubuchen kann. Er fließt nicht in die Kern-Aufwandsschätzung/den Kern-Stundenaufwand ein.

## 7. Vereinbarte nächste Schritte (aus dem Gespräch)

- Kunde liefert: die 2 Excel-Vorlagen (Controlling, Projektübersicht) mit Spaltenstruktur + ein schriftliches Lastenheft/eine Wunschliste per E-Mail.
- Anbieter liefert bis Freitag: Mock-up + grobe Preisschätzung.
- Folgetermin: 27. Oktober 2026, 8:30 Uhr.

## Hinweis zur Quelle

Dieses Dokument basiert auf einem automatisch erzeugten Sprache-zu-Text-Transkript eines Meetings. Einzelne Begriffe/Namen im Original waren unklar oder fehlerhaft transkribiert (Spracherkennungsfehler); an Stellen mit Unsicherheit wurde die naheliegendste Interpretation gewählt. Bitte gegenprüfen, insbesondere bei Abschnitt 6.
