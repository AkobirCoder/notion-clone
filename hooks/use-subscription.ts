import useSwr from 'swr';
import fetcher from '@/lib/fetcher';

const useSubscription = (email: string) => {
    const { data, isLoading, mutate } = useSwr(
        `/api/stripe/subscription?email=${email}`, 
        fetcher
    );

    // console.log({
    //     email,
    //     data,
    //     isLoading,
    // });

    return {
        plan: data,
        isLoading,
        mutate,
    }
}   

export default useSubscription;