import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';

import { supabase } from '@/lib/supabase';
import { loadCustomerProfile } from '@/services/auth';
import type { CustomerProfile } from '@/types/customer';

type SessionState = {
  session: Session | null;
  customer: CustomerProfile | null;
  loading: boolean;
  refreshCustomer: () => Promise<void>;
};

const SessionContext = createContext<SessionState | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const resolutionId = useRef(0);

  const applySession = useCallback(async (nextSession: Session | null) => {
    const currentResolution = ++resolutionId.current;
    setLoading(true);
    setSession(nextSession);

    if (!nextSession) {
      setCustomer(null);
      setLoading(false);
      return;
    }

    try {
      const nextCustomer = await loadCustomerProfile(nextSession);
      if (resolutionId.current === currentResolution) {
        setCustomer(nextCustomer);
      }
    } catch (error) {
      console.error('Failed to load Yard customer profile', error);
      if (resolutionId.current === currentResolution) {
        setCustomer(null);
      }
    } finally {
      if (resolutionId.current === currentResolution) {
        setLoading(false);
      }
    }
  }, []);

  const refreshCustomer = useCallback(async () => {
    await applySession(session);
  }, [applySession, session]);

  useEffect(() => {
    let mounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (mounted) void applySession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (mounted) void applySession(nextSession);
      },
    );

    const appStateListener = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });

    if (AppState.currentState === 'active') {
      supabase.auth.startAutoRefresh();
    }

    return () => {
      mounted = false;
      resolutionId.current += 1;
      authListener.subscription.unsubscribe();
      appStateListener.remove();
      supabase.auth.stopAutoRefresh();
    };
  }, [applySession]);

  const value = useMemo(
    () => ({ session, customer, loading, refreshCustomer }),
    [customer, loading, refreshCustomer, session],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used inside SessionProvider.');
  }
  return context;
}
