import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    selectAddLoading,
    selectDeleteLoading,
    selectEditLoading,
    selectOneLoading,
    selectOneTransaction,
    selectTransactions
} from './transactionsSelectors.ts';


const Home = () => {
    const dispatch = useAppDispatch();

    const transactions = useAppSelector(selectTransactions);
    const oneTransaction = useAppSelector(selectOneTransaction);
    const addLoading = useAppSelector(selectAddLoading);
    const editLoading = useAppSelector(selectEditLoading);
    const deleteLoading = useAppSelector(selectDeleteLoading);
    const fetchOneLoading = useAppSelector(selectOneLoading);

    return (
        <div>

        </div>
    );
};

export default Home;