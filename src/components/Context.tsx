import React, {createContext, useState, ReactNode} from 'react';

// Define the shape of your context's data
interface ContextType {
  // Define the properties you want to share in your context
  value: string;
  setValue: (newValue: string) => void;
}

// Create the context with a default value
const ContextProvider = createContext<ContextType | undefined>(undefined);

// Create a provider component
const CustomProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [value, setValue] = useState<string>(''); // Set initial state

  return (
    <ContextProvider.Provider value={{value, setValue}}>
      {children}
    </ContextProvider.Provider>
  );
};

// Export both the context and provider
export {ContextProvider, CustomProvider};
