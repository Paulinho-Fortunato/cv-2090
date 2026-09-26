import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot: string;
  format?: string;
  className?: string;
}

export function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      // AdSense not loaded
    }
  }, []);

  return (
    <div className={`relative bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
        <span className="text-xs text-gray-400">Espaço Publicitário</span>
      </div>
    </div>
  );
}
