import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoutes } from "../api";

const RouteListComponent = () => {
  const [routes, setRoutes] = useState({ results: [] });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await getRoutes();
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const CircleIcon = (props) => (
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

  return (
    <section
      className="w-full bg-white rounded-xl shadow-md dark:bg-gray-800"
      style={{
        overflowY: "auto",
        height: "100svh",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
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
      <ul>
        {routes.results.length > 0 ? (
          routes.results.map((route) => (
            <Link
              key={route.route_id}
              to={`/bus-route/${route.id}`}
              className="no-underline text-lg text-gray-800 dark:text-gray-200"
            >
              <li className="flex justify-between items-center border-b last:border-b dark:border-gray-700 hover:bg-gray-900 p-2">
                <div className="bg-card px-3 py-1 rounded-lg shadow-sm flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: `#${route.color}` }}
                      />
                      <h3 className="font-semibold dark:text-night-50">
                        {route.route_id}
                      </h3>
                    </div>
                    <span className="text-sm text-muted-foreground dark:text-night-200">
                      {route.agency_id}
                    </span>
                  </div>
                  <p className="text-muted-foreground dark:text-night-200 flex-grow">
                    {route.name}
                  </p>
                  <div className="mt-2 w-full flex items-center justify-between">
                    <span className="text-sm text-muted-foreground dark:text-night-200">
                      Operated by City Lens
                    </span>
                    <div
                      className="flex items-center"
                      style={{
                        borderColor: `#${route.color}`,
                        color: `#${route.color}`,
                      }}
                    >
                      <CircleIcon
                        className="h-3 w-3 -translate-x-1 animate-pulse"
                        style={{
                          fill: `#${route.color}`,
                          color: `#${route.color}`,
                        }}
                      />
                      <span style={{ color: `#${route.color}` }}>Running</span>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <li className="flex justify-center items-center pb-4 dark:text-night-200">
            No routes available
          </li>
        )}
      </ul>
    </section>
  );
};

export default RouteListComponent;
