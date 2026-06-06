import React from 'react'
import PicklistField from './PicklistField'

export default function FieldRenderer({ field, value, onChange }) {
  const handleChange = (fieldId, newValue) => onChange(fieldId, newValue)

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">{field.id}. {field.label}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">Como responder: {field.howToAnswer}</p>
      </div>
      <div className="mt-4">
        {field.type === 'text' && (
          <input type="text" value={value || ''} onChange={e => handleChange(field.id, e.target.value)} placeholder={field.placeholder}
            className="w-full px-4 py-3 h-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        )}
        {field.type === 'textarea' && (
          <textarea value={value || ''} onChange={e => handleChange(field.id, e.target.value)} placeholder={field.placeholder} rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y" />
        )}
        {(field.type === 'picklist' || field.type === 'picklist-multi') && (
          <PicklistField field={field} value={value} onChange={handleChange} />
        )}
      </div>
      {field.example && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-r-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200"><span className="font-semibold">Exemplo: </span>{field.example}</p>
        </div>
      )}
    </div>
  )
}