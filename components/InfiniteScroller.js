import React, { PureComponent } from "react";
import { debounce } from "../utils";

class InfiniteScroller extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lastScrollPos: null
    };

    this.debunceFunction = debounce(this.handleScroll, 200);
  }
  componentDidMount() {
    this.scrollTo = document.querySelector(".app-container");
    this.initializeScrollContainer();
  }

  initializeScrollContainer = () => {
    this.scrollTo.addEventListener("scroll", this.debunceFunction);
  };

  componentWillUnmount() {
    this.scrollTo.removeEventListener("scroll", this.debunceFunction);
  }

  handleScroll = () => {
    let { isFetching, hasMore } = this.props;
    debugger;
    if (!isFetching && hasMore && this.isNearBottom()) {
      this.props.fetchMore(this.state.lastScrollPos, false); // pass the current scroll position of the container
    }
  };

  isNearBottom() {
    const EPSILON = 150;

    const viewPortTop = this.scrollTo.scrollTop;
    const bottomTop = this.scrollTo.scrollHeight - this.scrollTo.clientHeight;

    this.setState({
      lastScrollPos: viewPortTop
    });

    return viewPortTop && bottomTop - viewPortTop < EPSILON;
  }

  render() {
    return (
      <div>
        {this.props.isFetching ? (
          <div className="scroll-loader">
            Loading<span>.</span>
            <span>.</span>
            <span>.</span>
            <style jsx>{`
              .scroll-loader {
                text-align: center;
                padding: 10px;
                font-size: 24px;
                font-weight: bold;
              }

              .scroll-loader {
                text-align: center;
                font-size: 20px;
              }
              .scroll-loader span {
                animation: fadeout 1s linear infinite;
              }

              .scroll-loader span:nth-child(2) {
                animation-delay: 250ms;
              }

              .scroll-loader span:nth-child(3) {
                animation-delay: 500ms;
              }

              @keyframes fadeout {
                50% {
                  color: transparent;
                }
              }
            `}</style>
          </div>
        ) : null}
      </div>
    );
  }
}

export default InfiniteScroller;
