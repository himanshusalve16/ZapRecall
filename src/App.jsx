import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DeckView from './components/DeckView';
import { getTheme, saveTheme } from './utils/localStorage';
import './styles/index.css';

const App = () => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/deck/:id" component={DeckView} />
          <Route path="*">
            <div className="container">
              <div className="empty-state">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App; 