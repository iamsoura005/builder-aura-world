import { Link } from "react-router-dom";

export default function Placeholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="glass rounded-2xl p-10 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{title}</h1>
          <p className="text-white/70 max-w-2xl mx-auto">{description ?? "This section is ready to be built next. Tell me what to include and I'll craft it to match the Dristi design language."}</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/fundus" className="btn-neon">Analyze Fundus Image</Link>
            <Link to="/" className="btn-outline-neon">Back to Home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
