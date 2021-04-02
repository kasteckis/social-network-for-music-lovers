<?php

namespace App\Service;

use App\Entity\ForgotPassword;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class ForgotPasswordService
{
    private EntityManagerInterface $entityManager;

    /**
     * ForgotPasswordService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function sendForgotPasswordEmailIfNeeded(string $email, MailerInterface $mailer, string $hostUrl, ?string $clientIp): void
    {
        /** @var User|null $user */
        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $email
        ]);

        if ($user) {
            $passwordHash = sha1($email) . time();

            $forgotPassword = new ForgotPassword();
            $forgotPassword
                ->setUser($user)
                ->setEmail($email)
                ->setHash($passwordHash);

            $this->entityManager->persist($forgotPassword);
            $this->entityManager->flush();

            $email = (new TemplatedEmail())
                ->from($_ENV['MAILER_EMAIL'])
                ->to($email)
                ->priority(Email::PRIORITY_HIGH)
                ->subject('Music.lt - Slaptažodžio atstatymo patvirtinimas')
                ->htmlTemplate('emails/forgot-password.html.twig')
                ->context([
                    'username' => $user->getName(),
                    'resetButtonUrl' => $hostUrl . '/pamirsau-slaptazodi/' . $passwordHash,
                    'ip' => $clientIp
                ])
            ;

            $mailer->send($email);
        }
    }
}
