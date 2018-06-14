import React from "react";
import { Table } from "semantic-ui-react";
import { take } from "ramda";
import "./results-table.css";

const ResultsTable = ({ results, isShowingAll, handleToggleShowAll }) => {
  const numShowing = isShowingAll
    ? results.length
    : Math.min(results.length, 3);
  return (
    <Table basic="very" compact size="small" unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Nights</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Spots Available</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {take(numShowing, results).map(
          ({ date, siteCount, lengthOfStay }, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell textAlign="center">{lengthOfStay}</Table.Cell>
                <Table.Cell textAlign="right">{siteCount}</Table.Cell>
              </Table.Row>
            );
          }
        )}
        {results.length > 3 && (
          <Table.Row>
            <Table.Cell
              colSpan="3"
              className="results-table__show-hide"
              onClick={handleToggleShowAll}
            >
              {isShowingAll ? "hide" : "show all"}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default ResultsTable;
