<?php

namespace App\Controller;

use App\Entity\Event;
use App\Repository\EventRepository;
use App\Service\EventService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EventController extends AbstractController
{
    private EventService $eventService;

    /**
     * EventController constructor.
     * @param EventService $eventService
     */
    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    /**
     * @Route("/api/events", name="get_all_events", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function getAllEvents(Request $request): Response
    {
        $from = $request->get('from');
        $to = $request->get('to');
        $filter = $request->get('filter');
        $type = $request->get('type');

        try {
            $from = new \DateTime($from);
            $to = new \DateTime($to);
        } catch (\Exception $e) {
            return $this->json(['error' => 'bad data'], 400);
        }

        /** @var EventRepository $eventRepo */
        $eventRepo = $this->getDoctrine()->getRepository(Event::class);

        $events = $eventRepo->getEventsByDateRangeAndFilter($from, $to, $filter, $type);
        $events = $this->eventService->convertEventArrayToJsonArray($events);

        return $this->json($events);
    }
}
