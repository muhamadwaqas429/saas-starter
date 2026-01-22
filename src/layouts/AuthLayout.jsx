import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <Card className="w-full max-w-md p-6 sm:p-8 space-y-6 shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-indigo-600 text-white font-bold">
              SA
            </AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-semibold text-slate-800">{title}</h1>

          {subtitle && (
            <Badge variant="secondary" className="text-xs">
              {subtitle}
            </Badge>
          )}
        </div>

        {/* Form / Content */}
        <div className="space-y-4">{children}</div>
      </Card>
    </div>
  );
}
