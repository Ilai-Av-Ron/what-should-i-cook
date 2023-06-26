import React, { createContext, ReactNode, useState } from 'react';

interface UserPreferences {
  dietary_preferences: { [key: string]: boolean };
  intolerances: { [key: string]: boolean };
}

export const UserPreferencesContext = createContext<{
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
}>({
  preferences: { dietary_preferences: {}, intolerances: {} },
  setPreferences: () => null,
});

interface UserPreferencesContextProviderProps {
  children: ReactNode;
}

const UserPreferencesContextProvider: React.FC<UserPreferencesContextProviderProps> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietary_preferences: {},
    intolerances: {},
  });

  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContextProvider;