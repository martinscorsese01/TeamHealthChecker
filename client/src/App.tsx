import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import CheckinForm from "@/components/CheckinForm";
import CheckinList from "@/components/CheckinList";
import { Checkin } from "@/types/checkin";

function App() {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const { toast } = useToast();

  const handleSubmit = (newCheckin: Checkin) => {
    setCheckins([newCheckin, ...checkins]);
    toast({
      title: "Check-in submitted successfully!",
      description: "Your team check-in has been recorded.",
      variant: "success",
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <div className="container mx-auto py-6 px-4 max-w-4xl">
        <div className="flex flex-col space-y-8">
          {/* Header Section */}
          <header className="text-center">
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">Team Health Board</h1>
            <p className="text-slate-600">Track how your team is feeling and collaborate better</p>
          </header>
          
          {/* Main Content */}
          <main className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <CheckinForm onSubmit={handleSubmit} />
            <CheckinList checkins={checkins} />
          </main>
          
          <footer className="text-center text-sm text-slate-500">
            <p>Team Health Checker — Created with React, Tailwind CSS & Shadcn UI</p>
          </footer>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
