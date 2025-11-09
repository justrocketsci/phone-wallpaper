'use client'

import { useState } from 'react'
import { StepPhone } from './StepPhone'
import { StepBackground } from './StepBackground'
import { StepQR } from './StepQR'
import { StepTypography } from './StepTypography'
import { clsx } from 'clsx'

const steps = [
  { id: 1, title: 'Phone', component: StepPhone },
  { id: 2, title: 'Background', component: StepBackground },
  { id: 3, title: 'QR Codes', component: StepQR },
  { id: 4, title: 'Typography', component: StepTypography },
]

export function Sidebar() {
  const [activeStep, setActiveStep] = useState(1)

  const ActiveComponent = steps[activeStep - 1].component

  return (
    <div className="w-96 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold">QR Wallpaper</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Create custom wallpapers with QR codes
        </p>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-700">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={clsx(
              'flex-1 py-3 text-sm font-medium border-b-2 transition-colors',
              activeStep === step.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            )}
          >
            {step.id}. {step.title}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <ActiveComponent />
      </div>
    </div>
  )
}

