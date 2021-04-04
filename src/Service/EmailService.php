<?php

namespace App\Service;


use App\Entity\EmailConfirmation;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EmailService
{
    private MailerInterface $mailer;
    private EntityManagerInterface $entityManager;

    /**
     * EmailService constructor.
     * @param MailerInterface $mailer
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(MailerInterface $mailer, EntityManagerInterface $entityManager)
    {
        $this->mailer = $mailer;
        $this->entityManager = $entityManager;
    }

    public function sendEmailConfirmationEmail(User $user, string $email, string $hostUrl): void
    {
        $hash = sha1($email) . time();

        $emailConfirmation = new EmailConfirmation();
        $emailConfirmation
            ->setEmail($email)
            ->setUser($user)
            ->setHash($hash)
        ;

        $this->entityManager->persist($emailConfirmation);
        $this->entityManager->flush();

        $email = (new TemplatedEmail())
            ->from($_ENV['MAILER_EMAIL'])
            ->to($email)
            ->priority(Email::PRIORITY_HIGH)
            ->subject('Music.lt - El. pašto patvirtinimas')
            ->htmlTemplate('emails/email-confirmation.html.twig')
            ->context([
                'username' => $user->getName(),
                'confirmLink' => $hostUrl . '/aktyvuoti/' . $hash
            ])
        ;

        $this->mailer->send($email);
    }
}
