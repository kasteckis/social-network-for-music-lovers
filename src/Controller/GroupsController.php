<?php

namespace App\Controller;

use App\Entity\Performer;
use App\Repository\PerformerRepository;
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
        $filter = $request->get('filter') ? $request->get('filter') : null;

        /** @var PerformerRepository $performerRepo */
        $performerRepo = $this->getDoctrine()->getRepository(Performer::class);

        $groupsArray = $this->groupsService->fetchGroups($offset, $limit, $filter);

        return $this->json([
            'groups' => $groupsArray,
            'groupsCount' => $performerRepo->getPerformersCount($filter)
        ]);
    }

    /**
     * @Route("/api/group/{performer}", name="api_get_one_performer")
     */
    public function getOnePerformer(Request $request, ?Performer $performer): Response
    {
        if (!($performer instanceof Performer)) {
            return $this->json([
                'success' => false,
                'error' => 'Grupė nerasta'
            ]);
        }

        $groupArray = $this->groupsService->groupEntityToArray($performer);

        return $this->json([
            'success' => true,
            'group' => $groupArray
        ]);
    }
}
