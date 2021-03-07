<?php

namespace App\Repository;

use App\Entity\DaySong;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DaySong|null find($id, $lockMode = null, $lockVersion = null)
 * @method DaySong|null findOneBy(array $criteria, array $orderBy = null)
 * @method DaySong[]    findAll()
 * @method DaySong[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DaySongRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DaySong::class);
    }

//    public function getTodaysDaySong(): ?DaySong
//    {
//        $today = new \DateTimeImmutable();
//        $dayStart = $today->format('Y-m-d 00:00:00');
//        $dayEnd = $today->format('Y-m-d 23:59:59');
//
//        try {
//            return $this->createQueryBuilder('daySong')
//                ->andWhere('daySong.date >= :dayStart')
//                ->andWhere('daySong.date <= :dayEnd')
//                ->setParameter('dayStart', $dayStart)
//                ->setParameter('dayEnd', $dayEnd)
//                ->setMaxResults(1)
//                ->getQuery()
//                ->getSingleResult();
//        } catch (\Exception $e) {
//            return null;
//        }
//    }

    public function getNewestDaySong(): ?DaySong
    {
        $today = new \DateTimeImmutable();
        $dayEnd = $today->format('Y-m-d 23:59:59');

        try {
            return $this->createQueryBuilder('daySong')
                ->andWhere('daySong.date <= :dayEnd')
                ->setParameter('dayEnd', $dayEnd)
                ->setMaxResults(1)
                ->orderBy('daySong.date', 'DESC')
                ->getQuery()
                ->getSingleResult();
        } catch (\Exception $e) {
            return null;
        }
    }

    /*
    public function findOneBySomeField($value): ?DaySong
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
