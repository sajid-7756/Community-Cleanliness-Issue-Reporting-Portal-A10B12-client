import React from "react";
import { Lightbulb, Shield, Zap, Users } from "lucide-react";
import Container from "./Container";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Fast Reporting",
    description:
      "Report issues in seconds with our streamlined submission process and instant notifications.",
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Verified Action",
    description:
      "Our team coordinates with local authorities to ensure every reported issue is addressed.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Community Driven",
    description:
      "Join thousands of active citizens working together to improve our living standards.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Smart Tracking",
    description:
      "Track the real-time status of your reports from submission to resolution.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-base-200/50">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-secondary mb-4">
            Why Choose <span className="text-primary">CleanHub</span>?
          </h2>
          <p className="text-base-content/70">
            We provide the most effective platform for community-led
            environmental improvement and issue resolution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-base-100 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-base-200 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:text-primary-content transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-base-content/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
