import { useEffect, useState } from 'react';
import { Product as ProductType } from '../types';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../auth/supabaseClient';

const useFetchProducts = () => {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          setError(error);
        }
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  return { products, error };
};

export default useFetchProducts;
