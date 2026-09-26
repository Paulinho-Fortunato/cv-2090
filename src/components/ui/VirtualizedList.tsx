import { memo } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  width?: number | string;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
}

// Lista virtualizada simplificada sem dependências externas
function VirtualizedListInner<T>({
  items,
  itemHeight,
  height,
  renderItem,
}: VirtualizedListProps<T>) {
  // Para listas pequenas, renderizar normalmente
  if (items.length <= 50) {
    return (
      <div style={{ height, overflow: 'auto' }}>
        {items.map((item, index) => (
          <div key={index} style={{ height: itemHeight }}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  // Para listas grandes, usar virtualização simples
  return (
    <div style={{ height, overflow: 'auto' }} className="virtualized-list">
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: index * itemHeight,
              height: itemHeight,
              width: '100%',
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export const VirtualizedList = memo(VirtualizedListInner) as <T>(
  props: VirtualizedListProps<T>
) => JSX.Element;

// Hook para determinar se deve usar lista virtualizada
export function useVirtualizedList(itemCount: number, threshold = 20) {
  return itemCount > threshold;
}
