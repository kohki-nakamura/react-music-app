import React from "react";
import { getMusics } from "../api";

// components
import ErrorPage from "../components/modules/error";
import NoResult from "../components/modules/no_result";
import Result from "../components/modules/result";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      resultType: "init"
    };
  }

  handleInputChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  onSearch() {
    getMusics(this.state.keyword)
      .then(res => {
        const { data } = res;
        if (data.resultCount === 0) {
          this.setState({
            resultType: "no_result"
          });
        } else {
          this.setState({
            resultType: "success"
          });
        }
      })
      .catch(err => {
        this.setState({
          resultType: "failure"
        });
      });
  }

  switchView(resultType) {
    switch (resultType) {
      case "no_result":
        return <NoResult />;
      case "success":
        return <Result />;
      case "failure":
        return <ErrorPage />;
      default:
        return <p>検索してみよう！</p>;
    }
  }

  render() {
    const Comp = this.switchView(this.state.resultType);
    return (
      <div>
        <div className="search-area">
          <input
            type="text"
            className="search-input"
            value={this.state.keyword}
            onChange={this.handleInputChange.bind(this)}
          />
          <button className="search-button" onClick={this.onSearch.bind(this)}>
            検索
          </button>
        </div>
        {Comp}
      </div>
    );
  }
}