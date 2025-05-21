// app/actor/[id]/page.jsx
import React from 'react';
import actors from '@/data/actors.json';
import Link from 'next/link';

export default function ActorPage({ params }) {
  const actor = actors.find((a) => a.ID === params.id);

  if (!actor) return <div>Actor not found.</div>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{actor.Actor_Name}'s Movies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actor.Movies.map((movie, index) => (
          <Link
            key={index}
            href={`/actor/${actor.ID}/movie/${encodeURIComponent(movie.title)}`}
          >
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p><strong>Release Year:</strong> {movie.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
