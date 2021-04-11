<?php

namespace App\Repository;

use App\Entity\TOP40;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TOP40|null find($id, $lockMode = null, $lockVersion = null)
 * @method TOP40|null findOneBy(array $criteria, array $orderBy = null)
 * @method TOP40[]    findAll()
 * @method TOP40[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TOP40Repository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TOP40::class);
    }

    public function resetLikes()
    {
        return $this->createQueryBuilder('top40')
            ->update('App:TOP40', 'top')
            ->set('top.likes', 0)
            ->getQuery()
            ->execute()
            ;
    }
}
