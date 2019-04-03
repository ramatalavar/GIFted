import React, { PureComponent } from "react";

class Search extends PureComponent {
  render() {
    const { query, handleSearch } = this.props;
    return (
      <div className="header">
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
