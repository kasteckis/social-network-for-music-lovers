<?php

namespace App\Service;

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

    }
}
