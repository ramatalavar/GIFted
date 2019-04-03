import React, { PureComponent, Fragment } from "react";

class Gif extends PureComponent {
  render() {
    const { url, title, status, id } = this.props;
    return (
      <Fragment>
        <figure>
          <img
            src={url}
            alt={title}
            width="200"
            height="200"
            data-status={status}
            data-id={id}
          />
        </figure>
        <style jsx>{`
          figure {
            margin: 1rem 0;
          }

          img {
            cursor: pointer;
          }

          @media screen and (max-width: 420px) {
            img {
              width: 100%;
              min-width: 363px;
            }
          }
        `}</style>
      </Fragment>
    );
  }
}

export default Gif;
