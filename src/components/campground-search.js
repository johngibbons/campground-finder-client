import React from "react";

import { Dropdown } from "semantic-ui-react";
import "./campground-search.css";

const CampgroundSearch = ({
  handleQueryCampgrounds,
  onSelectCampground,
  options
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
        minCharacters={3}
        onChange={(e, data) => onSelectCampground(data.value)}
        fluid
        search={options => options}
        selection
        selectOnBlur={false}
        selectOnNavigation={false}
        icon="search"
      />
    </div>
  );
};

export default CampgroundSearch;
