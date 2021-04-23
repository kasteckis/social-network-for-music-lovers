<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\User;
use App\Service\EventService;
use App\Service\FeedService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FeedController extends AbstractController
{
    private FeedService $feedService;
    private EventService $eventService;

    public function __construct(FeedService $feedService, EventService $eventService)
    {
        $this->feedService = $feedService;
        $this->eventService = $eventService;
    }

    /**
     * @Route("/api/feed", name="content")
     */
    public function getFeed(Request $request): Response
    {
        $offsetNews = $request->get('offsetNews') ? (int)$request->get('offsetNews') : 0;
        $offsetPosts = $request->get('offsetPosts') ? (int)$request->get('offsetPosts') : 0;
        $offsetEvents = $request->get('offsetEvents') ? (int)$request->get('offsetEvents') : 0;

        /** @var User|null $user */
        $user = $this->getUser();

        $feedArray = [];
        $feedArray = array_merge($feedArray, $this->feedService->fetchNews($user, $offsetNews));
        $feedArray = array_merge($feedArray, $this->feedService->fetchPosts($user, $offsetPosts));
        $feedArray = array_merge($feedArray, $this->eventService->getEventsForFeed($offsetEvents));

        $feedArray = $this->feedService->sortFeeds($feedArray);

        return $this->json([
            'feedArray' => $feedArray,
            'offsetNews' => $offsetNews,
            'offsetPosts' => $offsetPosts,
            'offsetEvents' => $offsetEvents
        ]);
    }
}
