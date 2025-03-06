import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-white dark:bg-gray-800 shadow-md',
      outline: 'border border-gray-200 dark:border-gray-700 bg-transparent',
      ghost: 'bg-transparent'
    };

    const paddings = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mb-3', className)}
      {...props}
    />
  );
});

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement, 
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  );
});

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement, 
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
      {...props}
    />
  );
});

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  );
});

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mt-4 flex items-center', className)}
      {...props}
    />
  );
});

CardFooter.displayName = 'CardFooter';

interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4' | '9:16';
}

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, aspectRatio = '16:9', ...props }, ref) => {
    const aspectRatios = {
      '16:9': 'aspect-video',
      '4:3': 'aspect-[4/3]',
      '1:1': 'aspect-square',
      '3:4': 'aspect-[3/4]',
      '9:16': 'aspect-[9/16]'
    };

    return (
      <div className={cn('overflow-hidden', aspectRatios[aspectRatio])}>
        <img
          ref={ref}
          className={cn('w-full h-full object-cover', className)}
          {...props}
        />
      </div>
    );
  }
);

CardImage.displayName = 'CardImage';

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardImage
}; 