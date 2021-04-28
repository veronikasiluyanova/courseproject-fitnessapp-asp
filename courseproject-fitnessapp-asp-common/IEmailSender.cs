using System.Threading.Tasks;

namespace courseproject_fitnessapp_asp_common
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
        Task SendEmailAsync(Message message);
    }
}