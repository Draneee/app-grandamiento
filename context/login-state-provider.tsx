import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface StateContextProps<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
}

export const createStateContext = <T,>(defaultValue: T) => {
  const StateContext = createContext<StateContextProps<T> | undefined>(
    undefined
  );

  const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<T>(defaultValue);
    return (
      <StateContext.Provider value={{ value, setValue }}>
        {children}
      </StateContext.Provider>
    );
  };

  const useSharedState = (): StateContextProps<T> => {
    const context = useContext(StateContext);
    if (context === undefined) {
      throw new Error("useSharedState must be used within a StateProvider");
    }
    return context;
  };

  return { StateProvider, useSharedState };
};

export const {
  StateProvider: LoginStateProvider,
  useSharedState: useLoginState,
} = createStateContext<boolean>(false);
export const {
  StateProvider: ConfetiProvider,
  useSharedState: useConfetiState,
} = createStateContext<boolean>(false);
