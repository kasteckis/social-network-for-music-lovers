<?php


namespace App\Service;


use App\Entity\DailyVisit;
use App\Repository\DailyVisitRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class InformationCardService
{

    private EntityManagerInterface $entityManager;

    /**
     * InformationCardService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getTodayVisits(Request $request): int
    {
        /** @var DailyVisitRepository $dailyVisitRepo */
        $dailyVisitRepo = $this->entityManager->getRepository(DailyVisit::class);

        $dailyVisit = $dailyVisitRepo->getDailyVisitIfVisitedToday($request->getClientIp());

        if (!$dailyVisit) {
            $dailyVisit = new DailyVisit();

            $dailyVisit->setIp($request->getClientIp());

            $this->entityManager->persist($dailyVisit);
            $this->entityManager->flush();
        }

        return $dailyVisitRepo->getTodayDailyVisits();
    }
}
