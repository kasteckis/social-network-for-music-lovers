<?php

namespace App\Controller;

use App\Entity\Album;
use App\Entity\Performer;
use App\Repository\AlbumRepository;
use App\Repository\PerformerRepository;
use App\Service\GroupsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AlbumsController extends AbstractController
{
    private GroupsService $groupsService;

    /**
     * AlbumsController constructor.
     * @param GroupsService $groupsService
     */
    public function __construct(GroupsService $groupsService)
    {
        $this->groupsService = $groupsService;
    }

    /**
     * @Route("/api/albums", name="get_some_albums")
     */
    public function fetchSomeAlbums(Request $request): Response
    {
        $offset = $request->get('offset') ? $request->get('offset') : 0;
        $limit = $request->get('limit') ? $request->get('limit') : 10;
        $filter = $request->get('filter') ? $request->get('filter') : null;

        /** @var AlbumRepository $performerRepo */
        $albumRepo = $this->getDoctrine()->getRepository(Album::class);

        $albumsArray = $this->groupsService->fetchAlbums($offset, $limit, $filter);

        return $this->json([
            'albums' => $albumsArray,
            'albumsCount' => $albumRepo->getAlbumsCount($filter)
        ]);
    }
}
