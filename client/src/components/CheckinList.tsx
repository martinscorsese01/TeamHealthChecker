import { cn } from "@/lib/utils";
import { Checkin } from "@/types/checkin";

interface CheckinListProps {
  checkins: Checkin[];
}

export default function CheckinList({ checkins }: CheckinListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-slate-900">Team Check-ins</h2>
        <span className="bg-slate-100 text-slate-700 text-sm font-medium rounded-full px-2.5 py-0.5">
          {checkins.length} total
        </span>
      </div>
      
      {checkins.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-slate-500 mb-2">No check-ins submitted yet</p>
          <p className="text-sm text-slate-400">Be the first to share how you're feeling with the team</p>
        </div>
      ) : (
        <div className="space-y-3">
          {checkins.map((checkin) => (
            <div 
              key={checkin.id} 
              className="checkin-item p-4 rounded-md border border-slate-200 hover:border-slate-300 bg-white shadow-sm fade-in"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-slate-900">{checkin.name}</h3>
                    <span className={cn(
                      "text-xs font-medium rounded-full px-2.5 py-0.5 border",
                      getFeelingStyles(checkin.feeling)
                    )}>
                      {checkin.feeling}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{checkin.date}</p>
                </div>
                <div className="text-sm text-slate-700 sm:text-right max-w-sm">
                  {checkin.notes || "No additional notes provided."}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getFeelingStyles(feeling: string): string {
  switch (feeling) {
    case "Great":
      return "feeling-great bg-green-100 text-green-600 border-green-200";
    case "Good":
      return "feeling-good bg-yellow-100 text-yellow-600 border-yellow-200";
    case "Okay":
      return "feeling-okay bg-blue-100 text-blue-600 border-blue-200";
    case "Bad":
      return "feeling-bad bg-red-100 text-red-600 border-red-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
}
