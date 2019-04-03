import React from "react";
import "./campsite-finder-card.css";
import ResultsTable from "./results-table";
import CampsiteFinderSettingsForm from "./campsite-finder-settings-form";
import {
  Button,
  Card,
  List,
  Image,
  Icon,
  Dropdown,
  Confirm
} from "semantic-ui-react";
import "react-dates/lib/css/_datepicker.css";
import { SPECIFIC_DATES } from "../modules/campsiteFinders";
import { captializeTitle, replaceImages } from "../helpers/reducerHelpers";
import moment from "moment";

const CampsiteFinderCard = ({
  campsiteFinder,
  handleUpdateCampsiteFinder,
  handleDeleteCampsiteFinder,
  handleToggleConfirm,
  handleToggleSettigsFormShowing,
  handleToggleShowAllResults,
  handleCancelEditSettings
}) => {
  const {
    _id,
    campgroundId,
    isActive,
    isWeekendsOnly,
    isSendingEmails,
    dateOption,
    datesAvailable,
    startDate,
    endDate,
    siteCode,
    isConfirmOpen,
    isShowingAllResults,
    isSettingsShowing,
    lastCheckedAt
  } = campsiteFinder;
  const hasAvailableSites = datesAvailable.length > 0;
  console.log(campgroundId);
  return (
    <Card
      className="campsite-finder-card"
      color={hasAvailableSites ? "green" : isActive ? "red" : "yellow"}
    >
      <Card.Content extra>
        <Card.Header className="campsite-finder-card__header">
          {captializeTitle(campgroundId.placeName)}
          <div className="campsite-finder-card__on-off">
            <Dropdown icon={isActive ? "pause" : "play"}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    handleUpdateCampsiteFinder(_id, { isActive: !isActive })
                  }
                >
                  <Icon name={isActive ? "pause" : "play"} />
                  {isActive ? "Pause" : "Resume"}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleToggleConfirm(_id)}>
                  <Icon name="delete" />
                  Delete
                </Dropdown.Item>
                <Confirm
                  open={isConfirmOpen}
                  onConfirm={() => handleDeleteCampsiteFinder(_id)}
                  onCancel={() => handleToggleConfirm(_id)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
        <Card.Meta>{campgroundId.facilityName}</Card.Meta>
      </Card.Content>
      <div className="campsite-finder-card__image-wrapper">
        <a
          className="campsite-finder-card__title-link"
          href={campgroundId.url}
          target="blank"
        >
          <Image
            className="campsite-finder-card__campground-image"
            src={replaceImages(campgroundId.facilityPhoto)}
          />
        </a>
      </div>
      <Card.Content className="campsite-finder-card__settings">
        <Card.Meta className="campsite-finder-card__sub-heading">
          Settings
          {isSettingsShowing ? (
            <div className="campsite-finder-card__edit-link">
              <Button onClick={() => handleCancelEditSettings(_id)} compact>
                Cancel
              </Button>
              <Button
                onClick={() => handleUpdateCampsiteFinder(_id, campsiteFinder)}
                primary
                compact
              >
                Save
              </Button>
            </div>
          ) : (
            <button
              className="campsite-finder-card__edit-link"
              onClick={() => handleToggleSettigsFormShowing(_id)}
            >
              Edit
            </button>
          )}
        </Card.Meta>
        {isSettingsShowing ? (
          <CampsiteFinderSettingsForm campsiteFinder={campsiteFinder} />
        ) : (
          <List>
            <List.Item>
              <List.Header className="float-left">Dates</List.Header>
              <span className="float-right">
                {dateOption === SPECIFIC_DATES
                  ? `${moment(startDate).format("MM/DD/YY")} -
                    ${moment(endDate).format("MM/DD/YY")}`
                  : "Next Six Months"}
              </span>
            </List.Item>
            {isWeekendsOnly && (
              <List.Item>
                <List.Header className="float-left">Weekends Only</List.Header>
              </List.Item>
            )}
            {siteCode && (
              <List.Item>
                <List.Header className="float-left">Site Codes</List.Header>
                <span className="float-right">{siteCode}</span>
              </List.Item>
            )}
            <List.Item>
              <List.Header className="float-left">
                Notification Settings
              </List.Header>
              <span className="float-right">
                {isSendingEmails ? "Email" : "None"}
              </span>
            </List.Item>
          </List>
        )}
      </Card.Content>
      <Card.Content>
        <Card.Meta className="campsite-finder-card__sub-heading">
          Results
          <div className="campsite-finder-card__sub-sub-heading">
            {lastCheckedAt
              ? `Updated ${moment(lastCheckedAt).fromNow()}`
              : `Not checked yet`}
          </div>
        </Card.Meta>
        {datesAvailable.length > 0 ? (
          <ResultsTable
            results={datesAvailable}
            isShowingAll={isShowingAllResults}
            handleToggleShowAll={() => handleToggleShowAllResults(_id)}
          />
        ) : (
          <div>No spots available</div>
        )}
      </Card.Content>
    </Card>
  );
};

export default CampsiteFinderCard;
