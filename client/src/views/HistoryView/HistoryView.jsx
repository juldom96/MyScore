import NavBar from '../../components/NavBar';
import ViewContainer from '../../components/ViewContainer';
import SingleHistoryEntry from './SingleHistoryEntry';

export default function HistoryView({ history, goToStartView, players }) {
  return (
    <>
      <NavBar returnToView={goToStartView}></NavBar>
      <ViewContainer>
        <h1>Spielhistorie</h1>
        {history && (
          <>
            <hr></hr>
            {history
              .sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
              })
              .map((historyElement) => {
                return (
                  <SingleHistoryEntry
                    key={historyElement.date}
                    historyElement={historyElement}
                    players={players}
                  />
                );
              })}
          </>
        )}
        {(!history || history.length === 0) && (
          <>
            <h2>Noch keine Einträge vorhanden</h2>
            <p>
              Spiele eine Partie und sieh dir danach hier die Ergebnisse an.
            </p>
          </>
        )}
      </ViewContainer>
    </>
  );
}
