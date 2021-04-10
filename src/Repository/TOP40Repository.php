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

    // /**
    //  * @return TOP40[] Returns an array of TOP40 objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?TOP40
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
