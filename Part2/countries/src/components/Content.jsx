import React from "react";
import { CountryInfo } from "./CountryInfo";
import { SingleCountry } from "./SingleCountry";

export const Content = ({ countries, country }) => {
  let filterCountry = [];

  if (country.length > 0) {
    filterCountry = countries.filter((element) =>
      element.name.toLowerCase().includes(country.toLowerCase())
    );
  } else {
    filterCountry = countries;
    return (
      <div>
        {filterCountry.map((element) => (
          <p>{element.name}</p>
        ))}
      </div>
    );
  }

  if (filterCountry.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filterCountry.length > 2 && filterCountry.length <= 9) {
    return (
      <div>
        {filterCountry.map((element) => (
          <div>
            <SingleCountry country={element} />
          </div>
        ))}
      </div>
    );
  }
  if (filterCountry.length === 1) {
    return <CountryInfo country={filterCountry[0]} />;
  }
};
