<?php

namespace App\Repository;

use App\Entity\Song;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Song|null find($id, $lockMode = null, $lockVersion = null)
 * @method Song|null findOneBy(array $criteria, array $orderBy = null)
 * @method Song[]    findAll()
 * @method Song[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SongRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Song::class);
    }

    public function getEntitiesByKeyword(string $keyword): array
    {
        return $this->createQueryBuilder('song')
            ->where('song.title LIKE :keyword')
            ->orWhere('song.title LIKE :keyword')
            ->setParameter('keyword', '%' . $keyword . '%')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
            ;
    }
}
