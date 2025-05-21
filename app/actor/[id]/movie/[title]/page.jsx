// app/actor/[id]/movie/[title]/page.jsx
import React from 'react';
import actors from '@/data/actors.json';
import Link from 'next/link';

export default function MoviePage({ params }) {
  const { id, title } = params;

  const actor = actors.find((a) => a.ID === id);
  if (!actor) return <div>Actor not found.</div>;

  const movie = actor.Movies.find((m) => m.title === decodeURIComponent(title));
  if (!movie) return <div>Movie not found.</div>;

  return (
    <main className="p-6">
      <Link href={`/actor/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to {actor.Actor_Name}
      </Link>

      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-lg text-gray-600 mb-4">
        <strong>Release Year:</strong> {movie.year}
      </p>
      <p>
        <strong>Description:</strong> {movie.description || 'No description available.'}
      </p>
    </main>
  );
}
