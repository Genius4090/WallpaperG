import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const ProfileContext = createContext();

// Custom hook to use the profile context
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "Jinhsi",
    profilePicture: "",
    description: "Hi, I'm Cool Jinhsi! What’s up, new folk?"
  });

  useEffect(() => {
    // Load the profile from localStorage when the app starts
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile)); // Set the profile from storage
    } else {
      setProfile({
        name: "Jinhsi", 
        profilePicture: "./extra/profile__img.jpg",
        description: "Hi, I'm Cool Jinhsi! What’s up, new folk?"
      });
    }
  }, []);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem("profile", JSON.stringify(newProfile));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
