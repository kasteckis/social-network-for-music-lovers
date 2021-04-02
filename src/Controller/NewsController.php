<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\FeedService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NewsController extends AbstractController
{
    private FeedService $feedService;

    /**
     * NewsController constructor.
     * @param FeedService $feedService
     */
    public function __construct(FeedService $feedService)
    {
        $this->feedService = $feedService;
    }

    /**
     * @Route("/api/news", name="get_all_news", methods={"GET"})
     */
    public function getAllNews(): Response
    {
        // todo veliau idet infinite scrolla
        /** @var User|null $user */
        $user = $this->getUser();

        return $this->json($this->feedService->getNews([], $user));
    }
}
