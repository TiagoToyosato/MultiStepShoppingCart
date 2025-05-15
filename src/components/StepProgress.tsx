import React from "react";

interface StepProgressProps {
  currentStep: number;
  steps: string[];
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 px-4">
      <div className="grid grid-cols-5 items-center">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <React.Fragment key={index}>
              {/* Círculo */}
              <div className="flex flex-col items-center col-span-1 relative z-10">
                <div
                  className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold
                    ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "bg-white border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                >
                  {isCompleted ? (
                    <span className="text-white text-lg">&#10003;</span>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>

              {/* Linha entre círculos */}
              {index < steps.length - 1 && (
                <div className="h-1 bg-gray-300 w-full col-span-1 relative">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? "bg-green-500 w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
