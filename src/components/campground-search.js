import React from "react";

import { Dropdown } from "semantic-ui-react";
import "./campground-search.css";

const CampgroundSearch = ({
  handleQueryCampgrounds,
  handleCreateCampsiteFinder,
  options,
}) => {
  return (
    <div className="campground-search">
      <Dropdown
        placeholder="Search campgrounds..."
        onSearchChange={(e, { searchQuery }) =>
          handleQueryCampgrounds(searchQuery)
        }
        openOnFocus={false}
        options={options}
        minCharacters={4}
        onChange={(e, data) =>
          handleCreateCampsiteFinder({ campgroundId: data.value })
        }
        fluid
        selection
        search={(options) => options}
        selectOnBlur={false}
        selectOnNavigation={false}
        icon="search"
      />
    </div>
  );
};

export default CampgroundSearch;
