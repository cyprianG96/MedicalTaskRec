import { useQuery } from "@apollo/client";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";
import { values } from "lodash";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LIST_COUNTRIES, client } from "../../ApolloClient";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
`;

const CountryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
  color: black;
  border-radius: 10px;
  text-transform: uppercase;
  height: 100px;
  margin: 10px;
`;

const Paragraph = styled.p`
  text-align: center;
  margin-bottom: 10px;
  &:last-child {
      margin-bottom: 0px;
  }
`;

interface Props {}

const Countries: FC<Props> = () => {
  const { code }: { code: string } = useParams();
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return (
      <p style={{ display: "block", width: "100%", textAlign: "center" }}>
        {error ? error.message : "Loading..."}
      </p>
    );
  }

  const countriesSort = data.countries
    .map(({ name, continent: { code: codeContinent }, languages, emoji }) => {
      if (code === codeContinent) {
        return {
          name: name,
          languages: languages,
          emoji: emoji,
        };
      }
    })
    .filter((e) => {
      return e !== undefined;
    });

  return (
    <Wrapper>
      {countriesSort.map((value) => (
        <CountryWrapper>
          <Paragraph>
            {value.name} {value.emoji}
          </Paragraph>
          <Paragraph>
            {value.languages.length > 0 ? value.languages[0].name : ""}
          </Paragraph>
        </CountryWrapper>
      ))}
    </Wrapper>
  );
};

export default Countries;
