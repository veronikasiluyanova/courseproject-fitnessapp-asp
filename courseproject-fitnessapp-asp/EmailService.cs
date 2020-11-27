using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace courseproject_fitnessapp_asp
{
    public class EmailService
    {
        //public async Task SendEmailAsync(string email, string subject, string message)
        //{
        //    var emailMessage = new MimeMessage();

        //    emailMessage.From.Add(new MailboxAddress("Администрация сайта", "login@yandex.ru"));
        //    emailMessage.To.Add(new MailboxAddress("", email));
        //    emailMessage.Subject = subject;
        //    emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        //    {
        //        Text = message
        //    };

        //    SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
        //    smtp.Credentials = new NetworkCredential("siluyanovan@gmail", "password");
        //    smtp.EnableSsl = true;
        //    await smtp.SendAsync(emailMessage);

        //    using (var client = new SmtpClient())
        //    {
        //        await client.ConnectAsync("smtp.yandex.ru", 25, false);
        //        await client.AuthenticateAsync("login@yandex.ru", "password");
        //        await client.SendMailAsync(emailMessage);

        //        await client.DisconnectAsync(true);
        //    }
        //}
    }
}
