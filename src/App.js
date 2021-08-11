import { Component } from "react";
import "./App.css";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    this.getMonsters();
  }

  getMonsters = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const monsters = await response.json();
    this.setState({ monsters });
  };

  handleChange = async (e) => {
    const searchKeyword = e.target.value;
    await this.setState({ searchField: searchKeyword });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toUpperCase().includes(searchField.toUpperCase())
    );

    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder="Search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
