import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkin } from "@/types/checkin";

const checkinSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  feeling: z.string().min(1, { message: "Please select how you're feeling" }),
  date: z.string().min(1, { message: "Date is required" }),
  notes: z.string().optional(),
});

type CheckinFormValues = z.infer<typeof checkinSchema>;

interface CheckinFormProps {
  onSubmit: (checkin: Checkin) => void;
}

export default function CheckinForm({ onSubmit }: CheckinFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get today's date in YYYY-MM-DD format for the default date value
  const today = new Date().toISOString().split("T")[0];
  
  const form = useForm<CheckinFormValues>({
    resolver: zodResolver(checkinSchema),
    defaultValues: {
      name: "",
      feeling: "",
      date: today,
      notes: "",
    },
  });

  const handleFormSubmit = (values: CheckinFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API request delay
    setTimeout(() => {
      const newCheckin: Checkin = {
        id: Date.now(),
        name: values.name,
        feeling: values.feeling,
        date: formatDateForDisplay(values.date),
        notes: values.notes || "",
        timestamp: new Date(),
      };
      
      onSubmit(newCheckin);
      form.reset({
        name: "",
        feeling: "",
        date: today,
        notes: "",
      });
      setIsSubmitting(false);
    }, 500);
  };

  // Helper function to format date for display
  function formatDateForDisplay(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-slate-900 mb-4">Submit Your Check-in</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-slate-700">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your name" 
                    {...field} 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Feeling Field */}
          <FormField
            control={form.control}
            name="feeling"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-slate-700">How are you feeling?</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent">
                      <SelectValue placeholder="Select how you're feeling" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Great">Great</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Okay">Okay</SelectItem>
                    <SelectItem value="Bad">Bad</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Date Field */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-slate-700">Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Notes Field */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-slate-700">Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share any additional thoughts..." 
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Submit Button */}
          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Check-in"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}