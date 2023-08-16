import { useEffect, useState } from 'react';
import { Service as ServiceType } from '../types';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../auth/supabaseClient';
const useServices = () => {
  const [services, setServices] = useState<ServiceType[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select<string, ServiceType>(
            'id, product(id, name), date, patent, address, value'
          );
        if (error) {
          setError(error);
        }
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
  }, []);

  const addService = async (service: Omit<ServiceType, 'id'>) => {
    const toAdd = {
      product: service.product?.id,
      date: service.date,
      patent: service.patent,
      address: service.address,
      value: service.value,
    };
    const { data, error } = await supabase
      .from('services')
      .insert(toAdd)
      .select<string, ServiceType>(
        'id, product(id, name), date, patent, address, value'
      );
    if (error) {
      setError(error);
    } else {
      setServices((prev) => [...prev!, data![0]]);
    }
  };

  const removeService = async (id: number) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      setError(error);
    } else {
      setServices((prev) => prev!.filter((service) => service.id !== id));
    }
  };

  return { services, error, addService, removeService };
};

export default useServices;
