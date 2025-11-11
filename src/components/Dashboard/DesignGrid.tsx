'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Design } from '@/lib/design'

interface DesignGridProps {
  designs: Design[]
  onDelete: (id: string) => void
}

export function DesignGrid({ designs, onDelete }: DesignGridProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return
    }

    setDeletingId(id)
    try {
      await onDelete(id)
    } finally {
      setDeletingId(null)
    }
  }

  if (designs.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          No designs yet
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Create your first design to get started
        </p>
        <Link
          href="/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
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
          Create Design
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {designs.map((design) => (
        <div
          key={design.id}
          className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          {/* Thumbnail */}
          <Link href={`/create?design=${design.id}`} className="block">
            <div className="aspect-[9/16] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative overflow-hidden">
              {design.thumbnail ? (
                <Image
                  src={design.thumbnail}
                  alt={design.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-slate-300 dark:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="text-white font-semibold">Edit Design</span>
              </div>
            </div>
          </Link>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1 truncate">
              {design.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {new Date(design.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            {/* Actions */}
            <div className="mt-3 flex items-center gap-2">
              <Link
                href={`/create?design=${design.id}`}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors text-center"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(design.id, design.name)}
                disabled={deletingId === design.id}
                className="px-3 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete design"
              >
                {deletingId === design.id ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

