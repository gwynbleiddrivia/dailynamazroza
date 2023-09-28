import { useQuery } from '@tanstack/react-query';
        
const useFetchTime = (year, month, lat, long) => {
        const {refetch, data: fetchTime =[] } = useQuery({
                queryKey: ['fetchTime', year, month, lat, long],
                queryFn: async () => {
                const response = await fetch(`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${long}&method=1`)
                return response.json()
                        }                                                                           
                })
        return [fetchTime, refetch]
};
  
 

export default useFetchTime;
