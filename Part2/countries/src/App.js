import axios from "axios";
import { useEffect, useState } from "react";
import { Filter, Content } from "./components";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      const data = response.data;
      setCountries(data);
    });
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  return (
    <>
      <Filter value={filter} onChange={handleInputChange} />
      <Content countries={countries} country={filter} />
    </>
  );
}

export default App;
