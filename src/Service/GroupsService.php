<?php


namespace App\Service;


use App\Entity\Performer;
use App\Repository\PerformerRepository;
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

    public function fetchGroups(int $offset, int $limit, ?string $filter): array
    {
        /** @var PerformerRepository $performerRepo */
        $performerRepo = $this->entityManager->getRepository(Performer::class);

        /** @var Performer[] $groups */
        $groups = $performerRepo->getPerformersByFilter($offset, $limit, $filter);

        $groupsArray = [];

        foreach ($groups as $group) {
            $groupsArray[] = $this->groupEntityToArray($group);
        }

        return $groupsArray;
    }

    public function groupEntityToArray(Performer $performer): array
    {
        return [
            'id' => $performer->getId(),
            'title' => $performer->getTitle(),
            'songs' => $performer->getSongs()->count(),
            'albums' => $performer->getAlbums()->count(),
            'image' => $performer->getImage()
        ];
    }
}
