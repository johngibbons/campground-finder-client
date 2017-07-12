import React from 'react'

import { Dropdown } from 'semantic-ui-react'
import './campground-search.css'

const CampgroundSearch = ({
  query,
  handleQueryCampgrounds,
  handleCreateCampsiteFinder,
  campgrounds,
  options
}) => {
  return (
    <div className='campground-search'>
      <Dropdown
        placeholder='Search campgrounds...'
        onSearchChange={(e, value) => handleQueryCampgrounds(value)}
        openOnFocus={false}
        options={options}
        minCharacters={4}
        onChange={(e, data) =>
          handleCreateCampsiteFinder({ campgroundId: data.value })}
        fluid
        search
        selection
        icon='search'
      />
    </div>
  )
}

export default CampgroundSearch
