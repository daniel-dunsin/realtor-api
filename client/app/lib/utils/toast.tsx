import { toast } from 'react-hot-toast';

export interface IPromise {
  loadingText: string;
  successText: string;
  errorText: string;
  function: Promise<unknown>;
}

export const promise = (props: IPromise) => {
  toast.promise(
    props.function,
    {
      loading: props.loadingText,
      success: props.successText,
      error: props.errorText,
    },
    {
      position: 'top-center',
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 3000,
      },
    }
  );
};
