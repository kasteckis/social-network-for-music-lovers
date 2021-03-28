<?php

namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use function Doctrine\ORM\QueryBuilder;

/**
 * @method Event|null find($id, $lockMode = null, $lockVersion = null)
 * @method Event|null findOneBy(array $criteria, array $orderBy = null)
 * @method Event[]    findAll()
 * @method Event[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }

    /**
     * @param \DateTime $from
     * @param \DateTime $to
     * @param string|null $filter
     * @param string|null $type
     * @return Event[] Returns an array of Event objects
     */
    public function getEventsByDateRangeAndFilter(\DateTime $from, \DateTime $to, ?string $filter, ?string $type): array
    {
        $qb = $this->createQueryBuilder('event');

        $qb = $qb
            ->andWhere('event.active = true')
            ->andWhere('event.startDateTime >= :from')
            ->andWhere($qb->expr()->orX(
                $qb->expr()->lte('event.endDateTime', ':to'),
                $qb->expr()->isNull('event.endDateTime')
            ))
            ->andWhere($qb->expr()->orX(
                $qb->expr()->like('event.title', ':filter'),
                $qb->expr()->like('event.text', ':filter')
            ));

        switch ($type) {
            case 'all':
                break;
            case 'online':
                $qb->andWhere('event.remoteEvent = true');
                break;
            case 'live':
                $qb->andWhere('event.remoteEvent = false');
                break;
            default:
                throw new \RuntimeException('Blogas type');
        }

        return $qb
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->setParameter('filter', '%' . $filter . '%')
            ->orderBy('event.startDateTime', 'ASC')
            ->getQuery()
            ->getResult()
            ;
    }

    /*
    public function findOneBySomeField($value): ?Event
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
