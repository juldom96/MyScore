import { Button } from 'react-bootstrap';
function Modal({ onSubmit, onCancel, children }) {
  return (
    <>
      {children}
      <div className="d-grid gap-2">
        <Button variant="secondary" onClick={onSubmit}>
          JA
        </Button>
        <Button variant="danger" onClick={onCancel}>
          ABBRECHEN
        </Button>
      </div>
    </>
  );
}

export default Modal;
