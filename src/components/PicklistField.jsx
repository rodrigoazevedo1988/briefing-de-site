import React, { useState } from 'react'

export default function PicklistField({ field, value, onChange }) {
  const [search, setSearch] = useState('')
  const isMulti = field.type === 'picklist-multi'

  const selectedValues = isMulti
    ? Array.isArray(value) ? value : []
    : value || ''

  const filteredOptions = field.options.filter(
    (opt) =>
      opt.toLowerCase().includes(search.toLowerCase()) &&
      (isMulti ? !selectedValues.includes(opt) : opt !== selectedValues)
  )

  const handleSelect = (option) => {
    if (isMulti) {
      const newValues = [...selectedValues, option]
      onChange(field.id, newValues)
    } else {
      onChange(field.id, option)
    }
    setSearch('')
  }

  const handleRemove = (option) => {
    if (isMulti) {
      const newValues = selectedValues.filter((v) => v !== option)
      onChange(field.id, newValues)
    } else {
      onChange(field.id, '')
    }
  }

  return (
    <div className="space-y-3">
      {isMulti && selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedValues.map((val) => (
            <span
              key={val}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {val}
              <button
                onClick={() => handleRemove(val)}
                className="hover:text-blue-600 font-bold ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          placeholder={isMulti ? 'Buscar opções...' : 'Selecione uma opção...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {search && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">Nenhuma opção encontrada</div>
            )}
          </div>
        )}
      </div>

      {!isMulti && selectedValues && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
          <span className="text-gray-700">{selectedValues}</span>
          <button
            onClick={() => handleRemove(selectedValues)}
            className="text-gray-500 hover:text-red-600 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {!isMulti && !selectedValues && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg text-gray-400 text-sm">
          Selecione uma opção acima
        </div>
      )}
    </div>
  )
}
