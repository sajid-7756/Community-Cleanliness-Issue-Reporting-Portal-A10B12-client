import React from "react";
import BannerSlider from "../Components/BannerSlider";
import IssueCategories from "../Components/IssueCategories";
import LatestIssues from "../Components/LatestIssues";
import CommunityStats from "../Components/CommunityStats";
import VolunteerCTA from "../Components/VolunteerCTA";

const Home = () => {
  return (
    <div className="space-y-15">
      <title>Clean Hub - Home</title>
      <BannerSlider></BannerSlider>
      <IssueCategories></IssueCategories>
      <LatestIssues></LatestIssues>
      <CommunityStats></CommunityStats>
      <VolunteerCTA></VolunteerCTA>
    </div>
  );
};

export default Home;
