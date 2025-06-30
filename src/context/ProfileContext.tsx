import React, { createContext, useState, ReactNode, useContext } from 'react';

/**
 * @interface UserProfile
 * Defines the shape of the user's profile data.
 */
interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

/**
 * @interface ProfileContextType
 * Defines the shape of the context value, including the user profile and a function to update it.
 */
interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
}

/**
 * @const ProfileContext
 * The React context for managing user profile data throughout the application.
 */
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Mock user data for demonstration purposes.
// In a real application, this would come from an API.
const mockUser = {
  name: 'Apurva',
  email: 'itsapurvasb343@gmail.com',
  avatarUrl: `https://i.pravatar.cc/150?u=apurva`,
};

/**
 * @component ProfileProvider
 * A provider component that encapsulates the user profile state logic and makes it available to its children.
 *
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components that can access the context.
 * @returns {JSX.Element} The provider component.
 */
export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(mockUser);

  /**
   * Updates the user profile with new data.
   * @param {Partial<UserProfile>} newProfile - An object containing the profile fields to update.
   */
  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

/**
 * @hook useProfile
 * A custom hook to easily access the user profile context.
 * This hook should be used by any component that needs to read or update the user's profile.
 *
 * @throws {Error} If used outside of a ProfileProvider.
 * @returns {ProfileContextType} The profile context value.
 */
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}; 