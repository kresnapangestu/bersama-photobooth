import LandingTemplate from "@/components/templates/LandingTemplate";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <main className="flex flex-col w-full flex-grow">
        <LandingTemplate />
      </main>
    </div>
  );
};

export default Home;
