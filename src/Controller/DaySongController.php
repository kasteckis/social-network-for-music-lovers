<?php

namespace App\Controller;

use App\Entity\DaySong;
use App\Repository\DaySongRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DaySongController extends AbstractController
{
    /**
     * @Route("/api/day-song", name="day_song")
     */
    public function index(): Response
    {
        /** @var DaySongRepository $daySongRepository */
        $daySongRepository = $this->getDoctrine()->getRepository(DaySong::class);

        $daySong = $daySongRepository->getNewestDaySong();

        if ($daySong) {
            return $this->json([
                'title' => $daySong->getTitle(),
                'spotifyLink' => $daySong->getSpotifyLink(),
                'likes' => $daySong->getLikes()->count()
            ]);
        }

        return $this->json([
            'title' => 'NULL',
            'spotifyLink' => 'NULL',
            'likes' => -1
        ]);
    }
}
