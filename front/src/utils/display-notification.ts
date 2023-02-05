import { Notify } from 'quasar';

const displayNotification = async (message: string, isSuccess: boolean) => {
  const type = isSuccess ? 'positive' : 'negative';

  Notify.create({
    type: type,
    message: message,
  });
};

export default displayNotification;
