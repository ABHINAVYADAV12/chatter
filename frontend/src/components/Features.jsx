import React from "react";

const Features = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="py-16 px-4 mx-auto max-w-screen-xl sm:py-24">
        <div className="max-w-screen-md mb-12 text-center mx-auto">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Designed for business teams like yours
          </h2>
          <p className="text-gray-400 sm:text-xl">
            Here at Swift, we focus on markets where technology and capital can unlock long-term value and drive economic progress.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div>
            <div className="flex justify-center items-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 001.414 1.414L12 13.414l4.293 4.293a1 1 0 001.414-1.414L13.414 12l4.293-4.293a1 1 0 00-1.414-1.414L12 10.586 7.707 6.293a1 1 0 00-1.414 1.414L10.586 12 5 17.586A2 2 0 013 16V5a1 1 0 010-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Marketing</h3>
            <p className="text-gray-400">
              Plan it, create it, launch it. Collaborate seamlessly across your organization and hit your marketing goals every month.
            </p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="flex justify-center items-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 00.788 1.84L10 4.618l6.606 2.302a1 1 0 00.788-1.84l-7-3z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Legal Compliance</h3>
            <p className="text-gray-400">
              Protect your organization, devices, and stay compliant with structured workflows and custom permissions.
            </p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="flex justify-center items-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3H2V8a2 2 0 012-2h2zm12 5H2v5a2 2 0 002 2h12a2 2 0 002-2v-5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Business Automation</h3>
            <p className="text-gray-400">
              Auto-assign tasks, send Slack messages, and more. Speed up your workflow with hundreds of ready-to-go templates.
            </p>
          </div>

          {/* Feature 4 */}
          <div>
            <div className="flex justify-center items-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 001 1h3a1 1 0 100-2h-2V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Finance</h3>
            <p className="text-gray-400">
              Audit-proof software built for critical financial operations like month-end close and quarterly budgeting.
            </p>
          </div>

          {/* Feature 5 */}
          <div>
            <div className="flex justify-center items-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 000 2h12a1 1 0 100-2H4zM5 11a1 1 0 000 2h10a1 1 0 100-2H5z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Enterprise Design</h3>
            <p className="text-gray-400">
              Craft delightful experiences for both mobile and desktop with real-time cross-company collaboration.
            </p>
          </div>

          {/* Feature 6 */}
          <div>
            <div className="flex justify-center items-center mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0A8.001 8.001 0 0010 18a8.001 8.001 0 001.49-14.83z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Operations</h3>
            <p className="text-gray-400">
              Keep your company running with customizable dashboards and structured workflows built for efficient teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
