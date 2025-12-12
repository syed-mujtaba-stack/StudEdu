import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, User } from "lucide-react";
import { Link } from "wouter";

interface CourseCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  price?: string;
  progress?: number;
}

export function CourseCard({
  id,
  title,
  category,
  image,
  instructor,
  rating,
  students,
  duration,
  price,
  progress
}: CourseCardProps) {
  return (
    <Link href={`/course/${id}`} className="block h-full group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-muted hover:border-primary/20">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="backdrop-blur-md bg-background/80 font-medium">
              {category}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <User className="h-3.5 w-3.5" />
            <span>{instructor}</span>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground">{rating}</span>
              <span>({students})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{duration}</span>
            </div>
          </div>

          {progress !== undefined && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>

        {price && (
          <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-muted/50 mt-auto bg-muted/10">
            <span className="font-bold text-lg text-primary">{price}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">View Course</span>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
