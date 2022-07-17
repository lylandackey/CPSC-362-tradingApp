/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { createContext, useState, FC } from "react";

// Provider in your app
interface IStockContext {
    ticker: String | null;
    setTicker?: (tick:string) => void;
  }
  
  export const StockContext = createContext<IStockContext>({ticker: null});

export const StockProvider: FC = ({ children }) => {
    const [ticker, setTicker] = useState<String | null>(null);
  
    const toggleTicker = (tick:string) => {
      setTicker(tick);
    };
  
    return (
      <StockContext.Provider
        value={{
          ticker,
          setTicker: toggleTicker
        }}
      >
        {children}
      </StockContext.Provider>
    );
  };