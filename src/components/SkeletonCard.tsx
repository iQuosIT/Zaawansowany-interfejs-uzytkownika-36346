// src/components/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className='skeleton-card' aria-hidden='true'>
      <div className='skeleton-img shimmer' style={{ height: '300px', background: '#ccc' }} />
      <div className='skeleton-title shimmer' style={{ height: '20px', background: '#ccc', margin: '10px 0' }} />
      <div className='skeleton-meta shimmer' style={{ height: '15px', background: '#ccc' }} />
    </div>
  );
}