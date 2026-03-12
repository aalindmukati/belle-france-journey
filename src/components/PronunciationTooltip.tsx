import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PronunciationTooltipProps {
  french: string;
  pronunciation: string;
  children?: React.ReactNode;
}

const PronunciationTooltip = ({ french, pronunciation, children }: PronunciationTooltipProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="french-word cursor-help border-b border-dotted border-accent/40">
        {children || french}
      </span>
    </TooltipTrigger>
    <TooltipContent>
      <p className="font-body text-xs">Pronounced: <strong>{pronunciation}</strong></p>
    </TooltipContent>
  </Tooltip>
);

export default PronunciationTooltip;
