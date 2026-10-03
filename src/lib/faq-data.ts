export const FAQS = [
  {
    q: "Ersetzt Audit Assistant den Sachverständigen?",
    a: "Nein. Audit Assistant assistiert bei der Erstellung — Diktat, Fotos und Belege werden zu einem vollständigen Gutachten‑Entwurf zusammengeführt. Freigabe, fachliche Bewertung und Verantwortung bleiben beim Sachverständigen; die integrierte Kritik‑Stufe unterstützt die Prüfung vor Export.",
  },
  {
    q: "Welche Schadenarten deckt das Tool ab?",
    a: "Bau- und Versicherungsschäden: Wasserschaden, Brandschaden, Sturmschaden, Schimmel, Risse und vergleichbare Gutachten. KFZ‑ oder Fahrzeugschäden sind kein Anwendungsfall.",
  },
  {
    q: "Wie entsteht der Berichtsentwurf aus Diktat, Fotos und Belegen?",
    a: "Diktate werden im Hintergrund transkribiert, wobei fallbezogene Namen und Begriffe für eine genaue Erkennung an die Spracherkennung übergeben werden. Fotos werden der Anlage zugeordnet, Angebote und Rechnungen per OCR ausgelesen und als Text und Bild ins Gutachten übernommen. Daraus entsteht ein strukturierter Entwurf mit Kostentabelle und Experta‑Block.",
  },
  {
    q: "Was ist das Stilarchiv und wie wächst es?",
    a: "Jedes abgeschlossene Gutachten wird automatisch ins Stilarchiv übernommen; ältere Berichte lassen sich zusätzlich per Sammel‑Import einspielen. Eine hybride Suche liefert zitierfähige Ausschnitte aus dem eigenen Bestand, sodass der Baustil eines Hauses mit jedem Fall präziser wird.",
  },
  {
    q: "Werden eigene Berichtsvorlagen berücksichtigt?",
    a: "Ja. Ist eine eigene Freitext‑Vorlage hinterlegt, generiert Audit Assistant den Bericht danach; ohne eigene Vorlage greift automatisch eine gepflegte Standardvorlage.",
  },
  {
    q: "Welche Pläne gibt es und für wen sind sie gedacht?",
    a: "Solo (89 € / Monat) für Einzelsachverständige mit bis zu 15 Gutachten monatlich und eigenem Stilarchiv. Kanzlei (249 € / Monat) für Teams mit unbegrenzten Gutachten, mehreren Nutzern sowie geteiltem Stilarchiv und Vorlagen.",
  },
  {
    q: "Was unterscheidet Audit Assistant von einem generischen KI-Chatbot wie ChatGPT?",
    a: "Ein generischer Chatbot kennt weder die eigene Kanzlei noch ihren Berichtsstil. Audit Assistant arbeitet dagegen auf dem tenant-eigenen Stilarchiv — automatisch aus abgeschlossenen Fällen aufgebaut und per hybrider Suche mit zitierfähigen Ausschnitten durchsuchbar — und füllt dabei die eigene, im Vorlagen-Editor hinterlegte Berichtsvorlage statt einer generischen Textvorlage. Dieser kanzleieigene Datenbestand lässt sich nicht kopieren, ohne dieselben Fälle über Jahre selbst bearbeitet zu haben.",
  },
  {
    q: "Wie unterscheidet sich Audit Assistant von anderer Gutachten-Software?",
    a: "Der Unterschied liegt nicht in einem einzelnen Feature, sondern in der Kombination: automatische Foto-Zuordnung, OCR von Angeboten und Rechnungen sowie satzgenaue Bildplatzierung laufen in einer einzigen Generierungspipeline zusammen, während Diktat-Transkription und Stilarchiv-Import als Hintergrundjobs parallel zum Fall weiterarbeiten. Je mehr abgeschlossene Gutachten eine Kanzlei einbringt, desto präziser wird das eigene Stilarchiv — ein Vorsprung, der mit jedem Fall wächst.",
  },
  {
    q: "Lässt sich Audit Assistant aus einer eigenen KI-Assistenz-Plattform heraus ansteuern?",
    a: "Ja. Die Gutachten-Erstellung ist als Werkzeugsatz für KI-Assistenten nutzbar und lässt sich damit in eine bestehende Assistenz-Umgebung einbinden, statt nur als isoliertes Formular-zu-Dokument-Tool zu funktionieren.",
  },
] as const;
