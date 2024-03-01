"use client"
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MouseEventHandler, ReactNode, useState } from 'react';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  color?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  users: any;
}

const Button = ({ children, className = '', color = 'slate', onClick, users }: ButtonProps) => {
  const { data: session, update } = useSession();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      // The update function will be called after a delay of 5000ms (5 seconds)
      const timeoutId = setTimeout(async () => {
        await update({
          ...session,
          user: {
            ...session?.user,
            image: users.image,
          },
        });
        console.log(update);
      }, 5000);

      // Cleanup function to clear the timeout if the component unmounts or another click occurs
      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClicked,update]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsClicked(true);

    if (onClick) {
      onClick(event);
    }
  };

  let buttonColor = 'btn btn-primary btn-outline';

  if (color === 'red') {
    buttonColor = 'text-white bg-red-600 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400';
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-block rounded py-2.5 px-6 text-sm font-bold uppercase ${buttonColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
