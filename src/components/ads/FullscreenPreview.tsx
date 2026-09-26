import { X, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { Preview } from '../builder/Preview';

interface FullscreenPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenPreview({ isOpen, onClose }: FullscreenPreviewProps) {
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleReset = () => setZoom(100);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <h2 className="text-white text-lg font-semibold">Preview em Tela Cheia</h2>
        <div className="flex items-center gap-4">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
            <button
              onClick={handleZoomOut}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Diminuir zoom"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm font-medium min-w-[60px] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <div className="w-px h-5 bg-gray-600 mx-1" />
            <button
              onClick={handleReset}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Resetar zoom"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-8 bg-gray-800">
        <div className="flex justify-center">
          <div
            style={{ transform: `scale(${zoom / 100})` }}
            className="transition-transform duration-200 origin-top"
          >
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
}
