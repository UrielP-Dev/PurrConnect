import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [selectedCommunity, setSelectedCommunity] = useState(null);

    return (
        <UserContext.Provider value={{ userId, setUserId, selectedCommunity, setSelectedCommunity }}>
            {children}
        </UserContext.Provider>
    );
};
