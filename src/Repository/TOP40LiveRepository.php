<?php

namespace App\Repository;

use App\Entity\TOP40Live;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method TOP40Live|null find($id, $lockMode = null, $lockVersion = null)
 * @method TOP40Live|null findOneBy(array $criteria, array $orderBy = null)
 * @method TOP40Live[]    findAll()
 * @method TOP40Live[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TOP40LiveRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TOP40Live::class);
    }

    // /**
    //  * @return TOP40Live[] Returns an array of TOP40Live objects
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
    public function findOneBySomeField($value): ?TOP40Live
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
