import { Notify } from 'quasar';
import ApiError from '@/types/ApiError';

const handleApiError = async (error: ApiError) => {
  Notify.create({
    type: 'negative',
    message: 'Error: ' + error?.response.data.error.message,
  });
};

export default handleApiError;
