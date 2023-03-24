import React from "react";
import styled from "styled-components";
import { CityDetails } from "../App";

interface Props {
  cityDetails: CityDetails;
}

const TempTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const WeatherHeader = styled.header`
  margin: 3rem;
  background-color: #eae6f2;
  padding: 2rem 8rem;
  border-radius: 14px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: baseline;
`;

const WeatherInfo = styled.ul`
  margin: 10px 0px;
  font-size: 1.2rem;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const InfoList = styled.li`
  margin: 0px 10px;
  padding: 8px 0px;
  border-bottom: 1px solid #c4aedd;
  color: #8031d5;
  min-width: 30%;
`;

const InfoListSpan = styled.span`
  margin-right: 8px;
  color: #101828;
`;

const WeatherDetails = ({ cityDetails }: Props) => {
  return (
    <div>
      <WeatherHeader>
        <h2>
          {cityDetails.name} , {cityDetails.sys.country}
        </h2>
        <FlexRow>
          <TempTitle>{cityDetails.main.temp}&#176;</TempTitle>
          <h1>{cityDetails?.weather[0].main}</h1>
        </FlexRow>
      </WeatherHeader>
      <WeatherInfo>
        <InfoList>
          <InfoListSpan>Wind:</InfoListSpan>
          {cityDetails.wind?.speed} km/h
        </InfoList>
        <InfoList>
          <InfoListSpan>Wind Direction:</InfoListSpan>
          {cityDetails.wind?.deg}&#176; deg
        </InfoList>
        <InfoList>
          <InfoListSpan>Pressure:</InfoListSpan>
          {cityDetails.main?.pressure} hPa
        </InfoList>
        <InfoList>
          <InfoListSpan>Humidity:</InfoListSpan>
          {cityDetails.main?.humidity}%
        </InfoList>
        <InfoList>
          <InfoListSpan>Gust:</InfoListSpan>
          {cityDetails.wind?.gust}
        </InfoList>
        <InfoList>
          <InfoListSpan>Longitude and Latitide</InfoListSpan>
          {cityDetails.coord.lon.toFixed(2)}/{cityDetails.coord.lat.toFixed(2)}
        </InfoList>
      </WeatherInfo>
    </div>
  );
};

export { WeatherDetails };
