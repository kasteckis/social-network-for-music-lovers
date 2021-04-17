<?php

namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

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
     * @param int $offset
     * @return Event[]
     */
    public function getEventsByDateRange(\DateTime $from, \DateTime $to, int $offset): array
    {
        $qb = $this->createQueryBuilder('event');

        $qb = $qb
            ->andWhere('event.active = true')
            ->andWhere('event.startDateTime >= :from')
            ->andWhere($qb->expr()->orX(
                $qb->expr()->lte('event.endDateTime', ':to'),
                $qb->expr()->isNull('event.endDateTime')
            ));

        return $qb
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->orderBy('event.startDateTime', 'ASC')
            ->setFirstResult($offset)
            ->setMaxResults(5)
            ->getQuery()
            ->getResult()
            ;
    }

    /**
     * @param \DateTime $from
     * @param \DateTime $to
     * @param string|null $filter
     * @param string|null $type
     * @param int $offset
     * @return Event[] Returns an array of Event objects
     */
    public function getEventsByDateRangeAndFilter(\DateTime $from, \DateTime $to, ?string $filter, ?string $type, int $offset): array
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
            ->setFirstResult($offset)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
            ;
    }

    public function getEventsByDateRangeAndFilterCount(\DateTime $from, \DateTime $to, ?string $filter, ?string $type): string
    {
        $qb = $this->createQueryBuilder('event');

        $qb = $qb
            ->select('count(event.id)')
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
            ->getSingleScalarResult()
            ;
    }
}
