<?php


namespace App\Service;


use App\Entity\Event;
use App\Repository\EventRepository;
use App\Repository\FeedContentType;
use Doctrine\ORM\EntityManagerInterface;

class EventService
{
    private EntityManagerInterface $entityManager;

    /**
     * EventService constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param Event[] $events
     * @return array
     */
    public function convertEventArrayToJsonArray(array $events): array
    {
        $eventArray = [];

        foreach ($events as $event) {
            $eventArray[] = $this->convertEventEntityToArray($event);
        }

        return $eventArray;
    }

    public function convertEventEntityToArray(Event $event): array
    {
        return [
            'id' => $event->getId(),
            'type' => FeedContentType::EVENT,
            'title' => $event->getTitle(),
            'text' => $event->getText(),
            'active' => $event->getActive(),
            'startDateTime' => $event->getStartDateTime()->format('Y-m-d H:i:s'),
            'endDateTime' => $event->getEndDateTime() ? $event->getEndDateTime()->format('Y-m-d H:i:s') : null,
            'address' => $event->getAddress(),
            'remoteEvent' => $event->getRemoteEvent(),
            'image' => $event->getImage(),
            'createdAt' => $event->getCreatedAt()->format('Y-m-d H:i:s'),
            'sortBy' => $event->getStartDateTime()
        ];
    }

    public function getEventsForFeed(array $feedArray, int &$offset): array
    {
        /** @var EventRepository $eventRepo */
        $eventRepo = $this->entityManager->getRepository(Event::class);

        $today = new \DateTime();
        $afterOneMonth = new \DateTime('+1 month');

        $events = $eventRepo->getEventsByDateRange($today, $afterOneMonth, $offset);
        $offset = $offset + count($events);

        foreach ($events as $event) {
            $feedArray[] = $this->convertEventEntityToArray($event);
        }

        return $feedArray;
    }
}
