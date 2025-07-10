import React from 'react'
import { fontOptions } from '../constants/fontOptions'
import { FONT_COLOR_PALETTE } from '../constants/fontColors'

interface StyleDrawerProps {
  open: boolean
  onClose: () => void
  selectedFont: string
  selectedColor: string
  onFontChange: (font: string) => void
  onColorChange: (color: string) => void
}

const StyleDrawer: React.FC<StyleDrawerProps> = ({
  open,
  onClose,
  selectedFont,
  selectedColor,
  onFontChange,
  onColorChange,
}) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="w-1/2 max-w-2xl bg-white h-full shadow-xl p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Customize Style</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold"
            aria-label="Close Drawer"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col space-y-8 flex-1 overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">Font Family</h3>
            <div className="flex flex-wrap gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 text-sm ${
                    selectedFont === font.value
                      ? 'bg-[#D40000] text-white border-[#D40000] scale-105'
                      : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                  }`}
                  style={{ fontFamily: font.value }}
                  onClick={() => onFontChange(font.value)}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Font Color</h3>
            <div className="flex flex-wrap gap-2">
              {FONT_COLOR_PALETTE.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                    selectedColor === color
                      ? 'border-[#D40000] ring-2 ring-[#D40000]/30 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StyleDrawer
