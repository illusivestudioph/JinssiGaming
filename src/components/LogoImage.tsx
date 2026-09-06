import { useState } from 'react';

// A missing or invalid replacement must not hide the site's only wordmark.
export function LogoImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const imageSource = !src || failedSource === src ? '/logo.jpeg' : src;

  return (
    <img src={imageSource} alt={alt} className={className} onError={() => setFailedSource(src)} />
  );
}
