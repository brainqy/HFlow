
"use client"; 
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderBlogPosts } from '@/lib/placeholder-data'; // Will now use the potentially mutated array
import { CalendarDays, UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { BlogPost } from '@/types';

export default function BlogPage() {
  // Use state to ensure component re-renders if placeholderBlogPosts is mutated
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // This effect will run on mount and whenever placeholderBlogPosts might change
    // For a prototype, this simulates "re-fetching" or observing the mutable array.
    setPosts([...placeholderBlogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, []); // Dependency on placeholderBlogPosts itself if it were a state from context.
          // For a direct import, this simple useEffect simulates an initial load.
          // Re-rendering due to direct mutation of placeholderBlogPosts by manager page is a prototype behavior.

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          HealthFlow Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Stay informed with the latest health tips, news, and insights from our experts.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-56 w-full">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    fill // Changed from layout="fill" to fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
                    style={{objectFit: "cover"}} // Replaced objectFit="cover" with style prop
                    data-ai-hint={post.dataAiHint || 'blog article cover'}
                  />
                </div>
              </Link>
              <CardHeader>
                <Link href={`/blog/${post.slug}`}>
                  <CardTitle className="font-headline text-xl hover:text-primary transition-colors">{post.title}</CardTitle>
                </Link>
                <div className="text-xs text-muted-foreground flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {new Date(post.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><UserCircle className="h-4 w-4" /> {post.author}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="p-0 text-primary">
                  <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="font-headline text-2xl text-foreground mb-4">No Blog Posts Yet</h2>
          <p className="text-muted-foreground">Check back soon for health tips and updates!</p>
        </div>
      )}
    </div>
  );
}
