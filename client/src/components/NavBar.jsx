import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import Cookies from 'js-cookie';

function NavBar({ returnToView }) {
  const [isPrideMode, setIsPrideMode] = useState(null);

  useEffect(() => {
    // Cookie lesen und State setzen
    const savedMode = Cookies.get('theme');
    if (savedMode === 'pride') {
      setIsPrideMode(true);
    } else {
      setIsPrideMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsPrideMode((prevMode) => {
      const newMode = !prevMode;
      Cookies.set('theme', newMode ? 'pride' : 'default', { expires: 7 });
      return newMode;
    });
  };

  if (isPrideMode === null) {
    // Warten, bis der initiale Modus geladen wurde
    return null;
  }

  return (
    <Navbar
      sticky="top"
      expand="lg"
      className={isPrideMode ? 'bg-pride' : 'bg-default'}
    >
      <Container>
        <Navbar.Brand>
          <i
            className={
              isPrideMode
                ? 'bi bi-arrow-left-circle-fill h1 i-pride'
                : 'bi bi-arrow-left-circle-fill h1'
            }
            onClick={() => returnToView()}
          ></i>
        </Navbar.Brand>
        <label>
          <Toggle
            className="custom"
            defaultChecked={isPrideMode}
            icons={false}
            onChange={toggleTheme}
          />
        </label>
      </Container>
    </Navbar>
  );
}

export default NavBar;
