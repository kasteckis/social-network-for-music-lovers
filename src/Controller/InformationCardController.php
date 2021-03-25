<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\InformationCardService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InformationCardController extends AbstractController
{
    private InformationCardService $informationCardService;

    /**
     * InformationCardController constructor.
     * @param InformationCardService $informationCardService
     */
    public function __construct(InformationCardService $informationCardService)
    {
        $this->informationCardService = $informationCardService;
    }

    /**
     * @Route("/api/information", name="information_card", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function getInformation(Request $request): Response
    {
        $em = $this->getDoctrine()->getManager();
        /** @var UserRepository $userRepo */
        $userRepo = $em->getRepository(User::class);

        $userRecentlyLoggedInCount = $userRepo->getRecentlyLoggedInUserCount();
        $registeredUsersCount = $userRepo->count([]);
        $lastRegisteredUser = $userRepo->findOneBy([], ['createdAt' => 'DESC']);

        return $this->json([
            'todayVisited' => $this->informationCardService->getTodayVisits($request),
            'loggedIn' => $userRecentlyLoggedInCount,
            'registered' => $registeredUsersCount,
            'lastRegisteredUser' => [
                'id' => $lastRegisteredUser->getId(),
                'username' => $lastRegisteredUser->getName()
            ]
        ]);
    }
}
