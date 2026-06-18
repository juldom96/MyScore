export const dummyGames = [
  {
    _id: 'game-1',
    name: 'Yatzee Light',
    rows: [
      { id: '1', name: 'Einsen', info: 'Summe aller gewürfelten Einsen eintragen' },
      { id: '2', name: 'Zweien', info: 'Summe aller gewürfelten Zweien eintragen' },
      { id: '3', name: 'Dreien', info: 'Summe aller gewürfelten Dreien eintragen' },
      { id: '4', name: 'Vieren', info: 'Summe aller gewürfelten Vieren eintragen' },
      { id: '5', name: 'Fünfen', info: 'Summe aller gewürfelten Fünfen eintragen' },
      { id: '6', name: 'Sechsen', info: 'Summe aller gewürfelten Sechsen eintragen' },
    ],
  },
  {
    _id: 'game-2',
    name: 'Everdell',
    rows: [
      { id: '1', name: 'Kartenpunkte', info: 'Summe der Siegpunkte für ausgespielte Karten' },
      { id: '2', name: 'Wohlstand', info: 'Summe der Bonuspunkte durch Wohlstandskarten' },
      { id: '3', name: 'Punkte-Marker', info: 'Summe der Punkte aller Punktemarker im persönlichen Vorrat und ggfs. auf den ausgespielten Karten' },
      { id: '4', name: 'Reise', info: 'Summe der Punkte für Arbeiter auf Reise-Feldern' },
      { id: '5', name: 'Einfache Ereignisse', info: 'Summe der Spiegpunkte für erledigte einfache Ereignisse' },
      { id: '6', name: 'Besondere Ereignisse', info: 'Summe der Spiegpunkte für erledigte besondere Ereignisse' },
    ],
  },
  {
    _id: 'game-3',
    name: 'Everdell New Leaf',
    rows: [
      { id: '1', name: 'Kartenpunkte', info: 'Summe der Siegpunkte für ausgespielte Karten' },
      { id: '2', name: 'Wohlstand', info: 'Summe der Bonuspunkte durch Wohlstandskarten' },
      { id: '3', name: 'Punkte-Marker', info: 'Summe der Punkte aller Punktemarker im persönlichen Vorrat und ggfs. auf den ausgespielten Karten' },
      { id: '4', name: 'Reise', info: 'Summe der Punkte für Arbeiter auf Reise-Feldern' },
      { id: '5', name: 'Einfache Ereignisse', info: 'Summe der Spiegpunkte für erledigte einfache Ereignisse ' },
      { id: '6', name: 'Besondere Ereignisse', info: 'Summe der Spiegpunkte für erledigte besondere Ereignisse' },
      { id: '7', name: 'Besucher', info: 'Summe der Spiegpunkte für erfüllte Bedingungen auf Besucher-Karten' },
    ],
  },
  {
    _id: 'game-4',
    name: 'Die verlorenen Ruinen von Arnak',
    rows: [
      { id: '1', name: 'Forschungspunkte', info: 'Punkte entsprechend der Position der Lupe und des Notizbuchs' },
      { id: '2', name: 'Tempelplättchen', info: 'Summe der Punkte für Tempelplättchen' },
      { id: '3', name: 'Totems', info: 'Summe der Punkte für Totems (je 3) und leere Totemfelder.' },
      { id: '4', name: 'Wächter', info: 'Summe der Punkte für bezwungende Wächter (je 5)' },
      { id: '5', name: 'Karten', info: 'Summe der Punkte für gekaufte Gegenstände und Artefakte' },
      { id: '6', name: 'Furcht', info: 'Summe der Minuspunkte für Furchtkarten (je -1)' },
    ],
  },
];

export const dummyPlayers = [
  { _id: 'player-1', name: 'Jule', color: 'blue', avatar: 'weasel.png', played_games: [] },
  { _id: 'player-2', name: 'David', color: 'green', avatar: 'giraffe.png', played_games: [] },
];
