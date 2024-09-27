import { useState, useEffect } from 'react';

const useDeviceType = () => {
  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDevice('mobile');
      } else {
        setDevice('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};

export default useDeviceType;