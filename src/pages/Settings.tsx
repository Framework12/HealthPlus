import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Globe,
  Smartphone,
  Mail,
  Key,
  Download,
  Upload,
  Trash2,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    name: "Dr.Prachi jain",
    email: "dr.prachi@healthplus.com",
    phone: " +91 98765 43210",
    bio: "Experienced physician specializing in internal medicine",
    avatar: ".",

    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    systemAlerts: true,
  
    twoFactorAuth: false,
    dataSharing: false,
    activityLogging: true,
    
    darkMode: false,
    compactMode: false,
    language: "en",
    
    autoBackup: true,
    dataRetention: "12", 
  });
  
  const [backupProgress, setBackupProgress] = useState(0);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const runBackup = () => {
    setBackupProgress(0);
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "Backup Complete",
            description: "Your data has been successfully backed up.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
              <SettingsIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Manage your account and application preferences</p>
            </div>
          </div>
          <Button onClick={saveSettings} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
        <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center text-xl">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={settings.avatar} alt={settings.name} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xl">
                      {settings.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-sm border-card-border">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => updateSetting('name', e.target.value)}
                      className="bg-background/50 backdrop-blur-sm border-card-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSetting('email', e.target.value)}
                      className="bg-background/50 backdrop-blur-sm border-card-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => updateSetting('phone', e.target.value)}
                    className="bg-background/50 backdrop-blur-sm border-card-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => updateSetting('bio', e.target.value)}
                    className="bg-background/50 backdrop-blur-sm border-card-border"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center text-xl">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser notifications</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Text message alerts</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Remind about upcoming appointments</p>
                  </div>
                  <Switch
                    id="appointmentReminders"
                    checked={settings.appointmentReminders}
                    onCheckedChange={(checked) => updateSetting('appointmentReminders', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="systemAlerts">System Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important system messages</p>
                  </div>
                  <Switch
                    id="systemAlerts"
                    checked={settings.systemAlerts}
                    onCheckedChange={(checked) => updateSetting('systemAlerts', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center text-xl">
                  <Palette className="h-5 w-5 mr-2" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle dark theme</p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing</p>
                  </div>
                  <Switch
                    id="compactMode"
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center text-xl">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                    />
                    {settings.twoFactorAuth && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Enabled
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share analytics for service improvement</p>
                  </div>
                  <Switch
                    checked={settings.dataSharing}
                    onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Activity Logging</Label>
                    <p className="text-sm text-muted-foreground">Keep logs of user activity</p>
                  </div>
                  <Switch
                    checked={settings.activityLogging}
                    onCheckedChange={(checked) => updateSetting('activityLogging', checked)}
                  />
                </div>

                <Separator />

                <div className="pt-2">
                  <Button variant="outline" className="w-full bg-background/50 backdrop-blur-sm border-card-border hover:bg-secondary/50">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center text-xl">
                  <Database className="h-5 w-5 mr-2" />
                  System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBackup">Auto Backup</Label>
                    <p className="text-sm text-muted-foreground">Daily backups</p>
                  </div>
                  <Switch
                    id="autoBackup"
                    checked={settings.autoBackup}
                    onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (months)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => updateSetting('dataRetention', e.target.value)}
                    className="bg-background/50 backdrop-blur-sm border-card-border"
                  />
                </div>

                <Separator />
                
                <div className="flex flex-col gap-2">
                  <div className="space-y-1">
                    <Button onClick={runBackup} variant="outline" className="w-full bg-background/50 backdrop-blur-sm border-card-border hover:bg-secondary/50">
                      <Download className="h-4 w-4 mr-2" />
                      Run Manual Backup
                    </Button>
                    <Progress value={backupProgress} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full bg-background/50 backdrop-blur-sm border-card-border hover:bg-secondary/50">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                  <Button variant="outline" className="w-full bg-background/50 backdrop-blur-sm border-card-border hover:bg-secondary/50">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center text-xl">
                    <Globe className="h-5 w-5 mr-2" />
                    Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full bg-background/50 backdrop-blur-sm border-card-border hover:bg-secondary/50">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="destructive" className="w-full bg-red-500/80 text-white hover:bg-red-500">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center text-xl">
                    <Smartphone className="h-5 w-5 mr-2" />
                    App Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-foreground">Health+ Dashboard</p>
                  <p className="text-sm text-muted-foreground">Version 2.1.0</p>
                  <Badge variant="secondary" className="bg-primary/20 text-primary mt-2">
                    Latest
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}