<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\TopService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TopController extends AbstractController
{
    private TopService $topService;

    /**
     * TopController constructor.
     * @param TopService $topService
     */
    public function __construct(TopService $topService)
    {
        $this->topService = $topService;
    }

    /**
     * @Route("/api/top40", name="api_get_top40", methods={"GET"})
     */
    public function getTop40(): Response
    {
        /** @var User|null $user */
        $user = $this->getUser();

        [$topArray, $topOldCount, $topNewCount, $topDisqCount] = $this->topService->getTop40Arrays();

        return $this->json([
            'tops' => $topArray,
            'topOldCount' => $topOldCount,
            'topNewCount' => $topNewCount,
            'topDisqCount' => $topDisqCount,
            'canUserVote' => $user instanceof User ? $user->getCanVoteInTop40() : false
        ]);
    }

    /**
     * @IsGranted("ROLE_USER")
     * @Route("/api/top40", name="api_post_vote_top40", methods={"POST"})
     */
    public function postVoteTop40(Request $request): Response
    {
        /** @var User|null $user */
        $user = $this->getUser();
        $dataTops = json_decode($request->getContent());

        $this->topService->handleVote($dataTops, $user);

        [$topArray, $topOldCount, $topNewCount, $topDisqCount] = $this->topService->getTop40Arrays();

        return $this->json([
            'tops' => $topArray,
            'topOldCount' => $topOldCount,
            'topNewCount' => $topNewCount,
            'topDisqCount' => $topDisqCount,
            'canUserVote' => $user instanceof User ? $user->getCanVoteInTop40() : false
        ]);
    }

    /**
     * @IsGranted("ROLE_ADMIN")
     * @Route("/reload/top40", name="reload_top40_for_admins", methods={"GET"})
     */
    public function reloadTop40ForAdmins(Request $request): Response
    {
        $this->topService->reloadTop40();

        return $this->json([
            'message' => 'Perkrauta!'
        ]);
    }
}
