import { CalendarDays, Clock, Ticket, Users } from "lucide-react";
import { ArtworkVisual } from "@/components/artwork-visual";
import type { Artist, Workshop } from "@/lib/data";

type WorkshopCardProps = {
  workshop: Workshop;
  teacher: Artist;
  onRegister: (workshop: Workshop) => void;
};

export function WorkshopCard({
  workshop,
  teacher,
  onRegister,
}: WorkshopCardProps) {
  return (
    <article className="rounded-xl border border-[#CFC8BA] bg-[#FAF8F4] p-5">
      <div className="flex items-start gap-3">
        <ArtworkVisual
          visual={teacher.visual}
          label={`${teacher.name} avatar`}
          className="size-12 shrink-0 rounded-full"
        />
        <div>
          <h2 className="font-display text-3xl leading-tight text-[#3B6D11]">
            {workshop.title}
          </h2>
          <p className="mt-1 font-semibold text-[#24231F]">{teacher.name}</p>
          <p className="text-sm text-[#6F6A60]">
            {workshop.region} · {teacher.city}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#D9A441]/18 px-3 py-1 text-xs font-semibold text-[#7a5b15]">
          {workshop.artForm}
        </span>
        <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-semibold text-[#3B6D11]">
          {workshop.format}
        </span>
        <span className="rounded-full bg-[#E76F51]/12 px-3 py-1 text-xs font-semibold text-[#9f3d26]">
          {workshop.access}
        </span>
      </div>
      <p className="mt-4 leading-7 text-[#6F6A60]">{workshop.description}</p>
      <div className="mt-4 grid gap-2 text-sm font-semibold text-[#6F6A60]">
        <span className="inline-flex items-center gap-2">
          <CalendarDays size={16} aria-hidden="true" />
          {workshop.dateTime}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock size={16} aria-hidden="true" />
          {workshop.duration}
        </span>
        <span className="inline-flex items-center gap-2">
          <Users size={16} aria-hidden="true" />
          {workshop.seats} seats available
        </span>
      </div>
      <button
        type="button"
        onClick={() => onRegister(workshop)}
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#E76F51] px-5 text-sm font-semibold text-white hover:bg-[#d65e42]"
      >
        <Ticket size={16} aria-hidden="true" />
        Register
      </button>
    </article>
  );
}
