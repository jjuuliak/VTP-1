import { createContext, useState } from 'react';

const StepPopupContext = createContext();

export const StepPopupProvider = ({ children }) => {
  const [showStepPopup, setShowStepPopup] = useState(false);

  return (
    <StepPopupContext.Provider value={{ showStepPopup, setShowStepPopup }}>
      {children}
    </StepPopupContext.Provider>
  );
};

export default StepPopupContext;
