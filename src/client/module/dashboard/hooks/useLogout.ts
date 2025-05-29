import { signOut } from 'next-auth/react';
import { useState } from 'react';

const useLogout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };
  return { handleLogout, isOpen, setIsOpen, toggleModal };
};

export default useLogout;
