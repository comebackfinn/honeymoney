'use client';

import { useEffect } from 'react';

export default function AdBanner({ position = 'top' }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  const slotIds = {
    top: '4808360428',
    middle: '3495278752',
    bottom: '7582262800',
  };

  const currentSlot = slotIds[position] || slotIds.top;

  return (
    <div className="w-full my-6">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9991254411797769"
        data-ad-slot={currentSlot}
      ></ins>
    </div>
  );
}
