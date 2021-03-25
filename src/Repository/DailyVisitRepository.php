<?php

namespace App\Repository;

use App\Entity\DailyVisit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method DailyVisit|null find($id, $lockMode = null, $lockVersion = null)
 * @method DailyVisit|null findOneBy(array $criteria, array $orderBy = null)
 * @method DailyVisit[]    findAll()
 * @method DailyVisit[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DailyVisitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DailyVisit::class);
    }

    /**
     * @param string $ip
     * @return DailyVisit|null Returns an array of DailyVisit objects
     */
    public function getDailyVisitIfVisitedToday(string $ip): ?DailyVisit
    {
        $dayStart = new \DateTimeImmutable('today');
        $dayEnd = $dayStart->modify('+23 hours')->modify('+59 minutes')->modify('+59 seconds');

        return $this->createQueryBuilder('daily_visit')
            ->andWhere('daily_visit.ip = :ip')
            ->andWhere('daily_visit.datetime >= :dayStart')
            ->andWhere('daily_visit.datetime <= :dayEnd')
            ->setParameter('ip', $ip)
            ->setParameter('dayStart', $dayStart)
            ->setParameter('dayEnd', $dayEnd)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function getTodayDailyVisits(): int
    {
        $dayStart = new \DateTimeImmutable('today');
        $dayEnd = $dayStart->modify('+23 hours')->modify('+59 minutes')->modify('+59 seconds');

        $result = $this->createQueryBuilder('daily_visit')
            ->andWhere('daily_visit.datetime >= :dayStart')
            ->andWhere('daily_visit.datetime <= :dayEnd')
            ->setParameter('dayStart', $dayStart)
            ->setParameter('dayEnd', $dayEnd)
            ->getQuery()
            ->getResult();

        return count($result);
    }

    /*
    public function findOneBySomeField($value): ?DailyVisit
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
