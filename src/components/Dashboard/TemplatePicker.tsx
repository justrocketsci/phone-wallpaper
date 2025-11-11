'use client'

import Link from 'next/link'
import { templates } from '@/data/templates'
import { gradients } from '@/data/gradients'

export function TemplatePicker() {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Quick Start Templates
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Choose a template to get started quickly
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const gradient = gradients.find((g) => g.id === template.gradient)
          
          return (
            <Link
              key={template.id}
              href={`/create?template=${template.id}`}
              className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
            >
              {/* Preview */}
              <div className="aspect-[9/16] relative overflow-hidden">
                {/* Gradient background preview */}
                {gradient && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        gradient.type === 'linear'
                          ? `linear-gradient(${gradient.angle || 135}deg, ${gradient.colors.join(', ')})`
                          : `radial-gradient(circle, ${gradient.colors.join(', ')})`,
                    }}
                  />
                )}

                {/* QR placeholder indicators */}
                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center gap-8">
                  {template.qrBlocks.slice(0, 2).map((block, idx) => (
                    <div
                      key={idx}
                      className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-col items-center gap-2"
                    >
                      <div className="w-20 h-20 bg-slate-800 rounded-md flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm2 2h4v4h-4V5zm4 12h-2v2h2v-2zm-6-2h2v2h-2v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm0-4h2v2h-2v-2z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-slate-700 truncate max-w-full px-2">
                        {block.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg
                      className="w-12 h-12 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="font-semibold">Use This Template</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-white dark:bg-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {template.description}
                </p>

                {/* Template details */}
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 8h8v8H3v-8zm2 2v4h4v-4H5zm8-12v8h8V3h-8zm2 2h4v4h-4V5zm4 12h-2v2h2v-2zm-6-2h2v2h-2v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm0-4h2v2h-2v-2z" />
                    </svg>
                    <span>{template.qrBlocks.length} QR codes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600"
                      style={{
                        background:
                          gradient?.type === 'linear'
                            ? `linear-gradient(${gradient.angle || 135}deg, ${gradient.colors.join(', ')})`
                            : gradient
                            ? `radial-gradient(circle, ${gradient.colors.join(', ')})`
                            : '#ccc',
                      }}
                    />
                    <span>{gradient?.name || 'Custom'}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

