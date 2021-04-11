<?php

namespace App\Controller;

use App\Service\TopService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
     * @Route("/api/top40", name="api_get_top40")
     */
    public function getTop40(): Response
    {
        $top40Array = $this->topService->getTop40Array();

        return $this->json([
            'tops' => $top40Array
        ]);
    }
}
