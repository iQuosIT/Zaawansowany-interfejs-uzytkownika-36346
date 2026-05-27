// Etap D — Skeleton Loading z shimmer (CSS @keyframes w src/index.css)
// W trybie prefers-reduced-motion shimmer jest wyłączany przez CSS.
export function SkeletonCard() {
  return (
    <div className='skeleton-card' aria-hidden='true'>
      <div className='skeleton' style={{ height: '300px' }} />
      <div className='skeleton' style={{ height: '20px', margin: '12px 0 8px' }} />
      <div className='skeleton' style={{ height: '14px', width: '60%' }} />
    </div>
  );
}
