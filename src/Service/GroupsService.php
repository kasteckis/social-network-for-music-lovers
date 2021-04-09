<?php


namespace App\Service;


use App\Entity\Performer;
use Doctrine\ORM\EntityManagerInterface;

class GroupsService
{
    private EntityManagerInterface $entityManager;

    /**
     * GroupsService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function fetchGroups(int $offset, int $limit): array
    {
        /** @var Performer[] $groups */
        $groups = $this->entityManager->getRepository(Performer::class)->findBy([], null, $limit, $offset);

        $groupsArray = [];

        foreach ($groups as $group) {
            $groupsArray[] = $this->groupEntityToArray($group);
        }

        return $groupsArray;
    }

    private function groupEntityToArray(Performer $performer): array
    {
        return [
            'title' => $performer->getTitle(),
            'songs' => $performer->getSongs()->count(),
            'albums' => $performer->getAlbums()->count()
        ];
    }
}
