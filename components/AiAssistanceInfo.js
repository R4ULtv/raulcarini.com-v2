import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SparklesIcon } from "@heroicons/react/16/solid";

export default function AiAssistanceInfo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="outline-hidden text-zinc-800 dark:text-zinc-200 p-1 group">
          <SparklesIcon className="size-4 group-hover:scale-110 transition duration-75 ease-out" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="p-3 my-1 w-52 space-y-1.5 text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl transition ease-out data-closed:-translate-y-8 data-closed:opacity-0 data-closed:scale-50">
        <div className="text-sm text-zinc-800 dark:text-zinc-200 font-semibold flex items-center gap-1">
          AI Assistance <SparklesIcon className="size-3.5" />
        </div>
        <p className="text-xs">
          This article has been enhanced with the assistance of an AI to provide
          more accurate and comprehensive information.
        </p>
        <p className="text-xs">
          This information is provided for the sake of transparency.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
