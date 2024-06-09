'use client';

export default function Error({ error }: { error: Error}) {
  return <h2 className="p-40 text-center md:p-60 lg:p-80">{error.message}</h2>
}