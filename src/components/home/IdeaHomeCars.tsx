/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { CalendarDays, Tag, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

const IdeaHomeCards = ({ idea }: { idea: any }) => {
  return (
    <Link href="/idea">
      <Card className="flex flex-col justify-between h-full max-w-md mx-auto bg-white dark:bg-gradient-to-br dark:from-[#0f1412] dark:to-[#0c2924] text-black dark:text-white border border-[#14B8A6]/40 shadow-md rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
        {/* Image Section */}
        <div className="h-[250px] overflow-hidden px-4 pt-4">
          <Image
            src={idea?.images?.[0]}
            alt={idea?.title}
            width={600}
            height={600}
            className="object-cover rounded-xl w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Body Section */}
        <div className="flex flex-col justify-between flex-grow px-6 pt-4 pb-6 space-y-4">

          {/* Info Row */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#14B8A6]" />
              <Badge
                variant="outline"
                className="border-[#14B8A6] text-[#14B8A6] dark:border-[#5eead4] dark:text-[#5eead4]"
              >
                {idea?.category?.name}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-[#0f766e] dark:text-[#5eead4]">
              <User className="w-4 h-4" />
              <span>{idea?.author?.name}</span>
            </div>

            <div className="flex items-center gap-2 text-[#0f766e] dark:text-[#5eead4]">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(idea?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Title */}
          <CardHeader className="px-0 pt-3 pb-0">
            <CardTitle className="text-2xl font-bold text-[#14B8A6] group-hover:text-[#0d9488] transition-colors duration-300">
              {idea?.title}
            </CardTitle>
          </CardHeader>

          {/* Description & Cost */}
          <CardContent className="px-0 space-y-4">
            <div>
              <p className="text-[#0f766e] dark:text-[#5eead4] font-semibold">
                Problem:
              </p>
              <p className="line-clamp-2 text-gray-700 dark:text-gray-300">
                {idea?.problemStatement}
              </p>
            </div>

            <div className="text-[#0f766e] dark:text-[#5eead4] font-bold text-sm">
              Estimated Cost: ${idea?.price}
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default IdeaHomeCards;
