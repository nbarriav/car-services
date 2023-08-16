import { Service as ServiceType } from '../types';

interface ServiceProps {
  service: ServiceType;
  onRemove: (id: number) => Promise<void>;
}
const Service = ({ service, onRemove }: ServiceProps) => {
  const handleEdit = async () => {
    await onRemove(service.id);
  };
  return (
    <li>
      <div className='flex justify-center flex-col'>
        <div className='service__name'>
          {' '}
          <span className='font-bold'>Service: </span> {service.product.name}
        </div>
        <div className='service__date'>
          <span className='font-bold'>Date: </span> {service.date}
        </div>
        <div className='service__value'>
          <span className='font-bold'>Price: </span> ${service.value}
        </div>
        <div className='service__patent'>
          <span className='font-bold'>Patent: </span> {service.patent}
        </div>
        <div className='service__address'>
          <span className='font-bold'>Address: </span>
          {service.address}
        </div>
        <button
          className='bg-red-800 rounded-xl p-2 text-white text-sm font-bold hover:bg-red-900 '
          onClick={handleEdit}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default Service;
