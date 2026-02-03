'use client';

import { useEffect } from 'react';

export default function AdInContent({ width = 'auto' }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  return (
    <div className="w-full my-6">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          width: '100%',
          maxWidth: '728px',
          margin: '0 auto',
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-9991254411797769"
        data-ad-slot="3495278752"
      ></ins>
    </div>
  );
}
