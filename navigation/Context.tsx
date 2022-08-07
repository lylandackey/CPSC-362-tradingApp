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
    user: { username:String, password:String, email:String, currentCash:String, watchList50Day:String[], watchList200Day:String[], currentStocks:{ticker: String, datesTraded: String[], averagePrice: String, numberOfShares: String} | null };
    setUser?: (user:{ username:String, password:String, email:String, currentCash:String, watchList50Day:String[], watchList200Day:String[], currentStocks:{ticker: String, datesTraded: String[], averagePrice: String, numberOfShares: String} | null }) => void;
  }
  
  export const StockContext = createContext<IStockContext>({ticker: null, user: {username:"anonymous", password:"anonymous", email:"anonymous", currentCash: "$0", watchList50Day:[], watchList200Day:[], currentStocks:null}});

export const StockProvider: FC = ({ children }) => {
    const [ticker, setTicker] = useState<String | null>(null);
    const [user, setUser] = useState<{username:String, password:String, email:String, currentCash:String, watchList50Day:String[], watchList200Day:String[], currentStocks:{ticker: String, datesTraded: String[], averagePrice: String, numberOfShares: String} | null} >({username:"anonymous", password:"anonymous", email:"anonymous", currentCash: "$0",  watchList50Day:[], watchList200Day:[], currentStocks:null});
  
    const toggleTicker = (tick:string) => {
      setTicker(tick);
    };
  
    const updateUser = (user:{ username:String, password:String, email:String, currentCash:String, watchList50Day:String[], watchList200Day:String[], currentStocks:{ticker: String, datesTraded: String[], averagePrice: String, numberOfShares: String}  }) => {
      setUser(user);
    };
  
    return (
      <StockContext.Provider
        value={{
          ticker,
          setTicker: toggleTicker,
          user,
          setUser: updateUser
        }}
      >
        {children}
      </StockContext.Provider>
    );
  };