import { useCallback, useEffect, useMemo, useState } from 'react';
import { DASHBOARD_MARKETING_DATA_TEMPLATE } from '@/utils/data';
import {
  IDashBoardMarketingData,
  IDashBoardTableData,
} from '@/utils/types/dashboard';
import { useAuthState } from '@/contexts/auth';
import { getContactByReferralId } from '@/queries/contacts';
import { useRouter } from 'next/router';
import { getLeads } from '@/queries/leads';
import { ROUTERS } from '@/constants';

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const useDashBoardHook = () => {
  const [textSearch, setTextSearch] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const { profile } = useAuthState();
  const [link, setLink] = useState<string>(
    `${process.env.NEXT_PUBLIC_REFERRAL_URL + `?refid=${profile?.uid}`}`
  );

  const [tableData, setTableData] = useState<IDashBoardTableData[]>([]);
  const [tableDataTemplate, setTableDataTemplate] = useState<IDashBoardTableData[]>([]);
  const [marketingData, setMarketingData] = useState<IDashBoardMarketingData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onToggleSideBar = useCallback((value: boolean) => {
    setSidebarOpen(value);
  }, [sidebarOpen]);

  const onChangeTextSearch = useCallback((value: string) => {
    if (!value) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTableData(tableDataTemplate);
      }, 500);
    }
    setTextSearch(value);
  }, [tableDataTemplate]);

  const handleSearchLeads = useCallback(() => {
    setLoading(true);
    const values = tableDataTemplate.filter(
      (item) =>
        item.clientName.toLowerCase().trim().search(textSearch.toLowerCase().trim()) != -1
    );
    setTimeout(() => {
      setLoading(false);
      setTableData(values);
    }, 500);
  }, [textSearch]);

  const handleCopy = useCallback(async () => {
    if (isCopied) return;
    await copyContent(link);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }, [link]);

  const handleChangeLink = useCallback((text: string) => {
    setLink(text);
  }, []);

  const handleNewLead = useCallback(() => {
    router.push(ROUTERS.newLead);
  }, []);

  const getTableData = useMemo(() => {
    // if (!profile?.uid) return null;
    // return getContactByReferralId(profile?.uid);
  }, [profile]);

  const getLeadsData = useMemo(() => {
    // if (!profile?.uid) return null;
    // return getLeads(profile?.uid);
  }, [profile]);

  useEffect(() => {
    //TODO: Waiting for api links
    // Promise.allSettled([getTableData, getLeadsData]).then((data) => {
    //   let arrayData: any = [];
    //   const [dataTableRes, leadsRes] = data;
    //   if (dataTableRes.status == 'fulfilled') {
    //     const { value } = dataTableRes;
    //     const convertedData =
    //       value?.map((item) => {
    //         return {
    //           id: item.id,
    //           clientName: item.name,
    //           price: '',
    //           status: 'Pending',
    //           payout: '',
    //           phone: item.phoneNumber,
    //         };
    //       }) || [];
    //     arrayData = [...convertedData];
    //   }

    //   if (leadsRes.status == 'fulfilled') {
    //     const { value } = leadsRes;
    //     const convertedData =
    //       value?.map((item) => {
    //         return {
    //           id: item.id || Math.random().toString(),
    //           clientName: item.name,
    //           price: '',
    //           status: 'Pending',
    //           payout: '',
    //           phone: item.phone,
    //         };
    //       }) || [];
    //     arrayData = [...arrayData, ...convertedData];
    //   }
    //   setTableData(arrayData);
    //   setTableDataTemplate(arrayData);
    // });
    setMarketingData(DASHBOARD_MARKETING_DATA_TEMPLATE);
  }, []);

  return {
    link,
    profile,
    loading,
    isCopied,
    sidebarOpen,
    tableData,
    marketingData,
    onToggleSideBar,
    handleSearchLeads,
    onChangeTextSearch,
    handleChangeLink,
    setSidebarOpen,
    handleCopy,
    handleNewLead,
  };
};
export default useDashBoardHook;
