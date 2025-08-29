import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Trash2, 
  Search, 
  RotateCcw, 
  Calendar,
  FileText,
  User,
  AlertTriangle,
  Clock,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

const deletedItems = [
  {
    id: "1",
    type: "task",
    title: "Follow up with Patient Martinez",
    description: "Schedule follow-up appointment after surgery",
    deletedDate: new Date(Date.now() - 86400000 * 2),
    deletedBy: "Dr. Azmat",
    category: "Task",
  },
  {
    id: "2",
    type: "patient",
    title: "Robert Wilson",
    description: "Patient record - moved to archive",
    deletedDate: new Date(Date.now() - 86400000 * 5),
    deletedBy: "Admin",
    category: "Patient Record",
  },
  {
    id: "3",
    type: "appointment",
    title: "Consultation - Emma Thompson",
    description: "Cancelled appointment - patient rescheduled",
    deletedDate: new Date(Date.now() - 86400000 * 1),
    deletedBy: "Reception",
    category: "Appointment",
  },
  {
    id: "4",
    type: "document",
    title: "Lab Results - Test #4567",
    description: "Duplicate lab results file",
    deletedDate: new Date(Date.now() - 86400000 * 7),
    deletedBy: "Dr. Smith",
    category: "Document",
  },
  {
    id: "5",
    type: "task",
    title: "Update Patient Database",
    description: "System maintenance task - completed",
    deletedDate: new Date(Date.now() - 86400000 * 3),
    deletedBy: "IT Admin",
    category: "Task",
  },
];

export default function Trash() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = deletedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = typeFilter === "all" || item.type === typeFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <Calendar className="h-4 w-4" />;
      case 'patient': return <User className="h-4 w-4" />;
      case 'appointment': return <Clock className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'patient': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'appointment': return 'bg-purple-500/20 text-purple-400 border border-purple-500/30';
      case 'document': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
              <Trash2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Trash</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Manage deleted items and restore when needed</p>
            </div>
          </div>
          <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 text-sm mt-2 sm:mt-0">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Auto-delete in 30 days
          </Badge>
        </div>

        {/* Search and Filter */}
        <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search deleted items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full bg-background/50 backdrop-blur-sm border-card-border"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                <Button
                  variant={typeFilter === "all" ? "default" : "outline"}
                  onClick={() => setTypeFilter("all")}
                  className={`whitespace-nowrap px-3 py-2 ${typeFilter === "all" ? 'bg-primary text-primary-foreground' : 'bg-background/50 text-foreground'}`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  All
                </Button>
                {["task", "patient", "appointment", "document"].map((type) => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? "default" : "outline"}
                    onClick={() => setTypeFilter(type)}
                    className={`capitalize whitespace-nowrap px-3 py-2 ${typeFilter === type ? 'bg-primary text-primary-foreground' : 'bg-background/50 text-foreground'}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button size="sm" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restore Selected
                  </Button>
                  <Button size="sm" variant="destructive" className="w-full sm:w-auto bg-red-500 text-white hover:bg-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Permanently
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deleted Items List */}
        <Card className="bg-card-glass backdrop-blur-glass border-card-border shadow-glass">
          <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4 flex flex-row items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg sm:text-xl font-semibold text-foreground">Deleted Items</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={selectAllItems}
              className="bg-card-glass backdrop-blur-glass border-card-border text-foreground hover:bg-secondary/50"
            >
              {selectedItems.length === filteredItems.length && filteredItems.length > 0 ? 'Deselect All' : 'Select All'}
            </Button>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 transition-all rounded-lg cursor-pointer
                    ${selectedItems.includes(item.id) 
                      ? 'bg-primary/5 border border-primary/20' 
                      : 'bg-background/50 border border-card-border hover:bg-secondary/50'}
                  `}
                  onClick={() => toggleItemSelection(item.id)}
                >
                  <div className="flex items-start sm:items-center space-x-3 w-full sm:w-auto">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                      className="shrink-0 mt-1 sm:mt-0"
                    />
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-secondary text-foreground">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground ml-auto w-full sm:w-auto sm:text-right">
                    <Badge className={`${getTypeColor(item.type)} px-2 py-1`}>
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline">Deleted</span>
                      <span>{format(item.deletedDate, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Trash2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Items in Trash</h3>
                <p className="text-muted-foreground">Your trash is empty.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}