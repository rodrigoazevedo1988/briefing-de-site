import React from 'react'
import { SECTIONS } from '../data/fields'

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {SECTIONS.map((section, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <React.Fragment key={section.id}>
              <button onClick={() => stepNumber <= currentStep && onStepClick(stepNumber)}
                className={`flex flex-col items-center transition-all ${stepNumber <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  isActive ? 'bg-blue-600 text-white scale-110' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  {isCompleted ? '✓' : section.id}
                </div>
                <span className={`mt-2 text-xs text-center max-w-[80px] hidden sm:block ${isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                  {section.title}
                </span>
              </button>
              {index < SECTIONS.length - 1 && <div className={`flex-1 h-1 mx-2 rounded ${isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}