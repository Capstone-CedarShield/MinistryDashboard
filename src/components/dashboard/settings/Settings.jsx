import { useState } from "react";
import Container from "../../shared/container/Container";
import Information from "../../shared/container/Information";
import { info, settingsInfo } from "./settingsData/data.js";
import SettingsInformation from "./SettingsInformation";

function Settings({ children }) {
  return (
    <div className="relative p-4 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Settings
        </h2>
      <Container title={"Personal Info"}>
        {info.map((item, index) => (
          <Information
            key={item.id}
            icon={item.icon}
            text={item.text}
            index={index}
            totalItems={info.length}
          />
        ))}
      </Container>
      <Container title={"Personal Settings"}>
        {settingsInfo.map((item, index) => (
          <SettingsInformation
            key={item.id}
            id={item.id}
            icon={item.icon}
            text={item.text}
            index={index}
            totalItems={settingsInfo.length}
          />
        ))}
      </Container>
    </div>
  );
}

export default Settings;