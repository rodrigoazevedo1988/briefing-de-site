import React, { useState, useEffect } from 'react'
import { SECTIONS, getFieldsBySection } from './data/fields'
import { saveData, loadData, clearData, saveTheme, loadTheme } from './utils/storage'
import { generatePDF } from './utils/pdfGenerator'
import StepIndicator from './components/StepIndicator'
import FieldRenderer from './components/FieldRenderer'
import NavigationButtons from './components/NavigationButtons'
import PDFTemplate from './components/PDFTemplate'

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [darkMode, setDarkMode] = useState(false)
  const [formData, setFormData] = useState({ preenchidoPor: '', data: '' })
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const saved = loadData()
    if (saved) setFormData(saved)
    const theme = loadTheme()
    const isDark = theme === 'dark'
    setDarkMode(isDark)
    if (isDark) document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => { saveData(formData) }, [formData])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    saveTheme(newMode ? 'dark' : 'light')
    if (newMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  const handleFieldChange = (id, val) => setFormData(prev => ({ ...prev, [id]: val }))
  const handleHeaderChange = (field, val) => setFormData(prev => ({ ...prev, [field]: val }))
  const handleStepClick = (step) => { if (step <= currentStep) setCurrentStep(step) }

  const showNotification = (msg, type = 'success') => {
    setNotification({ message: msg, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      setShowPreview(true)
      await new Promise(r => setTimeout(r, 100))
      await generatePDF('briefing-pdf-template')
      showNotification('PDF gerado com sucesso!')
    } catch (e) {
      showNotification('Erro ao gerar PDF.', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    if (confirm('Limpar todos os dados?')) {
      clearData()
      setFormData({ preenchidoPor: '', data: '' })
      setCurrentStep(1)
      showNotification('Dados limpos!')
    }
  }

  const currentSection = SECTIONS[currentStep - 1]
  const currentFields = getFieldsBySection(currentSection.id)
  const isLastStep = currentStep === SECTIONS.length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors">
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Briefing - Criação de Site</h1>
            <p className="text-gray-600 dark:text-gray-400">Preencha o formulário para criar o briefing do seu projeto</p>
          </div>
          <button onClick={toggleDarkMode}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {currentStep === 1 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Antes de começar, informe quem está preenchendo:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome e cargo</label>
                <input type="text" value={formData.preenchidoPor || ''} onChange={e => handleHeaderChange('preenchidoPor', e.target.value)}
                  placeholder="Ex: João Silva - Diretor de Marketing"
                  className="w-full px-4 py-3 h-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
                <input type="date" value={formData.data || ''} onChange={e => handleHeaderChange('data', e.target.value)}
                  className="w-full px-4 py-3 h-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>
        )}

        <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{currentSection.icon}</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Seção {currentSection.id}: {currentSection.title}</h2>
          </div>

          {currentFields.map(field => (
            <FieldRenderer key={field.id} field={field} value={formData[field.id]} onChange={handleFieldChange} />
          ))}

          <NavigationButtons currentStep={currentStep} totalSteps={SECTIONS.length}
            onPrev={() => setCurrentStep(s => s - 1)} onNext={() => setCurrentStep(s => s + 1)} />

          {isLastStep && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
              <button onClick={handleGeneratePDF} disabled={isGenerating}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
                {isGenerating ? 'Gerando PDF...' : '📄 Gerar PDF do Briefing'}
              </button>
              <button onClick={handleReset} className="w-full mt-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-600 text-sm transition-colors">Limpar todos os dados</button>
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">Preview do PDF</h3>
              <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            <div className="p-4"><PDFTemplate data={formData} /></div>
          </div>
        </div>
      )}
    </div>
  )
}