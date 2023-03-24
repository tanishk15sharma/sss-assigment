import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { WeatherDetails } from "./components/WeatherDetails";

const Wrapper = styled.section`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #756bea;
  margin-bottom: 8px;
`;

const InputText = styled.input`
  padding: 0.7rem 1rem;
  border: 1px solid #756bea;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const PrimaryButton = styled.button`
  background-color: #e4ddf0;
  display: flex;
  align-items: center;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  gap: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #101828;
  &:hover {
    background-color: #756bea;
    color: white;
  }
`;

const Header = styled.form`
  display: flex;
  gap: 10px;
`;

const DefaultText = styled.p`
  margin: 2rem 0rem;
`;

const HighlightText = styled.span`
  color: #756bea;
`;

interface UserInputTypes {
  city: string;
  country: string;
}

export interface CityDetails {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

function App() {
  const [userInput, setUserInput] = useState<UserInputTypes>({
    city: "",
    country: "",
  });

  const [currCityDetails, setCurrCityDetails] = useState<CityDetails | null>(
    null
  );
  const getWeatherData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!userInput.city || !userInput.country)
      return alert("Please fill both the details.");

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.city},${userInput.country}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
      const { status, data } = await axios.get<CityDetails>(url);
      if (status === 200) {
        setCurrCityDetails(data);

        setUserInput({
          city: "",
          country: "",
        });
      }
    } catch ({ response }) {
      if (response.status === 404) {
        return alert(response.data.message);
      }
      console.log(response);
    }
  };

  return (
    <Wrapper>
      <Title>Weather App</Title>
      <Header>
        <InputText
          placeholder="City"
          value={userInput.city}
          onChange={(e) =>
            setUserInput((previousData) => ({
              ...previousData,
              city: e.target.value,
            }))
          }
        />
        <InputText
          placeholder="Country"
          value={userInput.country}
          onChange={(e) =>
            setUserInput((previousData) => ({
              ...previousData,
              country: e.target.value,
            }))
          }
        />
        <PrimaryButton onClick={(e) => getWeatherData(e)}>
          <span className="material-icons-outlined">search</span>
          <span>Submit</span>
        </PrimaryButton>
      </Header>
      {currCityDetails ? (
        <WeatherDetails cityDetails={currCityDetails} />
      ) : (
        <DefaultText>
          Please Write
          <HighlightText> The City and Country name </HighlightText>
          to get weather Information.
        </DefaultText>
      )}
    </Wrapper>
  );
}

export default App;
