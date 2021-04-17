<?php


namespace App\Service;


use App\Entity\TOP40;
use App\Entity\User;
use App\Repository\UserRepository;
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

    public function getTop40Arrays(): array
    {
        $top40Repo = $this->entityManager->getRepository(TOP40::class);

        /** @var TOP40[] $top40Entities */
        $top40Entities = $top40Repo->findBy([
            'active' => true
        ], [
            'place' => 'ASC'
        ]);

        // Visos dainos
        $topArray = [];

        // Pasikartojančios dainos t.y. ne pirmą sav. (kiekis)
        $topOldCount = 0;

        // Naujienos (kiekis)
        $topNewCount = 0;

        // Dainos kurių vieta virš 40 (kiekis)
        $topDisqCount = 0;

        foreach ($top40Entities as $top40) {
            $topArray[] = $this->top40LiveEntityToArray($top40);
            if ($top40->getNew()) {
                // Jeigu daina nauja, dedam į naujienų masyvą
                $topNewCount++;
            } else {
                // Jeigu daina nenauja ir jeigu jos pozicija [0;40], tai:
                // į dedam pagr. masyvą
                // jeigu [41;999+], tai skaitosi kaip iškritusi daina

                if ($top40->getPlace() <= 40) {
                    $topOldCount++;
                } else {
                    $topDisqCount++;
                }
            }
        }

        return [$topArray, $topOldCount, $topNewCount, $topDisqCount];
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

    // Kviečiamas per - bin/console app:reload-top40
    public function reloadTop40(): void
    {
        /** @var UserRepository $userRepo */
        $userRepo = $this->entityManager->getRepository(User::class);
        $top40Repo = $this->entityManager->getRepository(TOP40::class);

        $userRepo->makeEveryoneAbleToVoteInTop40();

        /** @var TOP40[] $top40s */
        $top40s = $top40Repo->findBy([
            'active' => true,
        ], [
            'likes' => 'DESC'
        ]);

        foreach ($top40s as $index => $top40) {
            $top40->setLastWeekPlace($top40->getPlace()); // Sios savaites pozicija, keliauja i praeitos savaites pozicija
            $top40->setPlace($index+1); // Nauja vieta pagal likes
            $top40->setWeeksInTop($top40->getWeeksInTop()+1); // Kiek savaiciu tope
            $top40->setLikes(0); // Nuresetinam laikus
            if ($top40->getNew()) {
                // jeigu daina buvo naujiena, tai reikes nerodyti poziciju pasikeitimo per UI, ir jis tampa nebe naujiena
                $top40->setNew(false);
                $top40->setDisplayPlaceChange(false);
            } else {
                $top40->setDisplayPlaceChange(true);
            }
        }

        /** @var TOP40[] $top40sInactive */
        $top40sInactive = $top40Repo->findBy([
            'active' => false
        ]);

        foreach ($top40sInactive as $top40) {
            $top40->setNew(true);
            $top40->setActive(true);
            $top40->setDisplayPlaceChange(false);
        }

        $this->entityManager->flush();
    }

    public function top40LiveEntityToArray(TOP40 $top40): array
    {
        return [
            'id' => $top40->getId(),
            'likes' => $top40->getLikes(),
            'new' => $top40->getNew(),
            'weeksInTop' => $top40->getWeeksInTop(),
            'song' => $this->groupsService->songEntityToArray($top40->getSong()),
            'lastWeekPlace' => $top40->getLastWeekPlace(),
            'performer' => $top40->getSong()->getPerformer() ? $top40->getSong()->getPerformer()->getTitle() : '-',
            'performerId' => $top40->getSong()->getPerformer() ? $top40->getSong()->getPerformer()->getId() : null,
            'performerImage' => $top40->getSong()->getPerformer() ? $top40->getSong()->getPerformer()->getImage() : null,
            'place' => $top40->getPlace(),
            'displayPlaceChange' => $top40->getDisplayPlaceChange(),

            // backende nieko nereiskia, naudojamas fronte
            'difference' => 0
        ];
    }
}
