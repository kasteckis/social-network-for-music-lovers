<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    public function getRecentlyLoggedInUserCount(): int
    {
        try {
            $data = $this->createQueryBuilder('user')
                ->select('count(user.id)')
                ->andWhere('user.lastLogin >= :hourAgo')
                ->setParameter('hourAgo', new \DateTime('-1 hour'))
                ->getQuery()
                ->getSingleResult();
        } catch (\Exception $e) {
            return -1;
        }

        foreach ($data as $datum) {
            return $datum;
        }

        return -1;
    }

    /**
     * @param string|null $filterText
     * @param int $offset
     * @return User[] Returns an array of User objects
     */
    public function getUserListByFilterAndOffset(?string $filterText, int $offset): array
    {
        return $this->createQueryBuilder('user')
            ->andWhere('user.active = true')
            ->andWhere('user.name LIKE :filterText')
            ->setParameter('filterText', '%' . $filterText . '%')
            ->setFirstResult($offset)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }

    public function getUserListCountyByFilterText(?string $filterText)
    {
        return $this->createQueryBuilder('user')
            ->select('count(user.id)')
            ->andWhere('user.active = true')
            ->andWhere('user.name LIKE :filterText')
            ->setParameter('filterText', '%' . $filterText . '%')
            ->getQuery()
            ->getSingleScalarResult()
            ;
    }

    public function makeEveryoneAbleToVoteInTop40()
    {
        return $this->createQueryBuilder('user')
            ->update('App:User', 'u')
            ->set('u.canVoteInTop40', true)
            ->andWhere('u.canVoteInTop40 = false')
            ->getQuery()
            ->execute()
            ;
    }
}
