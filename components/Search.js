import React, { PureComponent } from "react";
import ThemeSwitch from "react-switch";

class Search extends PureComponent {
  render() {
    const { query, handleSearch, onChangeTheme, isLightTheme } = this.props;
    return (
      <div className="header">
        <div className="theme-switch">
          <div>Theme: {isLightTheme ? "Light" : "Dark"}</div>
          <ThemeSwitch
            onChange={onChangeTheme}
            checked={isLightTheme}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        </div>
        <h2>Welcome to GIFted.</h2>
        <p>To search for GIFs type the keyword below</p>
        <input
          type="text"
          name="searc-gif"
          onChange={handleSearch}
          value={query}
          autoFocus
        />

        <style jsx>{`
          .header {
            display: inline-flex;
            flex-direction: column;
          }

          .theme-switch {
            text-align: right;
          }

          .header input {
            padding: 10px;
            font-size: 1.5rem;
            border: 2px solid #ccc;
          }
        `}</style>
      </div>
    );
  }
}

export default Search;
