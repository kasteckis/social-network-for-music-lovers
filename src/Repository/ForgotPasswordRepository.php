<?php

namespace App\Repository;

use App\Entity\ForgotPassword;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ForgotPassword|null find($id, $lockMode = null, $lockVersion = null)
 * @method ForgotPassword|null findOneBy(array $criteria, array $orderBy = null)
 * @method ForgotPassword[]    findAll()
 * @method ForgotPassword[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ForgotPasswordRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ForgotPassword::class);
    }
}
