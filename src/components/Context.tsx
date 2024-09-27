import React, {createContext, useState, ReactNode, useContext} from 'react';

// Define the shape of your context's data
interface ContextType {
  value: string;
  setValue: (newValue: string) => void;
  emailModalVisible: boolean;
  setEmailModalVisible: (newValue: boolean) => void;
  callModalVisible: boolean;
  setCallModalVisible: (newValue: boolean) => void;
}

// Create the context with a default value
const CustomContext = createContext<ContextType | undefined>(undefined);

// Create a provider component
const CustomProvider: React.FunctionComponent<{children: ReactNode}> = ({
  children,
}) => {
  const [value, setValue] = useState<string>(''); // Set initial state
  const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false);
  const [callModalVisible, setCallModalVisible] = useState<boolean>(false);

  return (
    <CustomContext.Provider
      value={{
        value,
        setValue,
        emailModalVisible,
        setEmailModalVisible,
        callModalVisible,
        setCallModalVisible,
      }}>
      {children}
    </CustomContext.Provider>
  );
};

// Custom hook to use the context
const useCustomContext = () => {
  const context = useContext(CustomContext);
  if (context === undefined) {
    throw new Error('useCustomContext must be used within a CustomProvider');
  }
  return context;
};

// Export both the context and provider
export {CustomProvider, useCustomContext};
