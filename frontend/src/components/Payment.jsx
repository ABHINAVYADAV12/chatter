import React from "react";

const Payments = () => {
  return (
    <section className="bg-black text-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className="mx-auto max-w-screen-md text-center mb-8">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light sm:text-xl text-gray-400">
            Here at Swift, we focus on markets where technology and capital can unlock long-term value and drive economic impact.
          </p>
        </div>

        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Pricing Plan */}
          {[
            {
              title: "Starter",
              price: 29,
              features: [
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 1 developer",
                "Premium support: 6 months",
                "Free updates",
              ],
            },
            {
              title: "Company",
              price: 99,
              features: [
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 10 developers",
                "Premium support: 24 months",
                "Free updates",
              ],
            },
            {
              title: "Enterprise",
              price: 499,
              features: [
                "Individual configuration",
                "No setup, or hidden fees",
                "Team size: 100+ developers",
                "Premium support: 36 months",
                "Free updates",
              ],
            },
          ].map((plan, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 mx-auto max-w-lg text-white bg-gray-800 rounded-lg border border-gray-700 shadow"
            >
              <h3 className="mb-4 text-2xl font-semibold">{plan.title}</h3>
              <p className="font-light text-gray-400 sm:text-lg mb-4">
                {plan.title === "Starter"
                  ? "Best option for personal use & your next project."
                  : plan.title === "Company"
                  ? "Relevant for multiple users, extended & premium support."
                  : "Best for large scale uses and extended redistribution."}
              </p>
              <div className="flex justify-center items-baseline mb-6">
                <span className="mr-2 text-5xl font-extrabold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-green-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 10.707a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="text-white bg-[#1B57E9] hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Payments;
