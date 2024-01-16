import updateVencimentos from './updateVencimento';
import checkAniSendEmails from './EmailServices';
import cron from 'node-cron';


cron.schedule('30 18 * * *', () => {
    console.log('Running a job');
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });
