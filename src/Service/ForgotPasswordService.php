<?php

namespace App\Service;

use App\Entity\ForgotPassword;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
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

    public function sendForgotPasswordEmailIfNeeded(string $email, MailerInterface $mailer): void
    {
        /** @var User|null $user */
        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $email
        ]);

        if ($user) {
            $forgotPassword = new ForgotPassword();
            $forgotPassword
                ->setUser($user)
                ->setEmail($email)
                ->setHash(sha1($email) . time());

            $this->entityManager->persist($forgotPassword);
            $this->entityManager->flush();

            $email = (new Email())
                ->from($_ENV['MAILER_EMAIL'])
                ->to($email)
                ->priority(Email::PRIORITY_HIGH)
                ->subject('Music.lt - Slaptažodžio atstatymo patvirtinimas')
                ->html('<p>See Twig integration for better HTML integration!</p>');

            $mailer->send($email);
        }
    }
}
