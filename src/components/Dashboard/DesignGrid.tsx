'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Design } from '@/lib/design'
import { Button } from '@/components/ui/button'
import { Plus, ImageOff, Loader2, Trash2 } from 'lucide-react'

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
        <Button asChild variant="secondary" size="lg">
          <Link href="/create">
            <Plus className="w-5 h-5" />
            Create Design
          </Link>
        </Button>
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
                  <ImageOff className="w-16 h-16 text-slate-300 dark:text-slate-600" />
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
              <Button
                onClick={() => handleDelete(design.id, design.name)}
                disabled={deletingId === design.id}
                variant="ghost"
                size="sm"
                className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                title="Delete design"
              >
                {deletingId === design.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

