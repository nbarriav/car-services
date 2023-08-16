import Service from '../components/Service';
import useFetchServices from '../hooks/useServices';
import { useState } from 'react';
import ServiceForm from '../components/ServiceForm';
const Services = () => {
  const { services, error, addService, removeService } = useFetchServices();
  const [showForm, setShowForm] = useState(false);

  let content;
  if (error) {
    content = <div>{error.message}</div>;
  } else {
    if (services) {
      services.length > 0
        ? (content = (
            <ul className='flex flex-col gap-5 items-center'>
              {services.map((service) => (
                <Service
                  service={service}
                  key={service.id}
                  onRemove={removeService}
                />
              ))}
            </ul>
          ))
        : (content = <div>No services</div>);
    }
  }
  const cancelForm = () => {
    setShowForm(false);
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className=' mt-10 bg-gray-100 rounded-xl p-10 gap-5 flex flex-col'>
        <h1 className='text-3xl font-bold'>My Services</h1>
        {content ? content : <div>Loading...</div>}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className='bg-blue-500 rounded-xl p-2 text-white'
          >
            Add service
          </button>
        )}
        {showForm && (
          <ServiceForm onCancel={cancelForm} onSubmit={addService} />
        )}
      </div>
    </div>
  );
};

export default Services;
