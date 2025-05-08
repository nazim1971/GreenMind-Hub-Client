import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { CalendarDays, Tag, User } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';

const IdeaHomeCards = ({ idea }: { idea: any }) => {
  return (
    <Link href="/ideas">
      <Card className="max-w-md dark:bg-gradient-to-br dark:from-black  dark:to-[#0a2910] dark:text-white text-black border border-green-700 shadow-xl rounded-2xl hover:scale-[1.02] transition-transform">
        <Image
          src={idea?.images?.[0]}
          alt={idea?.title}
          width={600}
          height={600}
          className="object-cover h-[300px] px-5 rounded-2xl"
        />
        <CardHeader>
          <CardTitle className="dark:text-green-300 text-green-700 font-bold text-3xl">
            {idea?.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="dark:text-green-500 text-green-700 font-semibold">
              Problem:
            </p>
            <p>{idea?.problemStatement?.slice(0, 55)}...</p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="flex gap-5">
              <div className="flex items-center gap-2 mt-2">
                <Tag className="w-4 h-4 dark:text-green-400 text-green-700" />
                <Badge
                  variant="outline"
                  className="dark:border-green-400 border-green-700 dark:text-green-300 text-green-700"
                >
                  {idea?.category?.name}
                </Badge>
              </div>
              <div className="flex items-center gap-2 dark:text-green-400 text-green-700 mt-1">
                <User className="w-4 h-4" />
                <span>{idea?.author?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 dark:text-green-400 text-green-700">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(idea?.createdAt)?.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="dark:text-green-300 text-green-700 font-bold">
            Estimated Cost: ${idea?.price}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default IdeaHomeCards;