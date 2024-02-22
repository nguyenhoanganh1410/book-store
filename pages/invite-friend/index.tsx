import { NextPage } from 'next';
import withAuth from '@/components/AuthHOC';

const InviteFriendPage: NextPage = () => {

  return <div className='dark:bg-boxdark-2 dark:text-bodydark'></div>;
};

export default withAuth(InviteFriendPage, 'all');
