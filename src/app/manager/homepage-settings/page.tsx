
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { homepageWidgetSettings as globalSettings } from '@/lib/placeholder-data';
import type { HomepageWidgetSetting } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Eye } from 'lucide-react';

export default function ManageHomepageWidgetsPage() {
  const { toast } = useToast();
  // Initialize local state from global placeholder data
  const [currentSettings, setCurrentSettings] = useState<HomepageWidgetSetting[]>(() => 
    JSON.parse(JSON.stringify(globalSettings)) // Deep copy to avoid direct mutation issues with initial state
  );

  useEffect(() => {
    // This effect ensures that if globalSettings are updated externally (e.g. by another user in a real app, or if we add a reset button)
    // the local state reflects that. For this prototype, it mostly helps with initial load if globalSettings itself was a state.
    setCurrentSettings(JSON.parse(JSON.stringify(globalSettings)));
  }, []);


  const handleVisibilityChange = (widgetId: string, newVisibility: boolean) => {
    // Update local state for immediate UI feedback
    setCurrentSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === widgetId ? { ...setting, isVisible: newVisibility } : setting
      )
    );

    // Update global placeholder data (for prototype purposes)
    const globalSettingIndex = globalSettings.findIndex(s => s.id === widgetId);
    if (globalSettingIndex !== -1) {
      globalSettings[globalSettingIndex].isVisible = newVisibility;
    }

    toast({
      title: "Setting Updated",
      description: `Visibility for "${currentSettings.find(s => s.id === widgetId)?.name}" has been ${newVisibility ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-headline text-3xl font-bold text-primary flex items-center gap-2">
          <Eye className="h-8 w-8" /> Manage Homepage Widgets
        </h1>
        <p className="text-muted-foreground mt-1">
          Control which sections are visible on the main public homepage.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Homepage Section Visibility</CardTitle>
          <CardDescription>
            Toggle the switch to show or hide a section on the homepage. Changes are applied immediately for this prototype.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor={`switch-${setting.id}`} className="text-base font-medium">
                  {setting.name}
                </Label>
                <p className="text-xs text-muted-foreground">
                  Currently: {setting.isVisible ? "Visible" : "Hidden"}
                </p>
              </div>
              <Switch
                id={`switch-${setting.id}`}
                checked={setting.isVisible}
                onCheckedChange={(checked) => handleVisibilityChange(setting.id, checked)}
              />
            </div>
          ))}
           <p className="text-xs text-muted-foreground pt-4 text-center">
            Note: In a live application, these changes would typically be saved to a database. Here, they modify in-memory data for demonstration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
