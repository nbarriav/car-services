import useFetchProducts from '../hooks/useFetchProducts';
import { Service as ServiceType } from '../types';
interface ServiceFormProps {
  onCancel: () => void;
  onSubmit: (service: Omit<ServiceType, 'id'>) => Promise<void>;
}

const ServiceForm = ({ onCancel, onSubmit }: ServiceFormProps) => {
  const { products } = useFetchProducts();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const product = products?.find(
      (product) => product.id === +e.currentTarget.product.value
    );
    const service = {
      address: e.currentTarget.address.value as string,
      date: e.currentTarget.date.value as string,
      patent: e.currentTarget.patent.value as string,
      product: { id: product?.id as number, name: product?.name as string },
      value: product?.price as number,
    };
    await onSubmit(service);
    onCancel();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <label htmlFor='product'>Product</label>
        <select id='product' required className='rounded-xl p-2'>
          {products?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <label htmlFor='date'>Date</label>
        <input
          type='datetime-local'
          id='date'
          required
          className='rounded-xl p-2'
        />

        <label htmlFor='address'> Address</label>
        <input type='text' id='address' required className='rounded-xl p-2' />

        <label htmlFor='patent'>Patent</label>
        <input type='text' id='patent' required className='rounded-xl p-2' />
        <button
          type='button'
          onClick={onCancel}
          className='bg-red-800 rounded-xl p-2  text-white text-sm font-bold hover:bg-red-900 hover:cursor-pointer'
        >
          Cancel
        </button>
        <button
          type='submit'
          className='bg-blue-500 rounded-xl p-2  text-white text-sm font-bold hover:bg-blue-700'
        >
          Save
        </button>
      </form>
    </>
  );
};

export default ServiceForm;
