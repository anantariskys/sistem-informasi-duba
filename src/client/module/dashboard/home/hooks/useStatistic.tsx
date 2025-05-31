import { useQueryGetStatistic } from '../api/useQueryGetStatistic';

const useStatistic = () => {
  const { data, isLoading } = useQueryGetStatistic();

  

  return {
    data: data?.data,
    isLoading,
  };
};
export default useStatistic;
