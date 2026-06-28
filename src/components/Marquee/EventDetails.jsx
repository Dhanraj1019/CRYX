import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatabaseObj from "../../../Supabase/database";
import Loader from "../Loader";

const formatEventDate = (date) => {
  if (!date) return "Date TBA";

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

const formatEventTime = (time) => {
  if (!time) return "Time TBA";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`2000-01-01T${time}`));
};

const splitFeatures = (event) => {
  const value = event?.highlight || event?.heighlight || event?.features;

  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);

  return String(value)
    .split(/[\n,|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      setNotFound(false);

      const result = await DatabaseObj.getRow({
        bucket: "event",
        chake: ["id", eventId],
      });

      setEvent(result || null);
      setNotFound(!result);
      setLoading(false);
    };

    if (eventId) getEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[4px] text-neon-red">
          Event not found
        </p>
        <h1 className="mt-4 font-mono text-2xl font-bold uppercase tracking-wider text-text-primary">
          No event details available
        </h1>
        <Link
          to="/home"
          className="mt-6 rounded-sm border border-neon-cyan/60 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[2px] text-neon-cyan transition-all duration-300 hover:bg-neon-cyan hover:text-black"
        >
          Back Home
        </Link>
      </div>
    );
  }

  const features = splitFeatures(event);

  return (
    <main className="mx-auto max-w-7xl px-3 py-8 sm:px-4 md:px-8 md:py-12">
      <section className="overflow-hidden rounded-sm border border-border-subtle bg-bg-elevated/30 shadow-[0_0_40px_rgba(103,232,249,0.06)]">
        <div className="relative min-h-[260px] md:min-h-[420px]">
          <img
            src={event.publicurl}
            alt={event.title || "CRYX event"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/75 to-black/25"></div>
          <div className="relative flex min-h-[260px] flex-col justify-end p-5 sm:p-8 md:min-h-[420px] md:p-10">
            <p className="font-mono text-xs uppercase tracking-[4px] text-neon-cyan">
              CRYX Event Access
            </p>
            <h1 className="mt-3 max-w-4xl font-mono text-2xl font-bold uppercase tracking-wider text-neon-green sm:text-4xl md:text-6xl">
              {event.title || "Untitled Event"}
            </h1>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-[3px] text-neon-cyan">
              Event Details
            </h2>
            <p className="mt-4 whitespace-pre-line font-mono text-sm leading-7 text-text-muted sm:text-base">
              {event.discription || "Full event description will be updated soon."}
            </p>

            {features.length > 0 && (
              <div className="mt-8">
                <h3 className="font-mono text-sm font-bold uppercase tracking-[3px] text-neon-green">
                  Features
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-sm border border-neon-green/30 bg-neon-green/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-neon-green"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="border border-border-subtle bg-[#0b0f19]/70 p-5">
            <div className="space-y-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-text-muted">
                  Date
                </p>
                <p className="mt-1 font-mono text-base font-bold text-text-primary">
                  {formatEventDate(event.date)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-text-muted">
                  Time
                </p>
                <p className="mt-1 font-mono text-base font-bold text-text-primary">
                  {formatEventTime(event.time)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-text-muted">
                  Place
                </p>
                <p className="mt-1 font-mono text-base font-bold text-text-primary">
                  {event.place || "Venue TBA"}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to={`/signup?event=${event.id}`}
                className="mt-8 block w-full rounded-sm bg-neon-green px-5 py-3 text-center font-mono text-sm font-bold uppercase tracking-[3px] text-black transition-all duration-300 hover:shadow-[0_0_22px_rgba(52,211,153,0.45)]"
              >
                Register Now
              </Link>
              <Link
                to={`/signup?event=${event.id}`}
                className="mt-8 block w-full rounded-sm bg-blue-600 px-5 py-3 text-center font-mono text-sm font-bold uppercase tracking-[3px] text-amber-100 transition-all duration-300 hover:shadow-[0_0_22px_rgba(52,211,153,0.45)]"
              >
                See Registrations
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
