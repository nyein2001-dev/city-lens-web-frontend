import React, { useEffect, useState } from "react";
import { getRoutes } from "../api";
// import { Badge } from "@material-tailwind/react";

const RouteListComponent = () => {
  const [routes, setRoutes] = useState({ results: [] });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await getRoutes();
      console.log("Fetched data:", response.data);
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  function CircleIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }

  return (
    <section className="w-full bg-white rounded-xl shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center p-4 container gap-6 md:gap-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="grid gap-1">
            <h1 className="text-2xl font-bold tracking-tight dark:text-night-50">
              Public Transit Routes
            </h1>
            <p className="text-muted-foreground dark:text-night-200">
              Explore the city with our comprehensive transit network
            </p>
          </div>
        </div>
      </div>
      <ul className="">
        {routes.results?.length > 0 ? (
          routes.results.map((route) => (
            <li className="flex justify-between items-center border-b last:border-b dark:border-gray-700">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                    <h3 className="font-semibold dark:text-night-50">
                      Route 101
                    </h3>
                  </div>
                  <span className="text-sm text-muted-foreground dark:text-night-200">
                    Universtiy Line
                  </span>
                </div>
                <p className="text-muted-foreground dark:text-night-200">
                  Connects downtown to the universtiy campus, with stops at the
                  library, student center, and sports facilities
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground dark:text-night-200">
                    Operated by City Transit
                  </span>
                  {/* <Badge
                    variant="outline"
                    className="border-[#FF6B6B] bg-background text-[#FF6B6B]"
                  > */}
                  <div className="flex items-center border-[#FF6B6B] bg-background text-[#FF6B6B]">
                    <CircleIcon className="h-3 w-3 -translate-x-1 animate-pulse fill-[#FF6B6B] text-[#FF6B6B]" />
                    <span className="border-[#FF6B6B] bg-background text-[#FF6B6B]">
                      Running
                    </span>
                  </div>
                  {/* </Badge> */}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No routes available</li>
        )}
      </ul>
    </section>
  );
};

export default RouteListComponent;
