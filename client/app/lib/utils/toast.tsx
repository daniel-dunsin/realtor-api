import { toast } from 'react-hot-toast';

export const successRes = (text: string, duration?: number) => {
  toast.success(text, {
    duration: duration || 3000,
  });
};

export const loadingRes = (text: string, duration?: number) => {
  toast.loading(text, { duration: 2000 });
};

export const errorRes = (text: string, duration?: number) => {
  toast.error(text, {
    duration: duration || 3000,
  });
};
