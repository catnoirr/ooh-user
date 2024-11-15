"use client";

import React, { useState, useEffect } from "react";
import CampaignCard from "./CampaignCard";
import { useRouter } from "next/navigation";
import ClipLoader from 'react-spinners/ClipLoader';

const CampaignSection = ({ title, campaigns, isLoading }) => {
  const router = useRouter()

  return (
    <div className="my-6 w-full sm:px-6 px-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <button className="text-white text-sm border border-[#A3A3A3] bg-[#F2F0F53D] px-2 py-1 rounded-md">
          View All
        </button>
      </div>

      <div className="flex overflow-x-auto space-x-4 hide-scroll-bar">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-40">
            <ClipLoader color="#ffffff" loading={isLoading} size={20} />
          </div>
        ) : campaigns.length > 0 ? (
          campaigns.map((campaign) => (
            <div key={campaign.campaignId} className="sm:min-w-[200px] min-w-[155px]">
              <CampaignCard
                title={campaign.campaignName}
                buttonText={campaign.redirectLink ? "Visit Now" : "Notify Me"}
                imageSrc={campaign.adCreative}
                onButtonClick={() => router.push('/campaigns')}
              />
            </div>
          ))
        ) : (
          <div className="text-white text-center w-full">No campaigns available</div>
        )}
      </div>
    </div>
  );
};

const CampaignsDisplay = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [campaignsNearYou, setCampaignsNearYou] = useState([]);
  const [ongoingCampaigns, setOngoingCampaigns] = useState([]);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/getCampaigns", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        const currentDate = new Date();

        const nearYou = data.filter((campaign) => {
          if (Array.isArray(campaign.geographicTargeting)) {
            return campaign.geographicTargeting.some((target) =>
              target.toLowerCase().includes("mumbai")
            );
          }
          return false;
        });
        
        const ongoing = data.filter(
          (campaign) =>
            currentDate >= new Date(campaign.startDate.seconds * 1000) &&
            currentDate <= new Date(campaign.endDate.seconds * 1000)
        );

        const upcoming = data.filter(
          (campaign) =>
            currentDate < new Date(campaign.startDate.seconds * 1000)
        );

        setCampaigns(data);
        setCampaignsNearYou(nearYou);
        setOngoingCampaigns(ongoing);
        setUpcomingCampaigns(upcoming);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="bg-[#341266] min-h-screen sm:max-w-[30rem] w-full">
      <CampaignSection title="Campaigns Near You" campaigns={campaignsNearYou} isLoading={isLoading} />
      <CampaignSection title="Ongoing Campaigns" campaigns={ongoingCampaigns} isLoading={isLoading} />
      <CampaignSection title="Upcoming Campaigns" campaigns={upcomingCampaigns} isLoading={isLoading} />
    </div>
  );
};

export default CampaignsDisplay;
