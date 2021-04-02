<?php

namespace App\Service;

use App\Entity\ForgotPassword;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

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

    public function sendForgotPasswordEmailIfNeeded(string $email): void
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
        }
    }
}
