<?php

namespace App\Repository;

use App\Entity\Album;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Album|null find($id, $lockMode = null, $lockVersion = null)
 * @method Album|null findOneBy(array $criteria, array $orderBy = null)
 * @method Album[]    findAll()
 * @method Album[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AlbumRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Album::class);
    }

    public function getAlbumsCount(?string $filter): string
    {
        $qb = $this->createQueryBuilder('album');

        return $qb
            ->select('count(album.id)')
            ->andWhere('album.title LIKE :filter')
            ->setParameter('filter', '%' . $filter . '%')
            ->getQuery()
            ->getSingleScalarResult()
            ;
    }

    public function getAlbumsByFilter(int $offset, int $limit, ?string $filter)
    {
        $qb = $this->createQueryBuilder('album');

        return $qb
            ->andWhere('album.title LIKE :filter')
            ->setParameter('filter', '%' . $filter . '%')
            ->setFirstResult($offset)
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult()
            ;
    }
}
