import { FaTrash, FaHammer, FaTools, FaRoad } from "react-icons/fa";
import Container from "./Container";

const categories = [
  {
    id: 1,
    title: "Garbage",
    description: "Unauthorized disposal of garbage, bulk trash, and debris.",
    icon: <FaTrash size={32} />,
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: 2,
    title: "Illegal Construction ",
    description: "Unpermitted work, noise complaints, or safety hazards.",
    icon: <FaHammer size={32} />,
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    id: 3,
    title: "Broken Public Property",
    description: "Dilapidated buildings, overgrown yards, zoning issues.",
    icon: <FaTools size={32} />,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 4,
    title: "Road Damage",
    description: "Potholes, broken streetlights, damaged signs.",
    icon: <FaRoad size={32} />,
    gradient: "from-purple-500 to-pink-500",
  },
];

const IssueCategories = () => {
  return (
    <Container className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Issue <span className="text-primary">Categories</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 group p-6 rounded-xl"
          >
            <div
              className={`w-16 h-16 rounded-xl bg-linear-to-br ${cat.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
            >
              {cat.icon}
            </div>

            <h3 className="mb-2 text-xl font-semibold">{cat.title}</h3>
            <p className="text-primary mb-4">{cat.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default IssueCategories;
