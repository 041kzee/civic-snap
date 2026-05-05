import useToastStore from '../store/toastStore';

const useToast = () => {
  const showToast = useToastStore((state) => state.showToast);
  return { showToast };
};

export default useToast;
