import React, { useState } from 'react'

export default function PicklistField({ field, value, onChange }) {
  const [search, setSearch] = useState('')
  const isMulti = field.type === 'picklist-multi'
  const selectedValues = isMulti ? (Array.isArray(value) ? value : []) : (value || '')
  const filteredOptions = field.options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()) && (isMulti ? !selectedValues.includes(opt) : opt !== selectedValues))

  const handleSelect = (option) => {
    if (isMulti) onChange(field.id, [...selectedValues, option])
    else onChange(field.id, option)
    setSearch('')
  }

  const handleRemove = (option) => {
    if (isMulti) onChange(field.id, selectedValues.filter(v => v !== option))
    else onChange(field.id, '')
  }

  return (
    <div className="space-y-3">
      {isMulti && selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedValues.map(val => (
            <span key={val} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {val}
              <button onClick={() => handleRemove(val)} className="hover:text-blue-600 font-bold ml-1">×</button>
            </span>
          ))}
        </div>
      )}
      <div className="relative">
        <input type="text" placeholder={isMulti ? 'Buscar opções...' : 'Selecione uma opção...'} value={search} onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 h-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        {search && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? filteredOptions.map(option => (
              <button key={option} onClick={() => handleSelect(option)} className="w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200">{option}</button>
            )) : <div className="px-4 py-2 text-gray-500 dark:text-gray-400">Nenhuma opção encontrada</div>}
          </div>
        )}
      </div>
      {!isMulti && selectedValues && (
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-between h-12">
          <span className="text-gray-700 dark:text-gray-200">{selectedValues}</span>
          <button onClick={() => handleRemove(selectedValues)} className="text-gray-500 hover:text-red-600 font-bold">×</button>
        </div>
      )}
      {!isMulti && !selectedValues && <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-400 dark:text-gray-500 text-sm h-12 flex items-center">Selecione uma opção acima</div>}
    </div>
  )
}