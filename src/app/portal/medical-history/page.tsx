
import { placeholderMedicalHistory } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CalendarDays, User, Stethoscope, Pill } from 'lucide-react'; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

const getIconForMedicalRecordType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'diagnosis': return <Stethoscope className="h-4 w-4 mr-1.5" />;
    case 'medication': return <Pill className="h-4 w-4 mr-1.5" />;
    case 'procedure': return <FileText className="h-4 w-4 mr-1.5" />; // Using FileText for procedure as a general icon
    case 'allergy': return <FileText className="h-4 w-4 mr-1.5" />; // Using FileText, color will differentiate
    default: return <FileText className="h-4 w-4 mr-1.5" />;
  }
};

const getBadgeForType = (type: string) => {
  const icon = getIconForMedicalRecordType(type);
  switch (type.toLowerCase()) {
    case 'diagnosis': return <Badge variant="destructive" className="capitalize flex items-center">{icon}Diagnosis</Badge>;
    case 'medication': return <Badge variant="secondary" className="capitalize flex items-center">{icon}Medication</Badge>;
    case 'allergy': return <Badge variant="outline" className="border-amber-500 text-amber-600 capitalize flex items-center">{icon}Allergy</Badge>;
    case 'procedure': return <Badge variant="default" className="capitalize flex items-center">{icon}Procedure</Badge>;
    default: return <Badge variant="outline" className="capitalize flex items-center">{icon}Note</Badge>;
  }
};

export default function MedicalHistoryPage() {
  const groupedHistory = placeholderMedicalHistory.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    // Sort items within each year by date descending
    acc[year].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return acc;
  }, {} as Record<string, typeof placeholderMedicalHistory>);

  // Sort years descending
  const sortedYears = Object.keys(groupedHistory).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <FileText className="h-8 w-8" /> Medical History
        </h1>
        <p className="text-muted-foreground mt-1">
          A comprehensive overview of your past diagnoses, treatments, and important health events.
        </p>
      </header>

      {sortedYears.length > 0 ? (
        <Accordion type="multiple" defaultValue={sortedYears.slice(0,1)} className="w-full space-y-4">
          {sortedYears.map((year) => (
            <AccordionItem key={year} value={year} className="border rounded-lg bg-card shadow-sm">
              <AccordionTrigger className="px-6 py-4 text-xl font-headline hover:no-underline">
                Year {year}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="space-y-4">
                {groupedHistory[year].map((item) => (
                  <Card key={item.id} className="overflow-hidden border-l-4 border-primary/30 bg-background/50">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                           {getBadgeForType(item.type)}
                          <CardTitle className="text-lg mt-2">{item.description}</CardTitle>
                        </div>
                       
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" /> Date: {new Date(item.date).toLocaleDateString()}
                        </p>
                        {item.doctor && (
                          <p className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Provider: {item.doctor}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No medical history records found.</p>
          </CardContent>
        </Card>
      )}
       <p className="text-xs text-muted-foreground text-center mt-8">
          This information is for record-keeping purposes. Always consult with your healthcare provider for medical advice.
        </p>
    </div>
  );
}
