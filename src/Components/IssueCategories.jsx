import React from "react";
import {
  FaTrash,
  FaHardHat,
  FaTools,
  FaRoad,
  FaLightbulb,
  FaTree,
  FaWater,
  FaExclamationTriangle,
} from "react-icons/fa";
import Container from "./Container";

// Sample categories data
const categories = [
  {
    id: 1,
    title: "Garbage Issues",
    description: "Report waste management problems",
    icon: <FaTrash className="text-2xl" />,
    gradient: "from-green-400 to-emerald-600",
    color: "green",
  },
  {
    id: 2,
    title: "Illegal Construction",
    description: "Report unauthorized building activities",
    icon: <FaHardHat className="text-2xl" />,
    gradient: "from-orange-400 to-red-600",
    color: "orange",
  },
  {
    id: 3,
    title: "Broken Property",
    description: "Report damaged public facilities",
    icon: <FaTools className="text-2xl" />,
    gradient: "from-amber-400 to-yellow-600",
    color: "amber",
  },
  {
    id: 4,
    title: "Road Damage",
    description: "Report potholes and road issues",
    icon: <FaRoad className="text-2xl" />,
    gradient: "from-red-400 to-rose-600",
    color: "red",
  },
];

const CategoriesSection = () => {
  return (
    <Container className="p-8">
      {/* Header with Animation */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-6">
          Issue <span className="text-primary">Categories</span>
        </h1>
        <p className="mt-6 text-lg">
          Community reported issues awaiting resolution
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={cat.id}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Gradient Border Effect */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
            ></div>

            {/* Card Content */}
            <div className="relative bg-white rounded-2xl p-6 m-0.5 h-full flex flex-col">
              {/* Background Pattern */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${cat.gradient} opacity-5 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}
              ></div>

              {/* Icon Container */}
              <div className="relative z-10 mb-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-linear-to-br ${cat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  {cat.icon}
                </div>

                {/* Ripple Effect */}
                <div
                  className={`absolute top-0 left-0 w-16 h-16 rounded-xl bg-linear-to-br ${cat.gradient} opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-700`}
                ></div>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                {cat.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 grow group-hover:text-gray-700 transition-colors duration-300">
                {cat.description}
              </p>

              {/* Divider with Animation */}
              <div
                className={`h-px bg-linear-to-r ${cat.gradient} mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              ></div>
              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
              </div>

              {/* Corner Accent */}
              <div
                className={`absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl ${cat.gradient} opacity-0 group-hover:opacity-10 rounded-tl-full transition-all duration-500`}
              ></div>
            </div>

            {/* Pulse Effect on Hover */}
            <div
              className={`absolute inset-0 rounded-2xl bg-linear-to-br ${cat.gradient} opacity-0 group-hover:opacity-20 animate-pulse-slow pointer-events-none`}
            ></div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CategoriesSection;
