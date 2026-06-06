import React from 'react'

export default function NavigationButtons({ currentStep, totalSteps, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
      <button onClick={onPrev} disabled={currentStep === 1}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'}`}>
        ← Anterior
      </button>
      <span className="text-gray-500 dark:text-gray-400 text-sm">Passo {currentStep} de {totalSteps}</span>
      <button onClick={onNext} disabled={currentStep === totalSteps}
        className={`px-6 py-3 rounded-lg font-medium transition-all ${currentStep === totalSteps ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
        {currentStep === totalSteps ? 'Finalizar' : 'Próximo →'}
      </button>
    </div>
  )
}