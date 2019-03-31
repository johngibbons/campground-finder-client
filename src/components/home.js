import React from "react";
import "./home.css";
import CampsiteFindersCollectionContainer from "../containers/campsite-finders-collection-container";
import CampgroundSearchContainer from "../containers/campground-search-container";

const Home = () => {
  return (
    <section className="home">
      <CampgroundSearchContainer />
      <CampsiteFindersCollectionContainer />
    </section>
  );
};

export default Home;
