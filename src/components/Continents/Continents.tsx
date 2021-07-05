import React, { FC } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import { LIST_COUNTRIES, client } from "../../ApolloClient";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
`;

const Continent = styled(Link)`
  margin: 5px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: lightgray;
  border-radius: 10px;
  padding: 20px;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    background-color: gray;
  }
`;

const Paragraph = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  color: black;
`;

interface Props {}

const Continents: FC<Props> = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return (
      <p style={{ display: "block", width: "100%", textAlign: "center" }}>
        {error ? error.message : "Loading..."}
      </p>
    );
  }

  const continents = data.countries
    .map((val) => val.continent)
    .map(({ name, code }) => {
      return {
        continent: name,
        code: code,
      };
    });

  return (
    <Wrapper>
      {_.uniqWith(continents, _.isEqual).map((val: any) => (
        <Continent to={"/continents/" + val.code}>
          <Paragraph>{val.continent} {val.code}</Paragraph>
        </Continent>
      ))}
    </Wrapper>
  );
};

export default Continents;
