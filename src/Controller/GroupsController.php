<?php

namespace App\Controller;

use App\Entity\Performer;
use App\Service\GroupsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class GroupsController extends AbstractController
{
    private GroupsService $groupsService;

    /**
     * GroupsController constructor.
     * @param GroupsService $groupsService
     */
    public function __construct(GroupsService $groupsService)
    {
        $this->groupsService = $groupsService;
    }

    /**
     * @Route("/api/groups", name="api_get_some_groups")
     */
    public function fetchSomeGroups(Request $request): Response
    {
        $offset = $request->get('offset') ? $request->get('offset') : 0;
        $limit = $request->get('limit') ? $request->get('limit') : 10;

        $groupsArray = $this->groupsService->fetchGroups($offset, $limit);

        return $this->json($groupsArray);
    }
}
