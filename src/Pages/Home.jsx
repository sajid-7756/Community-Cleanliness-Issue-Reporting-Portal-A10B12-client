import React from "react";
import BannerSlider from "../Components/BannerSlider";
import IssueCategories from "../Components/IssueCategories";
import CommunityStats from "../Components/CommunityStats";
import VolunteerCTA from "../Components/VolunteerCTA";
import RecentComplaints from "../Components/RecentComplaints";

const Home = () => {
  return (
    <div className="space-y-15">
      <title>Clean Hub - Home</title>
      <BannerSlider></BannerSlider>
      <IssueCategories></IssueCategories>
      <RecentComplaints></RecentComplaints>
      <CommunityStats></CommunityStats>
      <VolunteerCTA></VolunteerCTA>
    </div>
  );
};

export default Home;
