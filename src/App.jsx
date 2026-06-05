import React, { useState, useEffect } from 'react'
import { SECTIONS, getFieldsBySection } from './data/fields'
import { saveData, loadData, clearData } from './utils/storage'
import { generatePDF } from './utils/pdfGenerator'
import StepIndicator from './components/StepIndicator'
import FieldRenderer from './components/FieldRenderer'
import NavigationButtons from './components/NavigationButtons'
import PDFTemplate from './components/PDFTemplate'

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    preenchidoPor: '',
    data: '',
  })
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const saved = loadData()
    if (saved) {
      setFormData(saved)
    }
  }, [])

  useEffect(() => {
    saveData(formData)
  }, [formData])

  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const handleHeaderChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < SECTIONS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      setShowPreview(true)
      await new Promise((resolve) => setTimeout(resolve, 100))
      await generatePDF('briefing-pdf-template')
      showNotification('PDF gerado com sucesso!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      showNotification('Erro ao gerar PDF. Tente novamente.', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados?')) {
      clearData()
      setFormData({ preenchidoPor: '', data: '' })
      setCurrentStep(1)
      showNotification('Dados limpos com sucesso!')
    }
  }

  const currentSection = SECTIONS[currentStep - 1]
  const currentFields = getFieldsBySection(currentSection.id)
  const isLastStep = currentStep === SECTIONS.length

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            notification.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Briefing - Criação de Site
          </h1>
          <p className="text-gray-600">
            Preencha o formulário abaixo para criar o briefing do seu projeto
          </p>
        </div>

        {currentStep === 1 && !formData.preenchidoPor && !formData.data && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <p className="text-gray-600 text-sm mb-4">
              Antes de começar, informe quem está preenchendo este briefing:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome e cargo
                </label>
                <input
                  type="text"
                  value={formData.preenchidoPor || ''}
                  onChange={(e) => handleHeaderChange('preenchidoPor', e.target.value)}
                  placeholder="Ex: João Silva - Diretor de Marketing"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  value={formData.data || ''}
                  onChange={(e) => handleHeaderChange('data', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (formData.preenchidoPor || formData.data) && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center justify-between">
            <div className="text-sm text-blue-800">
              <span className="font-semibold">Preenchido por:</span> {formData.preenchidoPor || '-'}
              {' | '}
              <span className="font-semibold">Data:</span> {formData.data ? new Date(formData.data).toLocaleDateString('pt-BR') : '-'}
            </div>
            <button
              onClick={() => {
                setFormData((prev) => ({ ...prev, preenchidoPor: '', data: '' }))
              }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Editar
            </button>
          </div>
        )}

        <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{currentSection.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Seção {currentSection.id}: {currentSection.title}
              </h2>
            </div>
          </div>

          {currentFields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={formData[field.id]}
              onChange={handleFieldChange}
            />
          ))}

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={SECTIONS.length}
            onPrev={handlePrev}
            onNext={handleNext}
            isLastStep={isLastStep}
          />

          {isLastStep && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  isGenerating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isGenerating ? 'Gerando PDF...' : '📄 Gerar PDF do Briefing'}
              </button>
              <button
                onClick={handleReset}
                className="w-full mt-3 py-2 text-gray-500 hover:text-red-600 text-sm transition-colors"
              >
                Limpar todos os dados
              </button>
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Preview do PDF</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <PDFTemplate data={formData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
