<?php


namespace App\Service;


use App\Entity\TOP40;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class TopService
{
    private EntityManagerInterface $entityManager;

    private GroupsService $groupsService;


    /**
     * TopService constructor.
     * @param EntityManagerInterface $entityManager
     * @param GroupsService $groupsService
     */
    public function __construct(EntityManagerInterface $entityManager, GroupsService $groupsService)
    {
        $this->entityManager = $entityManager;
        $this->groupsService = $groupsService;
    }

    public function getTop40Array(): array
    {
        $top40Repo = $this->entityManager->getRepository(TOP40::class);

        $top40Entities = $top40Repo->findBy([
            'active' => true
        ], [
            'likes' => 'DESC'
        ]);

        $top40Array = [];

        foreach ($top40Entities as $index => $top40) {
            $top40Array[] = $this->top40LiveEntityToArray($top40, $index+1);
        }

        return $top40Array;
    }

    public function handleVote(array $dataTops, User $user): void
    {
        $top40Repo = $this->entityManager->getRepository(TOP40::class);
        foreach ($dataTops as $dataTop) {
            $top40 = $top40Repo->find($dataTop->id);
            if ($top40 instanceof TOP40) {
                $top40->setLikes($top40->getLikes() + $dataTop->difference);
            }
        }

        $user->setCanVoteInTop40(false);

        $this->entityManager->flush();
    }

    public function top40LiveEntityToArray(TOP40 $top40, int $place): array
    {
        return [
            'id' => $top40->getId(),
            'likes' => $top40->getLikes(),
            'new' => $top40->getNew(),
            'weeksInTop' => $top40->getWeeksInTop(),
            'song' => $this->groupsService->songEntityToArray($top40->getSong()),
            'lastWeekPlace' => $top40->getLastWeekPlace(),
            'place' => $place,

            // backende nieko nereiskia, naudojamas fronte
            'difference' => 0
        ];
    }
}
