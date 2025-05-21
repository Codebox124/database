import Link from 'next/link';
import actorsData from '../data/actors.json';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Actors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actorsData.map((actor) => (
          <Link
            key={actor.ID}
            href={`/actor/${actor.ID}`}
            className="block border rounded-2xl shadow p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{actor.Actor_Name}</h2>
            <p><strong>Birth Date:</strong> {actor.Birth_Date}</p>
            <p><strong>First Movie:</strong> {actor.Name_First_Movie}</p>
            <p><strong>Total Movies:</strong> {actor.Total_Movies}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
